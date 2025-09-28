const http = require('http'); 

const hostname = '127.0.0.1'; 
const port = 3000;
const server = http.createServer((req, res) => {
    
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    
    res.end('Hello, World!\n');

    
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


// use user database of login info 
// file like "email, password, points, team name, member name"
// use that to check login stuff
// only accessible over college wifi
// user cant create accounts to prevent external conflict

//  

// key stealer
// points randomly removed from the encrypted key provided to steal (decrypt and check which team is associated with it)


// flag input
// everytime flag input check for that specific level's flag from db and give appropriate response and update points (0+ if wrong and x+ if correct)

// 
