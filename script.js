var score = 0
var missed = 0
var onOff = 0
var timeMole = 1000
var level = 0
var messGameOver = `GAME OVER <br> Score ${score} <br> Lelel ${level}`
var messCongr = `Congratulation! All moles are underground. Your score  ${score}`
var smashAudio= new Audio();
smashAudio.src = "assets/Dart.mp3";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var gameNav = {
    startGame: function (evt) {
        if (onOff == 0) {
            onOff = 1
        } else {
            gameNav.stopGame() 
            onOff = 1 
        }
        if (document.querySelector("#gameOverMess")){
            document.querySelector("#gameOverMess").remove()
        }
        
        timeMole = 1000
        gameNav.setIntData = setInterval(function () { placeMole() }, timeMole)
        gameNav.setIntLevel = setInterval(function () { nextLevel() }, 10000)
    },
    stopGame: function () {
        toZero()
        stopGameMain()

    },
    setIntData: 0,
    setIntLevel: 0
}
function toZero(){
    score = 0
    missed = 0
    onOff = 0
    level = 0
}
function stopGameMain(){
    document.querySelector("#missed").innerHTML = `Missed ${missed}`
    document.querySelector("#score").innerHTML = `Score ${score}`
    document.querySelector("#level").innerHTML = `Level ${level}`
    clearInterval(gameNav.setIntData);
    clearInterval(gameNav.setIntLevel);
    var elemLeft = document.querySelectorAll(".picCont")
    for (var i = 0; i < elemLeft.length; i++) {
        elemLeft[i].remove()
    }
}

function placeMole() {
    var divCont = document.createElement("div")
    divCont.setAttribute("class", "picCont")
    divCont.setAttribute("data-id", "")
    document.getElementById("gameContainer").appendChild(divCont)
    var mole = document.createElement("img")
    mole.setAttribute("class", "molePic")
    mole.setAttribute("src", "assets/mole.png")
    divCont.appendChild(mole)

    var x = getRandomInt(0, 780)
    var y = getRandomInt(0, 210)
    divCont.style.left = `${x}px`
    divCont.style.top = `${y}px`
    setTimeout(function () { removeMole(divCont) }, 3000)
}

document.querySelector("#gameContainer").addEventListener("click", addScore)
document.querySelector("#start").addEventListener("click", gameNav.startGame)
document.querySelector("#endGame").addEventListener("click", gameNav.stopGame)

function removeMole(divCont) {
    if (divCont.dataset.id == "") {
        if (onOff == 1){
            missed++
            document.querySelector("#missed").innerHTML = `Missed ${missed}`
        }
    }
    if (missed == 5) {
        stopGameMain()
        messGameOver = `GAME OVER <br> Score ${score} <br> Lelel ${level}`
        gameOver(messGameOver)
        toZero()
    }
    divCont.remove()

}

function addScore(event) {
    event.preventDefault()
    if (event.target.className == "divCont") {
        smashAudio.pause();
        smashAudio.currentTime = 0;
        smashAudio.play()
        event.target.setAttribute("data-id", "clicked")
        event.target.remove()
        score++
        document.getElementById("score").innerHTML = `Score ${score}`
    }
    else if (event.target.className == "molePic") {
        smashAudio.pause();
        smashAudio.currentTime = 0;
        smashAudio.play()
        event.target.parentNode.setAttribute("data-id", "clicked")
        event.target.parentNode.remove()
        score++
        document.getElementById("score").innerHTML = `Score ${score}`
    }
}

function gameOver(message) {
        var gameOverMessage = document.createElement("h1")
        document.querySelector("#gameContainer").appendChild(gameOverMessage)
        gameOverMessage.setAttribute("id", "gameOverMess")
        gameOverMessage.innerHTML = message
        document.querySelector("#missed").innerHTML = `Missed 0`
        document.querySelector("#score").innerHTML = `Score 0`
        document.querySelector("#level").innerHTML = `Level 0`
        
}

function nextLevel(){
    timeMole = timeMole - 50
    if (timeMole == 0) {
        gameOver(messCongr) 
    } else{
    level ++
    document.querySelector("#level").innerHTML = `Level ${level}`
    clearInterval(gameNav.setIntData);
    gameNav.setIntData = setInterval(function () { placeMole() }, timeMole)
    }
}