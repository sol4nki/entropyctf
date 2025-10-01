







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