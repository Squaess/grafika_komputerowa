window.onload = load;

function load() {
  var can = document.getElementById('canvas');
  var ctx = can.getContext("2d");
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(0,0,150,75);

  var turtle = {
    posX : 0,
    posY : 0,
    angle : 0,
    turn : function(angle) {
      this.angle = (this.angle + angle) % 360;
    }
  };


  // For getting input from user
  var input = document.getElementById('task');
  input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if( event.keyCode === 13 ) {
      translateInput(input.value);
    }
  });


  // global array of available commands
  var command0 = {
    name: "LEFT",
    task: function(angle){
      console.log("skrecamy w lewo" + angle);
    }
  };

  var command1 = {
    name: "RIGHT",
    task: function(angle){
      console.log("skrecamy w prawo" + angle);
    }
  };

  var command2 = {
    name: "FORWARD",
    task: function(range){
      console.log("jedziemy na przod" + range);
    }
  };

  var command3 = {
    name: "BACKWARD",
    task: function(range){
      console.log("do tylu ziom" + range);
    }
  };

  var commands = [command0, command1, command2, command3];

  function translateInput(code){

    //code should be in 2 block's space separated
    var splited = code.toUpperCase().split(" ");
    if ( splited.length === 2 && isNumeric(splited[1]) ) {
      // check if this commands exist
      // if not alert
      var not_exist = true;
      commands.forEach(function(item, idex, array){
        if(item.name === splited[0]) {
          item.task(splited[1]);
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
