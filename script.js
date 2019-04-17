var score = 0
var missed = 0

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var gameNav = {
    startGame: function (evt) {
        score = 0
        missed = 0
        gameNav.setIntData = setInterval(function () { placeMole(evt) }, 1000)
    },
    stopGame: function () {
        clearInterval(gameNav.setIntData);
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

    var x = getRandomInt(0, 460)
    var y = getRandomInt(0, 260)
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
        document.querySelector("#missed").innerHTML = `Missed ${missed}`
    }
    if (missed == 5) {
        gameNav.stopGame()
        alert("Game Over")
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