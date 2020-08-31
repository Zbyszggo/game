var canvas;
var canvasContext;
var score
var ballx = 400
var ballY = 300
var ballSpeedX = -6
var ballSpeedY = 2
var bounce = document.createElement('audio')
bounce.src =  './bounce.wav'
var leftPadY = 250;
var rightPadY = 250;
var leftPlayerScore = 0
var rightPlayerScore = 0
const WINNER_SCORE = 5
const PADDLE_HEIGHT = 130;
const PADDLE_THICC = 15

class gameObject{
    constructor(color,x,y,h,w){
        this.color = color
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }

    spawn(){
        canvasContext.fillStyle = this.color
        canvasContext.fillRect(this.x,this.y,this.w,this.h)
    }

    spawnPlayer()
    {
        canvasContext.fillStyle = this.color
        canvasContext.beginPath()
        canvasContext.arc(ballx, ballY, this.w, 0, Math.PI* 2, true)
        canvasContext.fill()
    }

    resizeObject(w,h){
        this.w = w
        this.h = h
    }
    
    changeObjectPos(x,y){
        this.x = x
        this.y = y
    }
    Xposition(){
        return this.x
    }
    Yposition(){
        return this.y
    }
    worldPosition(){
        return {
            x: this.x,
            y: this.y
        }
    }
    objectW(){
        return this.w
    }
    objectH(){
        return this.h
    }
}
//left player
var leftPlayer = new gameObject('white', 1, leftPadY,PADDLE_HEIGHT, PADDLE_THICC)
var rightPlayer = new gameObject('white', 1, rightPadY, PADDLE_HEIGHT, PADDLE_THICC)
var Ball = new gameObject('white', ballx, ballY, 12, 12)

getMousePosition = (e) =>{
    var rect = canvas.getBoundingClientRect()
    var root = document.documentElement
    var mouseX = e.clientX - rect.left - root.scrollLeft
    var mouseY = e.clientY - rect.top - root.scrollTop
    return {
        x:mouseX,
        y:mouseY
    }
    }

ballReset = (dir) =>{
    ballx = canvas.width/2 - Ball.objectW()
    ballY = canvas.height/2 - Ball.objectH()
    ballSpeedX = dir
    ballYspeedY = 2
}

window.onload = function() {
    canvas = document.getElementById('screen')
    canvasContext = canvas.getContext('2d')
    var framesPerSecond = 60
    setInterval(function() {
        drawEverything()
        document.getElementById('coords').innerHTML = 'x:' + Ball.Xposition() + ' y:' + Ball.Yposition()
    },1000/framesPerSecond)

    canvas.addEventListener('mousemove',(e)=>{
        var mousePos = getMousePosition(e)
        leftPadY = mousePos.y - (PADDLE_HEIGHT/2)
    })
}


enemyComputerMovement = () =>{
    var rightPadCenter = rightPadY + (PADDLE_HEIGHT/2)
    if(rightPadCenter < ballY-4)
    {
        rightPadY  += 2.5
    }
    else
    {
        rightPadY -= 2.5
    }
}
gameOver = () =>{
    ballSpeedX = 0
    ballSpeedY = 0
}
unpauseGame = () =>
{
    location.reload()
}

checkPlayersScore = () =>{
    if(leftPlayerScore >= WINNER_SCORE)
    {
        console.log('Left Player Won!!')
        gameOver()
    }
    else if (rightPlayerScore >= WINNER_SCORE)
    {
        console.log('Right Player Won!!')
        gameOver()
    }
}
drawScene = () =>{
    canvasContext.fillStyle = 'black'
    canvasContext.fillRect(0,0, canvas.width, canvas.height)
}
drawEverything=()=>{
    drawScene()
    enemyComputerMovement()
    leftPlayer.spawn()
    rightPlayer.spawn()
    Ball.spawnPlayer()
    canvasContext.fillText(`${leftPlayerScore}`, 200, canvas.height/6)
    canvasContext.fillText(`${rightPlayerScore}`, 600, canvas.height/6)
    leftPlayer.changeObjectPos(1, leftPadY)
    rightPlayer.changeObjectPos(canvas.width - rightPlayer.objectW()-1, rightPadY)
    ballx += ballSpeedX
    ballY += ballSpeedY
    Ball.changeObjectPos(ballx,ballY)

    if(ballx < 15)
    {
        if(ballY > leftPadY && ballY < leftPadY + PADDLE_HEIGHT)
        {
            ballSpeedX = -ballSpeedX
            var deltaY = ballY - (leftPadY + PADDLE_HEIGHT/2)
            ballSpeedY = deltaY * 0.1
            bounce.play()
        }
        else
        {
            console.log('Score for player Two')
            rightPlayerScore+=1
            ballReset(6)
            checkPlayersScore()
        }
    }

    if(ballx > canvas.width-16)
    {
        if(ballY > rightPadY && ballY < rightPadY + PADDLE_HEIGHT)
        {
            var deltaY = ballY - (rightPadY + PADDLE_HEIGHT/2)
            ballSpeedY = deltaY *0.1 
            ballSpeedX = -ballSpeedX
            bounce.play()
        }
        else
        {

            console.log('Score for player One ')
            leftPlayerScore+=1
            ballReset(-6)
            checkPlayersScore()
        }
    }

    if(ballY < Ball.objectH() ){
        ballSpeedY = -ballSpeedY
        bounce.play()
    }
    if(ballY > canvas.height - Ball.objectH())
    {
        ballSpeedY = -ballSpeedY
        bounce.play()
    }
}