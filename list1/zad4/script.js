var ctx, rminx, rmaxx, rminy, rmaxy;
var rpixel=0.005; // size of pixel
var perspective_points = [0, 4];
var character_position = [-1.93, -1.1];
character_height = 0.5;
character_width = 0.3;
character_depth = 0.2;

function myFunction(){
  setInterval(function(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "white";
    drawRect(character_position[0], character_position[1], character_width, character_height, character_depth);
    character_position[1] += 0.01;
    character_position[0] += 0.01;
    character_depth -= 0.001;
    character_height -= 0.001;
  }, 100);
}

function run() {

  var canvas = document.getElementById("canvas");
  canvas.width = 800;
  canvas.height = 450;

  // clear our canvas to opaque black
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  rminx=-rpixel*ctx.canvas.width/2;
  rmaxx= rpixel*ctx.canvas.width/2;
  rminy=-rpixel*ctx.canvas.height/2;
  rmaxy= rpixel*ctx.canvas.height/2;

  ctx.strokeStyle = "white";
  //drawBoard();

}

window.onload = run;

function drawBoard(){

  ctx.beginPath();
  ctx.moveTo(rx(-1.5), ry(-1));
  ctx.lineTo(rx(perspective_points[0]), ry(perspective_points[1]));
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(rx(1.5), ry(-1));
  ctx.lineTo(rx(perspective_points[0]), ry(perspective_points[1]));
  ctx.stroke();
}


function drawRect(x0, y0, width, height, depth) {

  var vaertex = [
      a = [x0, y0],
      b = [x0, y0+height],
      c = [x0 + width, y0 + height],
      d = [x0 + width, y0]];

  var vertex1 = [
      e = compute(a, depth),
      f = compute(b, depth),
      g = compute(c, depth),
      h = compute(d, depth)
    ]

  ctx.beginPath();
  ctx.moveTo(rx(a[0]), ry(a[1]));
  ctx.lineTo(rx(b[0]), ry(b[1]));
  ctx.lineTo(rx(c[0]), ry(c[1]));
  ctx.lineTo(rx(d[0]), ry(d[1]));
  ctx.lineTo(rx(a[0]), ry(a[1]));

  ctx.moveTo(rx(e[0]), ry(e[1]));
  ctx.lineTo(rx(f[0]), ry(f[1]));
  ctx.lineTo(rx(g[0]), ry(g[1]));
  ctx.lineTo(rx(h[0]), ry(h[1]));
  ctx.lineTo(rx(e[0]), ry(e[1]));


  let i = 0;
  for (i; i < vaertex.length; i++){
    ctx.moveTo(rx(vaertex[i][0]), ry(vaertex[i][1]));
    ctx.lineTo(rx(vertex1[i][0]), ry(vertex1[i][1]));
  }

  ctx.stroke();
}

function compute(points, depth){
  var y2 = points[1]+depth;

  if(points[0] - perspective_points[0] === 0){
      return [points[0], y2];
  }
  var a  = (points[1]-perspective_points[1])/(points[0] - perspective_points[0]);
  var b = points[1] - a * points[0];
  var x2 = (y2 - b) / a;
  return [x2, y2];
}

function rx (x) {
    return (x-rminx)/(rmaxx-rminx)*(ctx.canvas.width);
}

function ry (y) {
    return ctx.canvas.height-(y-rminy)/(rmaxy-rminy)*(ctx.canvas.height);
}
