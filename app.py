from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import sqlite3


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

class Message(BaseModel):
    text: str

@app.post("/chat")
async def chat(msg: Message):
    inputs = tokenizer(msg.text, return_tensors="pt")
    outputs = model.generate(**inputs, max_new_tokens=256, do_sample=True, top_k=50, top_p=0.9)
    reply = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"response": reply}






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

def change_score(team, score, solved):
    conn = sqlite3.connect("./db/entropyctf.db")
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO leaderboard (team, points, solved)
        VALUES (?, ?, ?)
        ON CONFLICT(team) DO UPDATE SET
            points = excluded.points,
            solved = excluded.solved
    """, (team, score, solved))
    conn.commit()
    conn.close()

def get_leaderboard():
    conn = sqlite3.connect("./db/entropyctf.db")
    cur = conn.cursor()
    cur.execute("SELECT team, points, solved FROM leaderboard ORDER BY points DESC")
    data = cur.fetchall()
    conn.close()
    return data

















def check_flag(level, flag):
    conn = sqlite3.connect("./db/entropyctf.db")
    cur = conn.cursor()
    cur.execute("SELECT 1 FROM flags WHERE level = ? AND flag = ?", (level, flag))
    result = cur.fetchone()
    conn.close()
    return result is not None

def check_login(key):
    conn = sqlite3.connect("./db/entropyctf.db")
    cur = conn.cursor()
    cur.execute("SELECT 1 FROM 'login hashes' WHERE hash = ?", (key,))
    result = cur.fetchone()
    conn.close()
    return result is not None

def check_enc(key):
    conn = sqlite3.connect("./db/entropyctf.db")
    cur = conn.cursor()
    cur.execute("SELECT 1 FROM enckeys WHERE key = ?", (key,))
    result = cur.fetchone()
    conn.close()
    return result is not None


def steal(thief, victim, level):
    conn = sqlite3.connect("./db/entropyctf.db")
    cur = conn.cursor()
    cur.execute("""
        SELECT 1 FROM steals WHERE thief = ? AND victim = ? AND level = ?
    """, (thief, victim, level))
    if cur.fetchone():
        conn.close()
        return False
    cur.execute("""
        INSERT INTO steals (thief, victim, level)
        VALUES (?, ?, ?)
    """, (thief, victim, level))
    conn.commit()
    conn.close()








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