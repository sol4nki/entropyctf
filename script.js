







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

        console.log(`element with ID "${clickedElement.id}"`)
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

function challleft(){
    const challleft = "check server call int"
    
    // console.log(new Date())
    
    if (0 <= challleft <= 10){
        const difference = 10 - challleft

        const challid = document.getElementById('chall')
        if (challid) {
            challid.textContent = `${difference}`
        }

        
    }else{
        const challid = document.getElementById('chall')
        if (challid) {
            challid.textContent = `error`
        }
    }
}

function serverstatus(){
    const ping = "check for ping on server callvback"
    
    
    if (ping){

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
}


timeleft()
challleft()
serverstatus() //only need to update once when website loads

setInterval(() => {
    
    timeleft()
}, 1200);

setInterval(() => {
    challleft()
}, 240000); //no need to update alot just 3-4 mins do it





// hash from ground up

function rightrotate(w1, num){
    return ((w1 >>> num) | (w1 << (32 - num))) >>> 0

    
}
function rightshift(w1, num){
    
    return (w1 >>> num)  >>> 0
    
}

function sha256(normal){
    
    if (normal){
        let enc=[]
        for (let i = 0; i < normal.length; i++) {
            enc.push(normal.charCodeAt(i))
        }
        enc.push(0x80)
        while ((enc.length % 64) !== 56) {
            enc.push(0x00);
        }

        let bitLen = normal.length * 8
        let lenBytes = []
        for (let i = 7; i >= 0; i--) {
            lenBytes.push((bitLen >> (i * 8)) & 0xFF)
        }

        enc = enc.concat(lenBytes)

    
        let h0 = 0x6a09e667
        let h1 = 0xbb67ae85
        let h2 = 0x3c6ef372
        let h3 = 0xa54ff53a
        let h4 = 0x510e527f
        let h5 = 0x9b05688c
        let h6 = 0x1f83d9ab
        let h7 = 0x5be0cd19



        let h0_copy = 0x6a09e667
        let h1_copy = 0xbb67ae85
        let h2_copy = 0x3c6ef372
        let h3_copy = 0xa54ff53a
        let h4_copy = 0x510e527f
        let h5_copy = 0x9b05688c
        let h6_copy = 0x1f83d9ab
        let h7_copy = 0x5be0cd19

        const k = [
                0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
                0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
                0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
                0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
                0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
                0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
                0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
                0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
                0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
                0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
                0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
                0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
                0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
                0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
                0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
                0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
            ]

        let w = []
        for(i=0; i<16; i++){
            binary8star4 = (enc[4*i] << 24) | (enc[4*i+1] << 16) | (enc[4*i+2] << 8) | enc[4*i+3]
            w.push(binary8star4)
        }
        
        for (i=16; i< 64; i++){
            w.push(0x00)
        }

        for (i=16; i<64; i++){
            let s0 = ((rightrotate(w[i-15], 7)) ^
                rightrotate(w[i-15], 18) ^
                rightshift(w[i-15], 3)) >>> 0

            let s1 = (rightrotate(w[i- 2], 17) ^
                rightrotate(w[i- 2], 19) ^
                rightshift(w[i- 2], 10)) >>> 0

            w[i] = (w[i-16] +
                    s0 +
                    w[i-7] +
                    s1)  >>> 0
        }

        let a = h0;
        let b = h1;
        let c = h2;
        let d = h3;
        let e = h4;
        let f = h5;
        let g = h6;
        let h = h7;

        for (let i = 0; i < 64; i++) {
            let S1 = (rightrotate(e, 6) ^ rightrotate(e, 11) ^ rightrotate(e, 25)) >>> 0;
            let ch = ((e & f) ^ ((~e >>> 0) & g)) >>> 0;
            let temp1 = (h + S1 + ch + k[i] + w[i]) >>> 0;
            let S0 = (rightrotate(a, 2) ^ rightrotate(a, 13) ^ rightrotate(a, 22)) >>> 0;
            let maj = ((a & b) ^ (a & c) ^ (b & c)) >>> 0;
            let temp2 = (S0 + maj) >>> 0;

            h = g;
            g = f;
            f = e;
            e = (d + temp1) >>> 0;
            d = c;
            c = b;
            b = a;
            a = (temp1 + temp2) >>> 0;
        }

        // Update hash state
        h0 = (h0 + a) >>> 0;
        h1 = (h1 + b) >>> 0;
        h2 = (h2 + c) >>> 0;
        h3 = (h3 + d) >>> 0;
        h4 = (h4 + e) >>> 0;
        h5 = (h5 + f) >>> 0;
        h6 = (h6 + g) >>> 0;
        h7 = (h7 + h) >>> 0;


        // ncrypt = ''.join(f'{h:08x}' for h in [h0,h1,h2,h3,h4,h5,h6,h7])

        let ncrypt = [h0, h1, h2, h3, h4, h5, h6, h7]
            .map(h => h.toString(16).padStart(8, '0'))
            .join('');
        console.log(ncrypt)
        return ncrypt

        

    }else{
        return 0
    }
}

console.log(sha256('hi'), "this")

sha256('hi')

// b*as wont fking work on js works on py fk nah did evetrything FFf