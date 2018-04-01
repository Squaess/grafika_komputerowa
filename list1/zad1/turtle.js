window.onload = load;
var canvas;
var ctx;
class Turtle {
    constructor(posX, posY, angle){
      this.posX = posX;
      this.posY = posY;
      this.angle = angle;
    }

    turn(angle) {
      this.angle = (this.angle + angle) % 360;
    }
}

var turtle = new Turtle(0,0,0);

var rpixel=0.005; // size of pixel

// global array of available commands
var command0 = {
  name: "LEFT",
  task: function(angle){
    console.log("skrecamy w lewo");
    turtle.turn(angle);
  }
};

var command1 = {
  name: "RIGHT",
  task: function(angle){
    console.log("skrecamy w prawo" + angle);
    turtle.turn(360 - angle);
  }
};

var command2 = {
  name: "FORWARD",
  task: function(range){
    console.log("jedziemy na przod " + range);
    ctx.beginPath();
    ctx.moveTo(rx(turtle.posX), ry(turtle.posY));
    let new_X = turtle.posX + range * rpixel * Math.cos(toRadians(turtle.angle));
    let new_Y = turtle.posY + range * rpixel * Math.sin(toRadians(turtle.angle));
    console.log(turtle.angle);
    ctx.lineTo(rx(new_X), ry(new_Y));
    turtle.posX = new_X;
    turtle.posY = new_Y;
    ctx.stroke();
  }
};

var command3 = {
  name: "BACKWARD",
  task: function(range){
    console.log("do tylu ziom" + range);
    ctx.beginPath();
    ctx.moveTo(rx(turtle.posX), ry(turtle.posY));
    let new_X = turtle.posX - range * rpixel * Math.cos(toRadians(turtle.angle));
    let new_Y = turtle.posY - range * rpixel * Math.sin(toRadians(turtle.angle));
    ctx.lineTo(rx(new_X), ry(new_Y));
    turtle.posX = new_X;
    turtle.posY = new_Y;
    ctx.stroke();
  }
};

var commands = [command0, command1, command2, command3];

var rminx;
var rminy;
var rmaxx;
var rmaxy;

function load() {

  canvas = document.getElementById('canvas');
  ctx = canvas.getContext("2d");
  // screen displays the rectangle [rminx,rmaxx] x [rminy,rmaxy] of R x R

  rminx=-rpixel*ctx.canvas.width/2;
  rmaxx= rpixel*ctx.canvas.width/2;
  rminy=-rpixel*ctx.canvas.height/2;
  rmaxy= rpixel*ctx.canvas.height/2;

  ctx.fillStyle = "#000000";

//  ctx.beginPath();
//  ctx.moveTo(rx(0), ry(0));

  // For getting input from user
  var input = document.getElementById('task');
  input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if( event.keyCode === 13 ) {
      translateInput(input.value);
      input.value = "";
    }
  });

  function translateInput(code){

    //code should be in 2 block's space separated
    var splited = code.toUpperCase().split(" ");
    if ( splited.length === 2 && isNumeric(splited[1]) ) {
      // check if this commands exist
      // if not alert
      var not_exist = true;
      commands.forEach(function(item, idex, array){
        if(item.name === splited[0]) {
          item.task(parseFloat(splited[1]));
          not_exist = false;
        }
      });

      if(not_exist){
        alert("Wrong commands");
      }

    } else {
      alert("Wrong command");
    }
  }

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

}

function rangeToKart(range) {

  let new_X = turtle.posX + range * rpixel * Math.cos(toRadians(turtle.angle));
  let new_Y = turtle.posY + range * rpixel * Math.sin(toRadians(turtle.angle));

  return [new_X, new_Y];
}

function rx (x) {
    return (x-rminx)/(rmaxx-rminx)*(ctx.canvas.width);
}

function ry (y) {
    return ctx.canvas.height-(y-rminy)/(rmaxy-rminy)*(ctx.canvas.height);
}

function rrx(x) {
  return x * (rmaxx-rminx) / ctx.canvas.width + rminx;
}

function rry(y) {
  return (1 - y/ctx.canvas.height) * (rmaxy-rminy) + rminy;
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}
