const gameover = new Audio('music/gameover.mp3')
const foo = new Audio('music/food.mp3')
const move = new Audio('music/move.mp3')
let inputDir = { x: 0, y: 0 }
let lastPaintTime = 0
let speed = 10
let snakeArr = [
    { x: 9, y: 13 }
]
let food = { x: 4, y: 5 }
let score = 0
let highScore = localStorage.getItem('highscore')
if(highScore===null){
    highScore=0
}
hs.innerHTML = "High Score: " + highScore

//game loop
function main(ctime) {
    window.requestAnimationFrame(main)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime
    gameEngine()
}

//check collision
function isCollide(snakArr) {
    //if snake collides with itself
    for (let i = 1; i < snakArr.length; i++) {
        if (snakArr[i].x === snakArr[0].x && snakArr[i].y === snakArr[0].y)
            return true
    }
    //if snake bumps into wall
    if (snakArr[0].x >= 18 || snakArr[0].x <= 0 || snakArr[0].y <= 0 || snakArr[0].y >= 18)
        return true
    return false
}

function gameEngine() {

    //update content
    if (isCollide(snakeArr)) {
        gameover.play()
        inputDir = { x: 0, y: 0 }
        alert("Game over. Press any key to play again")
        snakeArr = [{ x: 9, y: 13 }]
        score = 0
        h1.innerHTML = "Score: "+score
    }
    //if food eaten regenerate food and increment score
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foo.play()
        score++;
        h1.innerHTML = "Score: " + score;
        if (score > highScore) {
            highScore = score
            hs.innerHTML = "High Score: " + highScore
            localStorage.setItem('highscore', highScore)
        }
        snakeArr.push({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        const a = 2;
        const b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //moving snake
    for (i = snakeArr.length - 2; i >= 0; i--)
        snakeArr[i + 1] = { ...snakeArr[i] }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //display content
    container.innerHTML = ""
    snakeArr.forEach((e, index) => {
        snakeEle = document.createElement('div')
        snakeEle.style.gridRowStart = e.y
        snakeEle.style.gridColumnStart = e.x
        if (index === 0) {
            snakeEle.classList.add('head')
        } else {
            snakeEle.classList.add('snake')
        }
        container.appendChild(snakeEle)
    })

    foodEle = document.createElement('div')
    foodEle.style.gridRowStart = food.y
    foodEle.style.gridColumnStart = food.x
    foodEle.classList.add('food')
    container.appendChild(foodEle)
}

//main logic
window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }
    move.play()
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})