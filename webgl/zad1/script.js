var gl; // GL context
var glObjects; // references to various GL objects
var html; // HTML objects
var data; // user data

var htmlInit = function() {
    html = {};
    html.html = document.querySelector('#htmlId');
    html.canvas = document.querySelector('#canvasId');
    html.button1 = document.querySelector('#button1');
    html.span1 = document.querySelector('#span1');
}

/*
    Vertex shader source code
*/
var vertexShaderSrc = "" +
        "attribute vec4 aVertexPosition; \n"+
        "uniform vec3 uMove; \n"+
        "void main( void )\n"+
        "{\n"+
            "gl_PointSize = 16.0; \n"+
            "gl_Position = aVertexPosition + vec4(uMove, 0); \n"+
        "}\n";

/*
    Fragment shader source code
*/
var fragmentShaderSrc = ""+
        "precision mediump float;\n"+
        "uniform vec3 uColorRGB;\n"+
        "void main( void ){\n"+
            "gl_FragColor = vec4(uColorRGB, 1.0);\n"+
        "}\n";

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

    /* create executable program2 */
    glObjects.shaderProgram2 = compileAndLinkShaderProgram(gl, vertexShaderSrc2, fragmentShaderSrc2);
    /* attributes */
    glObjects.aVertexPositionLocation2 = gl.getAttribLocation(glObjects.shaderProgram2, "aVertexPosition");

    //uniform variables
    glObjects.uMoveLocation2 = gl.getUniformLocation(glObjects.shaderProgram2, "uMove");

};

var dataInit=function() {
    data={};
    data.NUMBER_OF_VERTICES=1000;
    data.background = [ 0.0, 0.0, 0.0, 1.0 ];

    var vertices = [
        -0.5, 0.0,
        0.0, 0.0,
        0.0, 0.5,
        -0.5, 0.5
    ];
    //data.vertexPositions1= functionPlot(f1); /*  Float32Array */
    data.vertexPositions1 = new Float32Array(vertices);
    glObjects.bufferId1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, glObjects.bufferId1 );
    gl.bufferData(gl.ARRAY_BUFFER, data.vertexPositions1 , gl.STATIC_DRAW );
    data.move1=[0, 0.0, 0.0];
    data.colorRGB1=[0.0, 0.4, 0.6];

    var squareVertices = [
      0.1, 0.0,
      0.1, 0.5,
      0.6, 0.5,
      0.6, 0.0,
      0.5, -0.2
    ];
    data.vertexPositions2 = new Float32Array(squareVertices);
    glObjects.bufferId2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, glObjects.bufferId2);
    gl.bufferData(gl.ARRAY_BUFFER, data.vertexPositions2, gl.STATIC_DRAW);
    data.move2 = [-0.0, -0.5, 0.0];

    // line-strip
    var lineVertices = [
      0.0, 0.0,
      0.1, 0.3,
      0.1, 0.7
    ];
    data.vertexPositions3 = new Float32Array(lineVertices);
    glObjects.bufferId3 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, glObjects.bufferId3);
    gl.bufferData(gl.ARRAY_BUFFER, data.vertexPositions3, gl.STATIC_DRAW);
    data.move3 = [0.0, 0.0, 0.0];

    //line-loop
    var lineloopVertices = [
      -0.5, -0.5,
      -0.5, -0.8,
      0.0, -0.8,
      0.0, -0.5
    ];
    data.vertexPositions4 = new Float32Array(lineloopVertices);
    glObjects.bufferId4 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, glObjects.bufferId4);
    gl.bufferData(gl.ARRAY_BUFFER, data.vertexPositions4, gl.STATIC_DRAW);

    //traingle strip
    var trianglestripVertices = [
      0.2, 0.5,
      0.3, 0.55,
      0.4, 0.5,
      0.5, 0.8
    ];
    data.vertexPositions5 = new Float32Array(trianglestripVertices);
    glObjects.bufferId5 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, glObjects.bufferId5);
    gl.bufferData(gl.ARRAY_BUFFER, data.vertexPositions5, gl.STATIC_DRAW);

    var linesVertices = [
      -0.9, -0.9,
      -0.8, -0.7,
      -0.9, -0.7
    ];
    data.vertexPositions6 = new Float32Array(linesVertices);
    glObjects.bufferId6 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, glObjects.bufferId6);
    gl.bufferData(gl.ARRAY_BUFFER, data.vertexPositions6, gl.STATIC_DRAW);

};


var f1= function( x ) {
    return Math.sin(x*Math.PI);
};

var f2= function( x ) {
    return Math.cos(x*Math.PI);
};

/* create Float32Array with vertex (x,y) coordinates */
var functionPlot= function( f ){
    var stepX= 2.0/data.NUMBER_OF_VERTICES;
    var x=-1.0;
    var vArray=[];
    var i;
    for(i=0; i<data.NUMBER_OF_VERTICES; i++){
    y=f(x);
    vArray.push(x);
    vArray.push(y);
    x+= stepX;
    }
    return new Float32Array( vArray );
}


var redraw = function() {
    var bg = data.background;

    /* prepare clean screen */
    gl.clearColor(bg[0], bg[1], bg[2], bg[3]);
    gl.clear( gl.COLOR_BUFFER_BIT  |  gl.DEPTH_BUFFER_BIT );

    gl.useProgram( glObjects.shaderProgram );
    gl.enableVertexAttribArray(glObjects.aVertexPositionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, glObjects.bufferId1 ); /* refer to the buffer */
    gl.vertexAttribPointer(glObjects.aVertexPositionLocation, 2 /* 2 floats per vertex */, gl.FLOAT, false, 0 /* stride */, 0 /*offset */);
    gl.uniform3fv( glObjects.uMoveLocation, data.move1 );
    gl.uniform3fv( glObjects.uColorRGBLocation, data.colorRGB1 );
    gl.drawArrays(gl.POINTS, 0 /* offset */, data.vertexPositions1.length/2);

    //drawing sec object with program2
    gl.useProgram(glObjects.shaderProgram2);
    gl.enableVertexAttribArray(glObjects.aVertexPositionLocation2);
    gl.bindBuffer(gl.ARRAY_BUFFER, glObjects.bufferId2);
    gl.vertexAttribPointer(
      glObjects.aVertexPositionLocation2,
      2 /* 2 floats per vertex */,
      gl.FLOAT,
      false,
      0  /* stride */,
      0  /*offset */);
    gl.uniform3fv(glObjects.uMoveLocation2, data.move2);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 5);

    //drawing line-
    gl.enableVertexAttribArray(glObjects.aVertexPositionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, glObjects.bufferId3);
    gl.vertexAttribPointer(
      glObjects.aVertexPositionLocation,
      2 /* 2 floats per vertex */,
      gl.FLOAT,
      false,
      0  /* stride */,
      0  /*offset */
    );
    gl.uniform3fv(glObjects.uMoveLocation2, data.move3);
    gl.drawArrays(gl.LINE_STRIP, 0, 3);

    //lineloop
    gl.bindBuffer(gl.ARRAY_BUFFER, glObjects.bufferId4);
    gl.vertexAttribPointer(
      glObjects.aVertexPositionLocation,
      2 /* 2 floats per vertex */,
      gl.FLOAT,
      false,
      0  /* stride */,
      0  /*offset */
    );
    gl.drawArrays(gl.LINE_LOOP, 0, 4);

    //traingle LINE_STRIP
    gl.bindBuffer(gl.ARRAY_BUFFER, glObjects.bufferId5);
    gl.vertexAttribPointer(
      glObjects.aVertexPositionLocation,
      2 /* 2 floats per vertex */,
      gl.FLOAT,
      false,
      0  /* stride */,
      0  /*offset */
    );
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    //lines
    gl.bindBuffer(gl.ARRAY_BUFFER, glObjects.bufferId6);
    gl.vertexAttribPointer(
      glObjects.aVertexPositionLocation,
      2 /* 2 floats per vertex */,
      gl.FLOAT,
      false,
      0  /* stride */,
      0  /*offset */
    );
    gl.drawArrays(gl.LINES, 0, 3);
};

window.onload= function(){
    htmlInit();
    glInit( html.canvas );
    dataInit();
    redraw();
    console.log('Program1');
    const numAttribs = gl.getProgramParameter(glObjects.shaderProgram, gl.ACTIVE_ATTRIBUTES);
    for (let i = 0; i < numAttribs; ++i) {
      const info = gl.getActiveAttrib(glObjects.shaderProgram, i);
      console.log('name:', info.name, 'type:', info.type, 'size:', info.size);
    }

    const numAttribs2 = gl.getProgramParameter(glObjects.shaderProgram, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < numAttribs2; ++i) {
      const info = gl.getActiveUniform(glObjects.shaderProgram, i);
      console.log('name:', info.name, 'type:', info.type, 'size:', info.size);
    }

    console.log('Program 2');
    const numAttribs3 = gl.getProgramParameter(glObjects.shaderProgram2, gl.ACTIVE_ATTRIBUTES);
    for (let i = 0; i < numAttribs3; ++i) {
      const info = gl.getActiveAttrib(glObjects.shaderProgram2, i);
      console.log('name:', info.name, 'type:', info.type, 'size:', info.size);
    }

    const numAttribs4 = gl.getProgramParameter(glObjects.shaderProgram2, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < numAttribs4; ++i) {
      const info = gl.getActiveUniform(glObjects.shaderProgram2, i);
      console.log('name:', info.name, 'type:', info.type, 'size:', info.size);
    }

};
