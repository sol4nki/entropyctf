from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import sqlite3
import secrets
import random


def update_score(team, score):
    conn = sqlite3.connect("./db/entropyctf.db")
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO leaderboard (team, points, solved)
        VALUES (?, ?, 1)
        ON CONFLICT(team) DO UPDATE SET
            points = leaderboard.points + excluded.points,
            solved = leaderboard.solved + 1
    """, (team, score))
    conn.commit()
    conn.close()

def change_score(team, score, solved=404):
    conn = sqlite3.connect("./db/entropyctf.db")
    cur = conn.cursor()
    if solved == 404:
        cur.execute("""
        UPDATE leaderboard SET points = ?
        WHERE team = ?
        """, (score, team))
    else:
        cur.execute("""
            UPDATE leaderboard SET points = ?, solved = ?
            WHERE team = ?
        """, (score, solved, team))
    conn.commit()
    conn.close()

# change_score("tearsofjoy", 0.5)

def get_score(team):
    conn = sqlite3.connect("./db/entropyctf.db")
    cur = conn.cursor()
    cur.execute("SELECT (points) FROM leaderboard WHERE team = ?", (team,))
    data = cur.fetchone()
    conn.close()
    return data[0]

def get_leaderboard():
    conn = sqlite3.connect("./db/entropyctf.db")
    cur = conn.cursor()
    cur.execute("SELECT team, points, solved FROM leaderboard ORDER BY points DESC, solved DESC")
    data = cur.fetchall()
    conn.close()
    return data

def set_stolenfrom(team):
    conn = sqlite3.connect("./db/entropyctf.db")
    cur = conn.cursor()
    cur.execute("""
        UPDATE leaderboard SET stolen_from = ?
        WHERE team = ?
    """, (1, team))
    conn.commit()
    conn.close()

# set_stolenfrom("tele")
# print("hi")
# for i in get_leaderboard():
#     print(i)











def generate_sessionid():
    return secrets.token_hex(16)

# print(generate_sessionid())


def check_flag(level, flag):
    conn = sqlite3.connect("./db/entropyctf.db")
    cur = conn.cursor()
    cur.execute("SELECT points, ingame FROM flags WHERE level = ? AND flag = ?", (level, flag))
    result = cur.fetchone()
    print(level, flag, result)
    conn.close()
    return result if result else (False, "no")
# print(check_flag(1, 'flag_1'))

def flag_outofgame(level, flag):
    conn = sqlite3.connect("./db/entropyctf.db")
    cur = conn.cursor()
    cur.execute("UPDATE flags SET ingame = 0 WHERE level = ? AND flag = ?", (level, flag))
    conn.commit()
    conn.close()
# flag_outofgame(1, 'flag_1')
# print(check_flag(1, 'flag_1'))

def check_login(key):
    conn = sqlite3.connect("./db/entropyctf.db")
    cur = conn.cursor()
    cur.execute("SELECT (team) FROM 'login hashes' WHERE hash = ?", (key,))
    result = cur.fetchone()
    conn.close()
    return result if result else False

def check_enc(key):
    conn = sqlite3.connect("./db/entropyctf.db")
    cur = conn.cursor()
    cur.execute("SELECT (team) FROM enckeys WHERE key = ?", (key,))
    result = cur.fetchall()
    conn.close()
    return result if result else (False, "no")

# print(check_login("fake_hash1"))

def update_sessionid(hash_value, sesid):
    conn = sqlite3.connect("./db/entropyctf.db")
    cur = conn.cursor()
    cur.execute("UPDATE 'login hashes' SET sessionid = ? WHERE hash = ?", (sesid, hash_value))
    conn.commit()
    conn.close()

def check_stolen(name):
    conn = sqlite3.connect("./db/entropyctf.db")
    cur = conn.cursor()
    cur.execute("SELECT (stolen_from) FROM leaderboard WHERE team = ?", (name,))
    result = cur.fetchone()
    conn.close()
    return result[0]

def check_sesid(sesid):
    conn = sqlite3.connect("./db/entropyctf.db")
    cur = conn.cursor()
    cur.execute("SELECT (team) FROM 'login hashes' WHERE sessionid = ?", (sesid,))
    result = cur.fetchone()
    conn.close()
    return result[0]

# print(check_sesid("d2c6a682e6ce8f6be86cfb3aab7649ad"))


# print(check_stolen("newones"))

class Message(BaseModel):
    text: str
class KeyRequest(BaseModel):
    enckey: str
    sesid: str
class FlagRequest(BaseModel):
    level: str
    flag: str
    team: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL = "./Tiny-LLM"   
tokenizer = AutoTokenizer.from_pretrained(MODEL)
model = AutoModelForCausalLM.from_pretrained(MODEL)





@app.post("/chat")
async def chat(msg: Message):
    inputs = tokenizer(msg.text, return_tensors="pt")
    outputs = model.generate(**inputs, max_new_tokens=256, do_sample=True, top_k=50, top_p=0.9)
    reply = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"response": reply}


@app.get("/leaderboard")
def leaderboard():
    data = get_leaderboard()
    return [{"team": t, "points": p, "solved": s} for t, p, s in data]

@app.post("/login")
async def login(loginenc: Message):
    
    if check_login(loginenc.text):
        sesid = generate_sessionid()
        update_sessionid(loginenc.text, sesid)
        return {"response": sesid, "team" : check_login(loginenc.text)[0]}
    return {"response": -1}

@app.post("/key")
def key(keyreq: KeyRequest):
    res = check_enc(keyreq.enckey)
    win = check_sesid(keyreq.sesid)
    # print(res[0][0], win)
    if res:
        if check_stolen(res[0][0]):
            return {"response": 404}
        
        points = round(random.uniform(0,get_score(res[0][0])),1)
        print("here", points)
        change_score(res[0][0], get_score(res[0][0]) - points)
        change_score(win, get_score(win) + points)
        set_stolenfrom(res[0][0])
        return {"response": 1, "team": res[0][0], "points": points}
        
    else:
        return {"response":-1}

@app.post("/levels")
def flagcheck(flagjson: FlagRequest):
    lvl = flagjson.level[3::1]
    flag = flagjson.flag
    team = check_sesid(flagjson.team)
    points, ingame = check_flag(lvl, flag)
    print(check_flag(lvl, flag))
    print("here")
    print(points)
    if ingame == "no":
        return {"response": -1}
    elif ingame == 1:
        flag_outofgame(lvl, flag)
        update_score(team, points)
        return {"response": 1, "team": team, "points": points}
        
    else:
        return {"response": 404}


@app.get("/levelstatus")
def get_levelstatus():
    conn = sqlite3.connect("./db/entropyctf.db")
    cur = conn.cursor()
    cur.execute("SELECT level, ingame FROM flags")
    data = cur.fetchall()
    conn.close()
    result = {}
    for level, ingame in data:
        result[f"lvl{level}"] = ingame 
    print(result)
    return result

# print(leaderboard())





# print(check_flag(1, 'flag_2'))
# print(check_flag(1, 'flag_2'))
# print(check_login(1))
# print(check_login('fake_hash0'))

# def init_flags():
#     conn = sqlite3.connect("./db/entropyctf.db")
#     cur = conn.cursor()
#     for i in range(10):
#         cur.execute("""
#             INSERT INTO 'flags' (level, flag)
#             VALUES (?, ?)
#         """, (i+1,f'flag_{i+1}'))
#     conn.commit()
#     conn.close()

# init_flags()

# change_score("tele", 1.2,2)
# change_score("cloud0", 3, 4)
# change_score("ate8", 0.5, 0)
# change_score("for45", 0.7, 1)
# change_score("monks", 0.9, 0)
# change_score("areal", 0, 0)
# change_score("t4eight", 0, 0)
# change_score("tearsofjoy", 0, 0)
# print(get_leaderboard())