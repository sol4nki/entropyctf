







// === lvls/levels ===

// const clickedId = null

// function shrinklvl(clickedId){
//     if (clickedId){
//         clickedId.id = "content";
//     }
// }

// function expandlvlClick(clickedId){
//     if (clickedId){
//         clickedId.id = event.target."lvl.expanded";
//         console.log(`${clickedId} was changed to ${clickedId.id}`)
//     }
// }

const backendurl = "http://127.0.0.1:8000"
const totallevels = 10


const lvlclass = document.querySelectorAll('.lvl')

lvlclass.forEach(element => {
    element.addEventListener('click', (event) => {

        const clickedElement = event.target.closest('.lvl')
        if (!clickedElement){return}
        
        const tagName = event.target.tagName;
        const ignoredTags = ['INPUT', 'BUTTON', 'A', 'CODE'];

        if (ignoredTags.includes(tagName)) {
            return; // skip toggle
        }

        // console.log(`element with ID "${clickedElement.id}"`)
        clickedElement.classList.toggle("expanded")

    })
})



// home page stuff time, online, lvls left

// for lvls-left use server callbacks

const midnight = new Date()
midnight.setHours(24,0,0,0)

function timeleft(){
    const now = new Date()
    

    const difference = midnight - now
    
    if (difference < 0){
        midnight.setDate(midnight.getDate + 1)
        const newNow = now.getTime()
        const newDifference = midnight - newNow

        
        const fulltime = Math.floor(newDifference / 1000)
        const hours = Math.floor(fulltime / 3600)
        const minutes = Math.floor((fulltime % 3600) / 60)
        const seconds = fulltime % 60

        const formattedh = String(hours).padStart(2, '0');
        const formattedm = String(minutes).padStart(2, '0');
        const formatteds = String(seconds).padStart(2, '0');
        
        const timeid = document.getElementById('time')
        if (timeid) {
            timeid.textContent = `${formattedh}:${formattedm}:${formatteds}`
        }

        
    }else{
        const fulltime = Math.floor(difference / 1000)
        const hours = Math.floor(fulltime / 3600)
        const minutes = Math.floor((fulltime % 3600) / 60)
        const seconds = fulltime % 60
        // console.log(totalSeconds, hours, minutes, seconds)
        const formattedh = String(hours).padStart(2, '0');
        const formattedm = String(minutes).padStart(2, '0');
        const formatteds = String(seconds).padStart(2, '0');



        const timeid = document.getElementById('time');
        
        if (timeid) {
            timeid.textContent = `${formattedh}:${formattedm}:${formatteds}`
        }
    }
}

async function challleft(){
    try{
    const response = await fetch(`${backendurl}/challenges`)
    const data = await response.json()

    // console.log(new Date())
    
    if (data.challenges){

        const challid = document.getElementById('chall')
        if (challid) {
            challid.textContent = `${data.challenges}/10`
        }

        
    }else{
        const challid = document.getElementById('chall')
        if (challid) {
            challid.textContent = `error`
        }
    }
    }catch (error){
        console.error('Error:', error);
    }
}

async function serverstatus(){
    try{
    const ping = await fetch(`${backendurl}/ping`)
    const pingData = await ping.json()

    if (pingData.response === "pong"){

        const serverid = document.getElementById('serverstats')
        if (serverid) {
            serverid.textContent = `$online`
        }

        
    }else{
        const serverid = document.getElementById('serverstats')
        if (serverid) {
            serverid.textContent = `$offline`
        }
    }
    }catch (error){
        console.error('Error:', error);
    }
}

try{
timeleft()
challleft()
serverstatus() //only need to update once when website loads
} catch (error){
    console.error('Error:', error);
}

setInterval(() => {
    
    timeleft()
}, 1200);


setInterval(() => {
    challleft()
}, 240000); //no need to update alot just 3-4 mins do it





// sha256 hash from ground up

// function rightrotate(w1, num){
//     return ((w1 >>> num) | (w1 << (32 - num))) >>> 0

    
// }
// function rightshift(w1, num){
    
//     return (w1 >>> num)  >>> 0
    
// }

// function sha256_g(normal){
    
//     if (normal){
//         let enc=[]
//         for (let i = 0; i < normal.length; i++) {
//             enc.push(normal.charCodeAt(i))
//         }
//         enc.push(0x80)
//         while ((enc.length % 64) !== 56) {
//             enc.push(0x00);
//         }

//         let bitLen = normal.length * 8
//         let lenBytes = []
//         for (let i = 7; i >= 0; i--) {
//             lenBytes.push((bitLen >> (i * 8)) & 0xFF)
//         }

//         enc = enc.concat(lenBytes)

    
//         let h0 = 0x6a09e667
//         let h1 = 0xbb67ae85
//         let h2 = 0x3c6ef372
//         let h3 = 0xa54ff53a
//         let h4 = 0x510e527f
//         let h5 = 0x9b05688c
//         let h6 = 0x1f83d9ab
//         let h7 = 0x5be0cd19



//         let h0_copy = 0x6a09e667
//         let h1_copy = 0xbb67ae85
//         let h2_copy = 0x3c6ef372
//         let h3_copy = 0xa54ff53a
//         let h4_copy = 0x510e527f
//         let h5_copy = 0x9b05688c
//         let h6_copy = 0x1f83d9ab
//         let h7_copy = 0x5be0cd19

//         const k = [
//                 0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
//                 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
//                 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
//                 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
//                 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
//                 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
//                 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
//                 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
//                 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
//                 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
//                 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
//                 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
//                 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
//                 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
//                 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
//                 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
//             ]

//         let w = []
//         for(i=0; i<16; i++){
//             binary8star4 = (enc[4*i] << 24) | (enc[4*i+1] << 16) | (enc[4*i+2] << 8) | enc[4*i+3]
//             w.push(binary8star4)
//         }
        
//         for (i=16; i< 64; i++){
//             w.push(0x00)
//         }

//         for (i=16; i<64; i++){
//             let s0 = ((rightrotate(w[i-15], 7)) ^
//                 rightrotate(w[i-15], 18) ^
//                 rightshift(w[i-15], 3)) >>> 0

//             let s1 = (rightrotate(w[i- 2], 17) ^
//                 rightrotate(w[i- 2], 19) ^
//                 rightshift(w[i- 2], 10)) >>> 0

//             w[i] = (w[i-16] +
//                     s0 +
//                     w[i-7] +
//                     s1)  >>> 0
//         }

//         let a = h0;
//         let b = h1;
//         let c = h2;
//         let d = h3;
//         let e = h4;
//         let f = h5;
//         let g = h6;
//         let h = h7;

//         for (let i = 0; i < 64; i++) {
//             let S1 = (rightrotate(e, 6) ^ rightrotate(e, 11) ^ rightrotate(e, 25)) >>> 0;
//             let ch = ((e & f) ^ ((~e >>> 0) & g)) >>> 0;
//             let temp1 = (h + S1 + ch + k[i] + w[i]) >>> 0;
//             let S0 = (rightrotate(a, 2) ^ rightrotate(a, 13) ^ rightrotate(a, 22)) >>> 0;
//             let maj = ((a & b) ^ (a & c) ^ (b & c)) >>> 0;
//             let temp2 = (S0 + maj) >>> 0;

//             h = g;
//             g = f;
//             f = e;
//             e = (d + temp1) >>> 0;
//             d = c;
//             c = b;
//             b = a;
//             a = (temp1 + temp2) >>> 0;
//         }

//         // Update hash state
//         h0 = (h0 + a) >>> 0;
//         h1 = (h1 + b) >>> 0;
//         h2 = (h2 + c) >>> 0;
//         h3 = (h3 + d) >>> 0;
//         h4 = (h4 + e) >>> 0;
//         h5 = (h5 + f) >>> 0;
//         h6 = (h6 + g) >>> 0;
//         h7 = (h7 + h) >>> 0;


//         // ncrypt = ''.join(f'{h:08x}' for h in [h0,h1,h2,h3,h4,h5,h6,h7])

//         let ncrypt = [h0, h1, h2, h3, h4, h5, h6, h7]
//             .map(h => h.toString(16).padStart(8, '0'))
//             .join('');
//         console.log(ncrypt)
//         return ncrypt

        

//     }else{
//         return 0
//     }
// }

// console.log(sha256('hi'), "this")

// sha256('hi')

// b*as wont fking work on js works on py 




// chatbot stuff + index.html 

if (document.URL.includes("html")) {

    const chatboticon = document.querySelector('#chatboticon')
    const chatbotid = document.querySelector('#chatbotcorner')
    const toppart = document.querySelector('#top-part')


    chatboticon.addEventListener('click', (event) => {
        
        if (chatbotid.classList.contains("expanded")){
            return
        }

        // check for the comment -> 5a7c4 in this file
        if (!toppart.contains(chatboticon)) {
            toppart.prepend(chatboticon)
        }

        // console.log(`element with ID "${chatbotid}"`)
        chatbotid.classList.add("expanded")

    })

    const chatbotcloseid = document.querySelector('#chatbotclose')


    chatbotcloseid.addEventListener('click', (event) => {
        
        if (chatbotid.classList.contains("expanded")){
            chatbotid.classList.remove("expanded")
            // console.log(`element with ID "${chatbotid}"`)
        }

        // this part below is just to reappend the chatbot id to chatbotcorner
        // because i am dumb and couldnt make another expanded id for top-part 
        // i ended up with this [comment - 5a7c4]

        if (toppart.contains(chatboticon)) {
            chatbotid.prepend(chatboticon)
            // console.log(`element with xyz}"`)
        }
    })

    const chatbotsend = document.querySelector('#chatsend')

    chatbotsend.addEventListener('click', async () => {
        const userInput = document.querySelector('#chatinput').value
        if (userInput) {
            const userMessage = document.createElement('p')
            userMessage.classList.add('user')
            userMessage.textContent = userInput
            document.querySelector('#chat-part').appendChild(userMessage)
            document.querySelector('#chatinput').value = ''
            try{
            const res = await fetch(`${backendurl}/chat`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ text: userInput}),
            });
            const data = await res.json()
            // chatbox.innerHTML += `<div><b>Bot:</b> ${data.response}</div>`;
            const botMessage = document.createElement('p')
            botMessage.classList.add('bot')
            botMessage.textContent = data.response
            document.querySelector('#chat-part').appendChild(botMessage)
            document.querySelector('#chatinput').value = ''
            document.querySelector('#chat-part').scrollTop = document.querySelector('#chat-part').scrollHeight
            }catch (error){
                console.error('Error:', error);
            }
        }
        
        
    })
}




// levels page stuff + levels.html + flag checking
if (document.URL.includes("levels.html")){
    window.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch(`${backendurl}/levelstatus`)
        const statusData = await res.json()

        Object.entries(statusData).forEach(([levelId, ingame]) => {
            const lvlElement = document.getElementById(levelId)
            if (!lvlElement) return

            const badge = lvlElement.querySelector(".badge")
            if (!badge) return

            if (ingame === 1) {
                badge.classList.remove("locked")
                badge.classList.add("unlocked")
                badge.textContent = "unlocked"
            } else {
                badge.classList.remove("unlocked")
                badge.classList.add("locked")
                badge.textContent = "locked"
            }
        });
    } catch (error) {
        console.error("error:", error);
        }
    });

    const flagcheck = document.querySelectorAll('.check-btn')
    // console.log('here', flagcheck)
    flagcheck.forEach(element => {
        element.addEventListener('click', async ()=>{
            const flaginput = element.closest('.flag-row').querySelector('.flag-input')
        
            const lvlid = element.closest('.lvl').id
            
            if (!document.cookie){
                alert("You need to login first!")
                return
            }
            try{
            cookiesessionid = document.cookie.split('=')[1]
            if (flaginput.value){
                const res = await fetch(`${backendurl}/levels`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    level: lvlid,
                    flag: flaginput.value,
                    team: cookiesessionid
                    }),
                })
                const response = await res.json()
                // console.log(sessionid)
                if (response.response === -1) {
                    alert("Invalid flag, Try again!")
                } else if(response.response === 404){
                    alert("This flag is already out of game.")
                } else{
                    // document.cookie = `sessionid=${sessionid.response}; path=/; domain=entropy.run.place`;
                    alert(`Flag verified! ${response.team} got ${response.points} points`)
            
            
            }
            // console.log(`flag is ${flaginput.value} for lvl ${lvlid}`)
        }}
        catch (error){
            console.error('Error:', error);
            alert("Some error occured, try again later" + error)
            return
        }
        })
        
        //implement if flag correct then green border if wrong red border
    })

    // still need to implement server side stuff FFF ^^^^



}




// logs stuff + logs.html + announcements 
if (document.URL.includes("logs.html")) {
    const body = document.querySelector('body')
    fetch('../db/announcements.json')
        .then(response => response.json())
        .then(data => 
            data.forEach(log => {
                const logEntry = document.createElement('div')
                logEntry.classList.add('card')
                
                if (log.type === "general"){
                    logEntry.innerHTML = `
                    <p><strong>${log.title}: </strong>${log.msg}</p>
                    <p>${log.details.join('</p><p>')}</p>
                `
                }    
                else if (log.type === "hint"){
                    logEntry.innerHTML = `
                    <p><strong>${log.title}</strong></p>
                    <p>${log.details.join('</p><p>')}</p>
                `
                }
                else if (log.type === "solved"){
                    logEntry.innerHTML = `
                    <p><strong>lvl ${log.level} - solved</strong></p>
                    <p> by: <strong>${log.team}</strong></p>
                    <p>${log.details.join('</p><p>')}</p>
                `

                }
                else if (log.type === "stolen"){
                    logEntry.innerHTML = `
                    <p><strong>${log.points_stolen}<span><img src="../images/flag-newo.png" alt="flag"></span>stolen</strong> </p>
                    <p> by: <span style="color:#ffffff;">${log.by_team}</span> &nbsp; · &nbsp; from: <span style="color:#ffffff;">${log.from_team}</span></p>
                    <p>${log.from_team}${log.details.join('</p><p>')}</p>
                `
                }

                
                body.append(logEntry)
            })
        )
        .catch(error => console.error('Error fetching JSON:', error));
    
}

// leaderboards + leaderboard.html + update everytime [STILL NEED TO DO LOGIN ENC TOP DISP OF PERSONAL DATA ]
if (document.URL.includes("leaderboard.html")) {
    try{
    async function get_leaderboard() {

        cookiesessionid = document.cookie.split('=')[1]
        const res = await fetch(`${backendurl}/leaderboard`, {method: "GET"});
        const data = await res.json();
        console.log(JSON.stringify(data))
        let place = 1
        for(const element of data){
            const tabledata = `<tr>
            <td>[${place}]</td>
            <td>${element.team}</td>
            <td>${element.points.toFixed(1)}<span><img src="../images/flag-newo.png" alt="flag"></span></td>
            <td>${element.solved}/${totallevels}</td>
            </tr>
            `
            // implement that session id to display your data but later when i fix cookies + login enc
            document.querySelector('table').insertAdjacentHTML('beforeend', tabledata)
            if (place == 1){
                document.querySelector('#sec .team-name').textContent = element.team
            } else if (place == 2){
                document.querySelector('#fir .team-name').textContent = element.team
            } else if (place == 3){
                document.querySelector('#thir .team-name').textContent = element.team
            }
            place++
            
        }


    }
    get_leaderboard()

    }catch (error){
        console.error('Error:', error);
    }

    
}



// i really dont need anything fancy for rules so ill avoid random stuff + i dont really like js

// login + key checker + login.html + hashong + server side stuff

if (document.URL.includes("login.html")) {
    
    const loginbtn = document.querySelector('#loginbtn')

    loginbtn.addEventListener('click', async () => {
        const keyinput = document.querySelector('#passkey-input').value
        if (keyinput) {
            // i dont really need hashing right now cause i have https? itll just encrypt it when fetching/sending it?
            try{
            const res = await fetch(`${backendurl}/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ text: keyinput}),
            })
            const sessionid = await res.json()
            // console.log(sessionid)
            if (sessionid.response === -1) {
                alert("Invalid passkey, Try again!");
            } else{
                // document.cookie = `sessionid=${sessionid.response}; path=/; domain=entropy.run.place`;
                document.cookie = `sessionid=${sessionid.response}; path=/`;
                alert(`Logged in successfully as: ${sessionid.team}`);
            }
        }catch (error){
            console.error('Error:', error);
        }   
        // one reason to keep this as some enc key is cause if i kept it as normal username anyone can access anyone's sessionid and post answers and everything else 
        }
    })

    const validatebtn = document.querySelector('#validatebtn')

    validatebtn.addEventListener('click', async () => {
        const keyinput = document.querySelector('#enckey').value
        if (!document.cookie){
            alert("You need to login first!")
            return
        }
        try{
        cookiesessionid = document.cookie.split('=')[1]
        if (keyinput) {
            const res = await fetch(`${backendurl}/key`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    enckey: keyinput,
                    sesid: cookiesessionid
                }),
            })
            const sessionid = await res.json()
            // console.log(sessionid)
            if (sessionid.response === -1) {
                alert("Invalid key, Try again!");
            } else if(sessionid.response === 404){
                alert("This key is already out of game.")
            } else{
                // document.cookie = `sessionid=${sessionid.response}; path=/; domain=entropy.run.place`;
                alert(`Key verified! You stole ${sessionid.points} points from ${sessionid.team}`)
            }
        }}catch (error){
        console.error('Error:', error);
    }
    })

}




// need to implement sending to server too. ^^^^^
// DONE DPONE DONE



// staxck overflow cause my sha256 implementation not giving correct hash

async function hashString(message) {
    try{
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
    
    }catch (error){
        console.error('Error:', error);
    }
}

// hashString('hello').then(hash => {
//     console.log(hash);
// });
