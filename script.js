
var screenSize = 25;
var rows = 20;
var cols = 20;
var screen;
var context; 

var snakeX=screenSize * 10;
var snakeY=screenSize * 10;

var velocityX=0;
var velocityY=0;

var addbody=[];

var foodX;
var foodY;

var score =0;

var gameover=false;


window.onload = function() {
    screen = document.getElementById("screen");
    screen.height = rows * screenSize;
    screen.width = cols * screenSize;
    context = screen.getContext("2d"); 

    randomFood();
    document.addEventListener('keyup', snakeDirection);
    setInterval(update, 2000/6);
}


function update() {

    if(gameover){
        return
    }

    context.fillStyle="white";
    context.fillRect(0, 0, screen.width, screen.height);

    context.fillStyle="red";
    context.fillRect(foodX , foodY , screenSize , screenSize);

    if(snakeX == foodX && snakeY == foodY){
        addbody.push([snakeX , snakeY]);
        randomFood();
        score++;
    }
    for(let i= addbody.length-1;i>0;i--){
        addbody[i]=addbody[i-1];
    }
    if(addbody.length){
        addbody[0]=[snakeX , snakeY];

    }

    context.fillStyle="green";
    snakeX += velocityX * screenSize;
    snakeY += velocityY * screenSize;
    context.fillRect(snakeX , snakeY , screenSize , screenSize);

    for(let i=0; i<addbody.length;i++){
        context.fillRect(addbody[i][0] , addbody[i][1] , screenSize , screenSize)
    }

    if(snakeX < 0 || snakeX > cols*screenSize || snakeY < 0 || snakeY > rows*screenSize){
        gameover =true;
        alert('Game Over');
    }
    
    for(let i=0;i<addbody.length;i++){
        if(snakeX == addbody[i][0] && snakeY == addbody[i][1]){
            gameover =true;
            alert('Game Over');
        }
    }

    context.fillStyle = "black"; 
    context.font = "20px Arial"; 
    context.fillText("Score: " + score, 10, 20);

}


function snakeDirection(e) {
    if(e.code == "ArrowUp" && velocityY!== 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY !== -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft" && velocityX !== 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == "ArrowRight" && velocityX !== -1){
        velocityX = 1;
        velocityY = 0;
    }
}

function randomFood(){
    foodX = Math.floor(Math.random() * cols) * screenSize;
    foodY = Math.floor(Math.random() * rows) * screenSize;
}
