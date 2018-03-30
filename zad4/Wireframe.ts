const directions = 210

function drawRectangle(x1,y1,height1,length1, diagLength){
    this.c = <HTMLCanvasElement> document.getElementById("canvas");
    this.ctx = this.c.getContext("2d");
    const endx1 = x1 + diagLength * Math.sin(directions * Math.PI / 180);//50 + cos
    const endy1 = y1 + diagLength * Math.sin(directions * Math.PI / 180);

    this.ctx.rect(x1,y1,length1,height1);
    this.ctx.rect(endx1,endy1,length1,height1 );
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(x1,y1);
    this.ctx.lineTo(endx1,endy1);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(x1+length1,y1+height1);
    this.ctx.lineTo(endx1+length1,endy1+height1);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(x1,y1+height1);
    this.ctx.lineTo(endx1,endy1+height1);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(x1+length1,y1);
    this.ctx.lineTo(endx1+length1,endy1);
    this.ctx.stroke();

}


function start() {
    this.c = <HTMLCanvasElement> document.getElementById("canvas");
    this.ctx = this.c.getContext("2d");
    startGame();
    // drawRectangle(300,300,50,100, 50);
    // drawRectangle(500,400,50,50, 50);
    // drawRectangle(800,100,150,80, 50);
    // drawRectangle(40,40,40,80, 50);


}

var myGamePiece;
var myObstacle1;
var myObstacle2;
var myObstacle3;
var myObstacle4;
var obstacles = [myObstacle1,myObstacle2,myObstacle3,myObstacle4]
var interval;
function startGame() {
    myGamePiece = new component(130, 130, 60,60,40, "red");
    myObstacle1  = new component(300,300,50,100, 30,"blue");
    myObstacle2  = new component(500,400,50,50, 15,"green");
    myObstacle3  = new component(800,100,150,80, 25,"violet");
    myObstacle4  = new component(40,40,40,80, 20,"black");
    myGamePiece.update();
    myObstacle1.update();
    myObstacle2.update();
    myObstacle3.update();
    myObstacle4.update();

    interval = setInterval(updateGameArea, 20);

}


var z=0;
function component(x1,y1,height1,length1, diagLength,colorUser) {


    this.length1 = length1;
    this.height1 = height1;
    this.speedX = 0;
    this.speedY = 0;
    this.x1 = x1;
    this.y1 = y1;
    this.diagLength = diagLength;
    // this.endx1 = this.x1 + diagLength * Math.sin(directions * Math.PI / 180);;
    // this.endy1 = this.y1 + diagLength * Math.sin(directions * Math.PI / 180);
    this.colorUser = colorUser;


    this.update = function() {
        var endx1 = this.x1 + this.diagLength * Math.sin(directions * Math.PI / 180);
        var endy1 = this.y1 + this.diagLength * Math.sin(directions * Math.PI / 180);
        this.c = <HTMLCanvasElement> document.getElementById("canvas");
        this.ctx = this.c.getContext("2d");

        this.ctx.strokeStyle=this.colorUser;
        this.ctx.rect(this.x1,this.y1,this.length1,this.height1);
        this.ctx.rect(endx1,endy1,this.length1,this.height1 );
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(this.x1,this.y1);
        this.ctx.lineTo(endx1,endy1);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(this.x1+this.length1,this.y1+this.height1);
        this.ctx.lineTo(endx1+this.length1,endy1+this.height1);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(this.x1,this.y1+this.height1);
        this.ctx.lineTo(endx1,endy1+this.height1);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(this.x1+this.length1,this.y1);
        this.ctx.lineTo(endx1+this.length1,endy1);
        this.ctx.stroke();
    };
    this.newPos = function() {
        this.x1 += this.speedX;
        this.y1 += this.speedY;
        if(deep == 1){
            this.length1 -= 0.1;
            this.height1 -= 0.1;
            this.diagLength -= 0.1;
            z -=1;
        }
        else if(shallow == 1){
            this.length1 += 0.1;
            this.height1 += 0.1;
            this.diagLength += 0.1;
            z +=1;
        }

    };
    this.crashWith = function(otherobj,nr) {
        var crash = true;
        var myleft = this.x1;
        var myright = this.x1 + (this.length1);
        var mytop = this.y1;
        var mybottom = this.y1 + (this.height1);
        var otherleft = otherobj.x1;
        var otherright = otherobj.x1 + (otherobj.length1);
        var othertop = otherobj.y1;
        var otherbottom = otherobj.y1 + (otherobj.height1);
        var depthFront = z + (otherobj.diagLength);
        var depthBack = z - (this.diagLength)//wszystko ma zero
        document.getElementById("crash"+nr).innerText =
            "myleft "+myleft+
            " myright " + myright +
            " mytop " + mytop +
            " mybottom " + mybottom +
            " otherleft " + otherleft +
            " otherright " + otherright +
            " othertop " + othertop +
            " otherbottom " + otherbottom +  " color "+ otherobj.colorUser
            +' depthFront '+( depthFront ) + " depthBack "+ depthBack ;

        if(myright > otherleft && (mybottom > othertop && mytop < otherbottom && myleft < otherright
            &&  ( (depthBack < 0 && depthFront > 0) || (depthBack > 0 && depthFront < 0) ))  //prawe strony mojego klocka i lewa
        )
            {
            return true;
        }
             //crash
        return false;
    }
}

function clear(){
    this.c = <HTMLCanvasElement> document.getElementById("canvas");
    this.ctx = this.c.getContext("2d");
    this.ctx.clearRect(0, 0, 1000, 500);
}

function isCrash(){
    if(myGamePiece.crashWith(myObstacle1,1))
        return true;
     else if(myGamePiece.crashWith(myObstacle2,2))
         return true;
    else if(myGamePiece.crashWith(myObstacle3,3))
        return true;
    else if(myGamePiece.crashWith(myObstacle4,4))
        return true;

    return false;
}

function updateGameArea() {
    if (isCrash()) {
        document.getElementById("info").innerText = "GAME OVER"
        stop();
    } else {
        clear();
        myObstacle1.update();
        myObstacle2.update();
        myObstacle3.update();
        myObstacle4.update();
        myGamePiece.newPos();
        myGamePiece.update();
        document.getElementById("info").innerText = "X: " + myGamePiece.x1 +
            " Y: " + myGamePiece.y1 + " Z: " + myGamePiece.z;
    }

}

function stop() {
    clearInterval(this.interval);
}

function moveup() {
    myGamePiece.speedY = -1;
}

function movedown() {
    myGamePiece.speedY = 1;
}

function moveleft() {
    myGamePiece.speedX = -1;
}

function moveright() {
    myGamePiece.speedX = 1;
}

function clearmove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    deep=0;
    shallow=0;
}
var deep =0;
var shallow =0;
function movedeeper() {
    deep = 1;

}

function moveshallower() {
    shallow= 1
}