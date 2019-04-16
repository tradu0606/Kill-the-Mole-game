var score = 0

var cnv = document.querySelector("#canvas")


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval(placeMole, 1800)

function placeMole(evt){
    var mole = document.createElement("div")
    mole.setAttribute("class", "molePic")
    document.getElementById("gameContainer").appendChild(mole)
    
    var x = getRandomInt(0, 460)
    var y = getRandomInt(0, 260)
    mole.style.left = `${x}px`
    mole.style.top = `${y}px`
    setTimeout(removeMole, 4000)
}
document.getElementById("gameContainer").addEventListener("click", addScore)
document.querySelector("#check").addEventListener("click", placeMole)

function removeMole(){
    document.querySelectorAll(".molePic")[0].remove()
   
}
function removeMoleClick(event){
    event.target.remove()
   
}
function addScore(event){
    event.preventDefault()
    removeMoleClick(event)
    score ++
    document.getElementById("score").innerHTML = `Score ${score}`
}