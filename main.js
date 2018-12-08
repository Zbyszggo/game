var canvas;
var canvasContext;
var ballx = 400 
var ballY = 300
var ballSpeedX = 4
var ballSpeedY = 2

var leftPadY = 250;
const PADDLE_HEIGHT = 200;

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
var leftPlayer = new gameObject('white',1, leftPadY,PADDLE_HEIGHT,25)
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

ballReset = () =>{
    ballx = canvas.width/2 - Ball.objectW()
    ballY = canvas.height/2 - Ball.objectH()
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


drawScene = () =>{
    canvasContext.fillStyle = 'black'
    canvasContext.fillRect(0,0, canvas.width, canvas.height)
}
drawEverything=()=>{
    drawScene()
    leftPlayer.spawn()
    leftPlayer.changeObjectPos(1, leftPadY)
    ballx  = ballx + ballSpeedX
    ballY = ballY + ballSpeedY
    Ball.spawnPlayer()
    Ball.changeObjectPos(ballx,ballY)
    if(ballx < 0)
    {
        if(ballY > leftPadY && ballY < leftPadY + PADDLE_HEIGHT)
        {
            ballSpeedX = -ballSpeedX
        }
        else
        {
            ballReset()
        }
    }

    if(ballx > canvas.width - Ball.objectW())
    {
        ballSpeedX  = -ballSpeedX
    }

    if(ballY < Ball.objectH() ){
        ballSpeedY = -ballSpeedY
    }
    if(ballY > canvas.height - Ball.objectH())
    {
        ballSpeedY = -ballSpeedY
    }
}