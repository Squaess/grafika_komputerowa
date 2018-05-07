const blockWidth = 0.05;
const blockHeigh = 0.46;

var gl; // GL context
var glObjects; // references to various GL objects
var html; // HTML objects
var data; // user data

/* SHADER PROGRAM */
/* vertex shader source code */
var vertexShaderSrc= ""+
    "attribute vec4 aVertexPosition; \n"+
    "uniform vec3 uMove; \n"+
    "void main( void ) { \n"+
    "  gl_PointSize=16.0; \n"+
    "  gl_Position= aVertexPosition+ vec4( uMove, 0); \n"+
    "} \n";

/* fragment shader source code */
var fragmentShaderSrc= ""+
    "precision mediump float; \n"+
    "uniform vec3 uColorRGB; \n"+
    "void main( void ) { \n"+
    "  gl_FragColor = vec4( uColorRGB, 1.0 ); \n"+
    "} \n";

/*
  Vertex shader program 2
*/
var vertexShaderSrc2 = ""+
    "attribute vec4 aVertexPosition; \n"+
    "uniform vec3 uMove; \n"+
    "varying vec3 vColorRGB; \n"+
    "void main( void ) { \n"+
    "  gl_PointSize=10.0; \n"+
    "  gl_Position= aVertexPosition+ vec4( uMove, 0); \n"+
    "  vColorRGB=  (vec3(1.0,1.0,1.0) + gl_Position.rgb)*0.5; \n"+
    "} \n";

/*
  Fragment Shader program 2
*/
var fragmentShaderSrc2 = "" +
  "precision mediump float; \n"+
  "varying vec3 vColorRGB; \n"+
  "void main( void ) { \n"+
  "  gl_FragColor = vec4(vColorRGB, 1.0); \n"+
  "} \n";

var htmlInit = function() {
    html={};
    html.html=document.querySelector('#htmlId');
    html.canvas= document.querySelector('#canvasId');
    html.pink = document.querySelector('#pink');
    html.blue = document.querySelector('#blue');
}

var compileAndLinkShaderProgram=function ( gl, vertexShaderSource, fragmentShaderSource ){
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
	console.log(gl.getShaderInfoLog(vertexShader));
	console.log(gl);
	return null;
    }

    var fragmentShader =gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
	console.log(gl.getShaderInfoLog(fragmentShader));
	console.log(gl);
	return null;
    }

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
	console.log("Could not initialise shaders");
	console.log(gl);
	return null;
    }
    // SUCCESS
    return shaderProgram;
};

var glInit= function(canvas) {
    gl = canvas.getContext("experimental-webgl");
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    glObjects={};

    /* create executable shader program */
    glObjects.shaderProgram=compileAndLinkShaderProgram( gl, vertexShaderSrc, fragmentShaderSrc );
    /* attributes */
    glObjects.aVertexPositionLocation = gl.getAttribLocation(glObjects.shaderProgram, "aVertexPosition");
    /* uniform variables */
    glObjects.uMoveLocation = gl.getUniformLocation(glObjects.shaderProgram, "uMove");
    glObjects.uColorRGBLocation = gl.getUniformLocation(glObjects.shaderProgram, "uColorRGB");

    // program shader 2
    glObjects.shaderProgram2 = compileAndLinkShaderProgram(gl, vertexShaderSrc2, fragmentShaderSrc2);
    /* attributes */
    glObjects.aVertexPositionLocation2 = gl.getAttribLocation(glObjects.shaderProgram2, "aVertexPosition");
    //uniform variables
    glObjects.uMoveLocation2 = gl.getUniformLocation(glObjects.shaderProgram2, "uMove");


};

var dataInit= function(){
    data={};
    data.background=[0,0,0,1];

    /* animated object */
    data.object1={};
    data.object1.speed=0.0010; // ?
    data.object1.direction= [1,0.0,0];

    // parameters for drawObject
    data.object1.position=[0,0,0];
    data.object1.colorRGB=[1.0, 1.0, 1.0];
    data.object1.bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, data.object1.bufferId );
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0,0]) , gl.STATIC_DRAW ); // load object's shape
    data.object1.floatsPerVertex=2;
    data.object1.NumberOfVertices=1;
    data.object1.drawMode=gl.POINTS;
    data.object1.program = glObjects.shaderProgram;

    /* Static background object */
    data.object2={};
    // parameters for drawObject
    data.object2.position=[0,0, 0.7];
    data.object2.colorRGB=[0.0, 0.5, 0.5];
    data.object2.bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, data.object2.bufferId );
    gl.bufferData(gl.ARRAY_BUFFER,
		  new Float32Array([
              -0.99,  -0.99,
				      -0.99,  0.99,
				       0.99,  0.99,
				       0.99, -0.99] ) , gl.STATIC_DRAW ); // load object's shape
    data.object2.floatsPerVertex=2;
    data.object2.NumberOfVertices=4;
    data.object2.drawMode=gl.TRIANGLE_FAN;
    data.object2.program = glObjects.shaderProgram2;

    /* Static foreground object */
    data.object3={};
    data.object3.speed=0.0007;
    data.object3.direction = [0, 0, 0];
    // parameters for drawObject
    data.object3.position=[ -0.9, 0, -0.7];
    data.object3.colorRGB=[1.0, 1.0, 1.0];
    data.object3.bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, data.object3.bufferId );
    gl.bufferData(gl.ARRAY_BUFFER,
		  new Float32Array([
            -blockWidth/2, -blockHeigh/2,
				    -blockWidth/2,  blockHeigh/2,
				     blockWidth/2,  blockHeigh/2,
				     blockWidth/2, -blockHeigh/2 ] ) , gl.STATIC_DRAW ); // load object's shape
    data.object3.floatsPerVertex=2;
    data.object3.NumberOfVertices=4;
    data.object3.drawMode=gl.TRIANGLE_FAN;
    data.object3.program = glObjects.shaderProgram;

    /* Static foreground object */
    data.object4={};
    data.object4.speed=0.0007;
    data.object4.direction = [0, 0, 0];
    // parameters for drawObject
    data.object4.position=[ 0.9, 0, -0.7];
    data.object4.colorRGB=[1.0, 1.0, 1.0];
    data.object4.bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, data.object4.bufferId );
    gl.bufferData(gl.ARRAY_BUFFER,
		  new Float32Array([
        -blockWidth/2, -blockHeigh/2,
        -blockWidth/2,  blockHeigh/2,
         blockWidth/2,  blockHeigh/2,
         blockWidth/2, -blockHeigh/2  ] ) , gl.STATIC_DRAW ); // load object's shape
    data.object4.floatsPerVertex=2;
    data.object4.NumberOfVertices=4;
    data.object4.drawMode=gl.TRIANGLE_FAN;
    data.object4.program = glObjects.shaderProgram;

    /* animation */
    data.animation={};
    data.animation.requestId=0;

};

var redraw = function() {
    var bg = data.background;
    /* prepare clean screen */
    gl.clearColor(bg[0], bg[1], bg[2], bg[3]);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    /* draw objects */
    drawObject(data.object1);
    drawObject(data.object2);
    drawObject(data.object3);
    drawObject(data.object4);

};

var drawObject=function( obj ) {
    /* draw object obj */
    gl.useProgram( obj.program );
    if(obj.program === glObjects.shaderProgram2) {
      gl.enableVertexAttribArray(glObjects.aVertexPositionLocation2);
      gl.bindBuffer(gl.ARRAY_BUFFER, obj.bufferId ); /* refer to the buffer */
      gl.vertexAttribPointer(glObjects.aVertexPositionLocation2, obj.floatsPerVertex, gl.FLOAT, false, 0 /* stride */, 0 /*offset */);
      gl.uniform3fv( glObjects.uMoveLocation2, obj.position );
      gl.drawArrays(obj.drawMode, 0 /* offset */, obj.NumberOfVertices);
    } else {
      gl.lineWidth(3);
      gl.enableVertexAttribArray(glObjects.aVertexPositionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, obj.bufferId ); /* refer to the buffer */
      gl.vertexAttribPointer(glObjects.aVertexPositionLocation, obj.floatsPerVertex, gl.FLOAT, false, 0 /* stride */, 0 /*offset */);
      gl.uniform3fv( glObjects.uMoveLocation, obj.position );
      gl.uniform3fv( glObjects.uColorRGBLocation, obj.colorRGB );
      gl.drawArrays(obj.drawMode, 0 /* offset */, obj.NumberOfVertices);
    }
};

var collision=function(x,y, x1, y1){
    if( x <= x1+blockWidth/2 &&
        x > x1-blockWidth/2 &&
        y <= y1 + blockHeigh/2 &&
        y > y1 - blockHeigh/2) {
        return true;
      } else {
        return false;
      }
}

var normal = function(x, y) {
  var norm = Math.sqrt((x*x) + (y*y));
  console.log('Norm for: '+x + " " + y + " is " + norm);
  return [x/norm, y/norm];
}

var addPink = function() {
  var pscore = html.pink.innerText;
  var newscore = parseInt(pscore) + 1;
  html.pink.innerText = newscore;
}

var addBlue = function(){
  var pscore = html.blue.innerText;
  var newscore = parseInt(pscore) + 1;
  html.blue.innerText = newscore;
}

var animate=function( time ) {
    var timeDelta= time-data.animation.lastTime;
    data.animation.lastTime= time ;

    var x=  data.object1.position[0]+data.object1.direction[0]* data.object1.speed*timeDelta;
    var y=  data.object1.position[1]+data.object1.direction[1]* data.object1.speed*timeDelta;

    data.object1.position[0]= x;
    data.object1.position[1]= (y+3)%2 -1;

    var x1 = data.object3.position[0] + data.object3.direction[0] * data.object3.speed*timeDelta;
    var y1=  data.object3.position[1] + data.object3.direction[1] * data.object3.speed*timeDelta;

    data.object3.position[0] = (x1+3)%2 -1;
    data.object3.position[1] = (y1+3)%2 -1;

    var x2 = data.object4.position[0] + data.object4.direction[0] * data.object4.speed*timeDelta;
    var y2 = data.object4.position[1] + data.object4.direction[1] * data.object4.speed*timeDelta;

    data.object4.position[0] = (x2+3)%2 -1;
    data.object4.position[1] = (y2+3)%2 -1;

    if(collision(x,y, x1, y1)) {
      var ex = x-x1;
      var ey = y-y1;
      if(Math.abs(ey) > 0.02) {
        console.log(ey);
        ey = 0.02  * Math.sign(ey);
        console.log(ey);
      }

      data.object1.direction = normal(ex, ey);
      console.log(data.object1.direction);
    }
    if(collision(x,y, x2, y2)) {
      var ex = x-x2;
      var ey = y-y2;
      if(Math.abs(ey) > 0.02) {
        console.log(ex+" "+ey);
        ey = 0.02 * Math.sign(ey);
        console.log(ex+" "+ey);
      }
      data.object1.direction = normal(ex, ey);
      console.log(data.object1.direction);
    }

    if(x <= -1 || x >= 1) {
      if(x < 0) {
        addPink();
      } else {
        addBlue();
      }
      data.object1.position = [0,0,0];
      data.object1.direction = [-1 * Math.sign(data.object1.direction[0]), 0];
    }

    redraw();
    gl.finish();
    data.animation.requestId = window.requestAnimationFrame(animate);
}

var animationStart= function(){
    data.animation.lastTime = window.performance.now();
    data.animation.requestId = window.requestAnimationFrame(animate);
}

var animationStop= function(){
    if (data.animation.requestId)
	window.cancelAnimationFrame(data.animation.requestId);
    data.animation.requestId = 0;
    redraw();
}

var callbackOnKeyDown =function (e){
    var code= e.which || e.keyCode;
  //   switch(code)
  //   {
  //   case 38: // up
  //   case 73: // I
  //       data.object1.direction=[0,1];
	// if( data.animation.requestId == 0) animationStart();
	// break;
  //   case 40: // down
  //   case 75: // K
  //       data.object1.direction=[0,-1];
	// if( data.animation.requestId == 0) animationStart();
	// break;
  //   case 37: // left
  //   case 74:// J
  //       data.object1.direction=[-1,0];
	// if( data.animation.requestId == 0) animationStart();
	// break;
  //   case 39:// right
  //   case 76: // L
	// data.object1.direction=[1,0];
	// if( data.animation.requestId == 0) animationStart();
	// break;
  //   case 32: // space
	// if( data.animation.requestId == 0) {
	//     animationStart();
	// } else {
	//     animationStop();
	// }
	// break;
  //   }
  switch(code) {
    case 87: //W
      data.object3.direction=[0,1];
      if(data.animation.requestId == 0) animationStart();
      break;
    case 83: // S
      data.object3.direction=[0,-1];
      if(data.animation.requestId == 0 ) animationStart();
      break;
    case 38: // up
      data.object4.direction=[0,1];
      if(data.animation.requestId == 0 ) animationStart();
      break;
    case 40: // down
      data.object4.direction=[0,-1];
      if(data.animation.requestId == 0 ) animationStart();
      break;
    case 32: //space
      if(data.animation.requestId == 0) {
        animationStart();
      } else {
        animationStop();
      }
      break;
  }
}

window.onload = function() {
  htmlInit();
  glInit(html.canvas);
  dataInit();

  redraw();
  window.onkeydown = callbackOnKeyDown;
}
