var score = 0
var missed = 0
var onOff = 0

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
        gameNav.setIntData = setInterval(function () { placeMole(evt) }, 1000)

    },
    stopGame: function () {
        score = 0
        missed = 0
        onOff = 0
        document.querySelector("#missed").innerHTML = `Missed ${missed}`
        document.querySelector("#score").innerHTML = `Score ${score}`
        clearInterval(gameNav.setIntData);
        var elemLeft = document.querySelectorAll(".picCont")
        for (var i = 0; i < elemLeft.length; i++) {
            elemLeft[i].remove()
        }

    },
    setIntData: 0
}

function placeMole(evt) {
    var divCont = document.createElement("div")
    divCont.setAttribute("class", "picCont")
    divCont.setAttribute("data-id", "")
    document.getElementById("gameContainer").appendChild(divCont)
    var mole = document.createElement("img")
    mole.setAttribute("class", "molePic")
    mole.setAttribute("src", "mole.png")
    divCont.appendChild(mole)

    var x = getRandomInt(0, 630)
    var y = getRandomInt(0, 330)
    divCont.style.left = `${x}px`
    divCont.style.top = `${y}px`
    setTimeout(function () { removeMole(divCont) }, 3000)
}

document.querySelector("#gameContainer").addEventListener("click", addScore)
document.querySelector("#start").addEventListener("click", gameNav.startGame)
document.querySelector("#endGame").addEventListener("click", gameNav.stopGame)

function removeMole(divCont) {
    if (divCont.dataset.id == "") {
        missed++
        if (onOff == 1){
            document.querySelector("#missed").innerHTML = `Missed ${missed}`
        }
    }
    if (missed == 5) {
        gameNav.stopGame()
        gameOver()
        score = 0
        missed = 0
    }
    divCont.remove()

}

function addScore(event) {
    event.preventDefault()
    if (event.target.className == "divCont") {
        event.target.setAttribute("data-id", "clicked")
        event.target.remove()
        score++
        document.getElementById("score").innerHTML = `Score ${score}`
    }
    else if (event.target.className == "molePic") {
        event.target.parentNode.setAttribute("data-id", "clicked")
        event.target.parentNode.remove()
        score++
        document.getElementById("score").innerHTML = `Score ${score}`
    }
}

function gameOver() {
    if (missed >= 5) {
        document.querySelector("#missed").innerHTML = `Missed 0`
        document.querySelector("#score").innerHTML = `Score 0`
        var gameOverMessage = document.createElement("h1")
        document.querySelector("#gameContainer").appendChild(gameOverMessage)
        gameOverMessage.setAttribute("id", "gameOverMess")
        gameContainer.innerHTML = "GAME OVER"

    }
}