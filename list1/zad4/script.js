
var ctx, rminx, rmaxx, rminy, rmaxy;
var rpixel = 0.005; // size of pixel
var perspective_points = [0, 2];
var character_position = [-1.93, -1.1];
var character_height = 0.5;
var character_width = 0.4;
var character_depth = 0.2;
var character_details = [];
character_details[0] = [character_position, character_width, character_height, character_depth];
var depth_const = character_depth/character_position[0];
var row_position = 0;
var objectsDetails = [[1, -1.1],0.4, 0.5, 0.2, 0.002];
var score = 0;

var intervalId;

document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(e) {
  var keyCode = e.keyCode;
  switch (keyCode) {
    case 38: //up
      console.log("up");
      goUp();
      break;
    case 40://down
      console.log("down");
      goDown();
      break;
    default:
  }
}

function goUp(){
  row_position++;
  console.log("row_position " + row_position);
  if (row_position < 3) {

    if(character_details[row_position] == null) {
      var new_character_position = compute(character_position, character_depth);
      var to_width_compute = compute([ character_position[0] + character_width, character_position[1]], character_depth);
      var to_height_compute = computeY([character_position[0]+ character_width, character_position[1]+character_height], to_width_compute[0]);

      character_position = new_character_position;
      character_width = to_width_compute[0] - new_character_position[0];
      character_height = to_height_compute[1] - new_character_position[1];
      character_depth = depth_const * new_character_position[0];


      console.log(character_width);
      console.log("position " + character_position);
      console.log("Width " + character_width);
      console.log("Height " + character_height);
      character_details[row_position] = [character_position, character_width, character_height, character_depth];
    } else {

      character_position = character_details[row_position][0];
      character_width = character_details[row_position][1];
      character_height = character_details[row_position][2];
      character_depth = character_details[row_position][3];

    }
  } else {
    row_position = 2;
  }

}

function goDown() {
    row_position--;
    if(row_position >= 0) {

      character_position = character_details[row_position][0];
      character_width = character_details[row_position][1];
      character_height = character_details[row_position][2];
      character_depth = character_details[row_position][3];

    } else {
      row_position = 0;
    }
}

function myFunction(){
  intervalId = setInterval(function(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "white";
    drawRect(character_position[0], character_position[1], character_width, character_height, character_depth);
    drawObjects();
    moveObjects();
    chechObjects();

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score,10,50);
  }, 11);
}

function drawObjects(){

    drawRect(objectsDetails[0][0], objectsDetails[0][1], objectsDetails[1], objectsDetails[2], objectsDetails[3]);

}

function moveObjects(){
  for(var i = 0; i < objectsDetails.length; i++){
    objectsDetails[0][0] -= objectsDetails[4];
  }
}

function chechObjects(){
    if(objectsDetails[0][0] <= -2) {
      var row = Math.floor(Math.random()*3);
      objectsDetails[0][0] = 1;
      objectsDetails[0][1] = character_details[row][0][1];
      objectsDetails[1] = character_details[row][1];
      objectsDetails[2] = character_details[row][2];
      objectsDetails[3] = character_details[row][3];
      objectsDetails[4] += 0.0001;
      score++;
    }

    if(objectsDetails[0][1] === character_position[1]) {
      if ( (character_position[0] + character_width) > objectsDetails[0][0]) {
        alert("Colision\n" + "Your score: " + score);
        clearInterval(intervalId);
        var row = Math.floor(Math.random()*3);
        objectsDetails[0][0] = 1;
        objectsDetails[0][1] = character_details[row][0][1];
        objectsDetails[1] = character_details[row][1];
        objectsDetails[2] = character_details[row][2];
        objectsDetails[3] = character_details[row][3];
        objectsDetails[4] = 0.002;
        score = 0;
      }
    }
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
  initialize();

}

function initialize() {

  goUp();
  goUp();
  goDown();
  goDown();

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

  var e = compute(a, depth),
      f = computeY(b, e[0]),
      h = compute(d, depth),
      g = computeY(c, h[0]);
  var vertex1 = [e, f, g, h];

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

function computeY(points, x0) {
  var x2 = x0;
  var a  = (points[1]-perspective_points[1])/(points[0] - perspective_points[0]);
  var b = points[1] - a * points[0];
  var y2 = a * x0 + b;
  return [x2, y2];
}

function rx (x) {
    return (x-rminx)/(rmaxx-rminx)*(ctx.canvas.width);
}

function ry (y) {
    return ctx.canvas.height-(y-rminy)/(rmaxy-rminy)*(ctx.canvas.height);
}
