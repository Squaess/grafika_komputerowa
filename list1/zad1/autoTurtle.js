window.addEventListener("load", function(event){
  var left = command0.task;
  var right = command1.task;
  var forward = command2.task;
  var backward = command3.task;

  ctx.strokeStyle= "#FF0000";

  let i;
  let j;
  for ( j = 0; j < 9; j = j + 1) {
    for ( i = 0; i < 9; i = i + 1) {
      forward(40);
      left(40);
    }
    left(40);
  }

  ctx.moveTo(rx(1), ry(0));
  turtle.posX = 1;

  ctx.strokeStyle = "#0000FF";

  for ( j = 0; j < 9; j = j + 1) {
    for ( i = 0; i < 6; i = i + 1) {
      forward(30);
      left(60);
    }
    left(40);
  }

  ctx.moveTo(rx(-1), ry(0));
  turtle.posX = -1;

  ctx.strokeStyle = "#00FF00";

  for ( j = 0; j < 9; j = j + 1) {
    for ( i = 0; i < 3; i = i + 1) {
      forward(40);
      left(140);
    }
    left(20);
  }

});
