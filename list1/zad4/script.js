var ctx, rminx, rmaxx, rminy, rmaxy;
var rpixel=0.005; // size of pixel


function run() {

  var canvas = document.getElementById("canvas");
  canvas.width = 800;
  canvas.height = 480;

  // clear our canvas to opaque black
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  rminx=-rpixel*ctx.canvas.width/2;
  rmaxx= rpixel*ctx.canvas.width/2;
  rminy=-rpixel*ctx.canvas.height/2;
  rmaxy= rpixel*ctx.canvas.height/2;

  drawBoard();
}

window.onload = run;

function drawBoard(){
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.moveTo(rx(-1.5), ry(-1));
  ctx.lineTo(rx(-0.5), ry(1));
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(rx(1.5), ry(-1));
  ctx.lineTo(rx(0.5), ry(1));
  ctx.stroke();
}



function rx (x) {
    return (x-rminx)/(rmaxx-rminx)*(ctx.canvas.width);
}

function ry (y) {
    return ctx.canvas.height-(y-rminy)/(rmaxy-rminy)*(ctx.canvas.height);
}
