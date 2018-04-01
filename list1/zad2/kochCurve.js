var left = command0.task;
var right = command1.task;
var forward = command2.task;
var backward = command3.task;

function drawKoch(){
  var degree = document.getElementById('koch_degree').value;
  degree = parseInt(degree, 10);
  if (Number.isInteger(degree)) {
    console.log(degree);
    startDrawing(degree);
  } else {
    alert("Wrong input");
  }
}


function startDrawing(degree) {
  drawKochCurve(-1.8, -1, 0, 700, degree, 1);
}

function drawKochCurve(x0, y0, angle, range, degree, mode) {

    turtle.posX = x0;
    turtle.posY = y0;
    turtle.angle = angle;


  if (degree === 0) {
    forward(range);
    console.log(turtle.posX + " |  " + turtle.posY);
  } else {

    var axy = rangeToKart(1/3 * range),
        bxy = rangeToKart(2/3 * range);
    console.log("axy: " + axy + " bxy: " + bxy);

    if (mode === 2){
      drawKochCurve(x0, y0, angle, range/3, degree-1, 2);
      drawKochCurve(axy[0], axy[1], (angle-60)%360, range/3, degree-1, 2);
      drawKochCurve(bxy[0], bxy[1], (angle-120)%360, range/3, degree-1, 1);
      drawKochCurve(bxy[0], bxy[1], angle, range/3, degree-1, 2);
    } else {
      drawKochCurve(x0, y0, angle, range/3, degree-1, 1);
      drawKochCurve(axy[0], axy[1], (angle+60)%360, range/3, degree-1, 1);
      drawKochCurve(bxy[0], bxy[1], (angle+120)%360, range/3, degree-1, 2);
      drawKochCurve(bxy[0], bxy[1], angle, range/3, degree-1, 1);
    }
  }
}

/*function drawKochCurve(x1, y1, x2, y2, degree) {

  turtle.posX = x1;
  turtle.posY = y1;
  turtle.angle = toDegree(Math.atan((y2-y1)/(x2-x1)));

  if(degree === 0){

    console.log(turtle.angle);
    console.log((x2-x1));
    forward(Math.sqrt(Math.pow((rx(x2)-rx(x1)), 2) + Math.pow((ry(y2)-ry(y1)), 2)));
  } else {

    var xa = x1 + 1/3 * (x2 - x1),
        ya = y1 + 1/3 * (y2 - y1),

        xb = x1 + 2/3 * (x2 - x1),
        yb = y1 + 2/3 * (y2 - y1),

        xc = xa + (xb - xa) * Math.cos(-turtle.angle) - (yb - ya) * Math.sin(-turtle.angle),
        yc = ya + (yb - ya) * Math.cos(-turtle.angle) + (xb - xa) * Math.sin(-turtle.angle);

        drawKochCurve(x1, y1, xa, ya, degree-1);
        drawKochCurve(xa,ya,xc,yc, degree-1);
        drawKochCurve(xc,yc,xb,yb, degree-1);
        drawKochCurve(xb,yb,x2,y2, degree-1);

  }

}
*/
/*
var drawKochCurve = function(x1, y1, x2, y2, color, alfa, k){
  if( ((x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1)) < k) {
    drawLine(x1,y1,x2,y2, color);
    return;
  }
  var xa = x1 + 1/3 * (x2 - x1),
      ya = y1 + 1/3 * (y2 - y1),

      xb = x1 + 2/3 * (x2 - x1),
      yb = y1 + 2/3 * (y2 - y1),

      xc = xa + (xb - xa) * Math.cos(-alfa) - (yb - ya) * Math.sin(-alfa),
      yc = ya + (yb - ya) * Math.cos(-alfa) + (xb - xa) * Math.sin(-alfa);

  drawKochCurve(x1,y1, xa,ya, color, alfa, k);
  drawKochCurve(xa,ya, xc,yc, color,alfa, k);
  drawKochCurve(xc,yc, xb,yb, color, alfa, k);
  drawKochCurve(xb,yb, x2,y2, color, alfa, k);

}
*/
function toDegree(angle) {
  return angle * 180 / Math.PI;
}
