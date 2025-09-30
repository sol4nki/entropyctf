







// === lvls/levels ===

// const clickedId = null

function shrinklvl(clickedId){
    if (clickedId){
        clickedId.id = "content";
    }
}

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
