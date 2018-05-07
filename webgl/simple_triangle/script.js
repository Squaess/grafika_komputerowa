var vertexShaderText =
[
  'precision mediump float;',
  '',
  'attribute vec3 vertColor;',
  'attribute vec2 vertPosition;',
  'varying vec3 fragColor;',
  '',
  'void main()',
  '{',
  '   fragColor = vertColor;',
  '   gl_Position = vec4(vertPosition, 0.0, 1.0);',
  '}'
].join('\n');

var fragmentShaderText =
[
  'precision mediump float;',
  '',
  'varying vec3 fragColor;',
  'void main()',
  '{',
  '   gl_FragColor = vec4(fragColor, 1.0);',
  '}'
].join('\n');

var gl; // A global variable for the WebGL context

function start() {

  var canvas = document.getElementById("canvasId");

  gl = canvas.getContext("webgl");      // Initialize the GL context

  // Only continue if WebGL is available and working
  if (!gl) {
    console.log('webgl not supported trying exeprimental-webgl');
    gl = canvas.getContext('experimental-webgl');
  }

  if(!gl) {
    alert('Your browser does not support WebGL');
    return;
  }

  gl.clearColor(0.75, 0.85, 0.8, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  //
  //  Creating and seeting up shaders and programs
  //
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, vertexShaderText);
  gl.shaderSource(fragmentShader, fragmentShaderText);

  gl.compileShader(vertexShader);
  if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
    return;
  }

  gl.compileShader(fragmentShader);
  if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(fragmentShader));
    return;
  }

  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('ERROR linking program', gl.getProgramInfoLog(program));
    return;
  }
  gl.validateProgram(program);
  if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error('ERROR linking program', gl.getProgramInfoLog(program));
    return;
  }

  //
  // Create buffer
  //

  var trianglevertices = [
    0.0, 0.5,       0.0,1.0,0.0,
    -0.5, -0.5,     1.0,0.0,0.0,
    0.5, -0.5,       0.0,0.0,1.0
  ];

  var triangleVertexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(trianglevertices), gl.STATIC_DRAW);

  var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
  console.log(positionAttribLocation + "  LOOOL");
  var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
  console.log(colorAttribLocation + " BLEHHH");
  gl.vertexAttribPointer(
    positionAttribLocation,
    2,
    gl.FLOAT,
    gl.FALSE,
    5 * Float32Array.BYTES_PER_ELEMENT,
    0
  );

  gl.vertexAttribPointer(
    colorAttribLocation,
    3,
    gl.FLOAT,
    gl.FALSE,
    5 * Float32Array.BYTES_PER_ELEMENT,
    2 * Float32Array.BYTES_PER_ELEMENT,
  );

  gl.enableVertexAttribArray(positionAttribLocation);
  gl.enableVertexAttribArray(colorAttribLocation);

  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  const numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
  for (let i = 0; i < numAttribs; ++i) {
      const info = gl.getActiveAttrib(program, i);
      console.log('name:', info.name, 'type:', info.type, 'size:', info.size);
  }
}

var html;

var htmlInit = function() {
    html = {};
    html.html  = document.querySelector('#htmlId');
    html.canvas = document.querySelector('#canvasId');
    html.divMessages = document.querySelector('#divMessages');
}

window.onload= function(){
    htmlInit();
    gl = html.canvas.getContext("experimental-webgl");
    html.divMessages.innerHTML="<h3>Parameter values:</h3>\n";
    html.divMessages.innerHTML+="<ul>\n";
    html.divMessages.innerHTML+="<li>"+"MAX_VIEWPORT_DIMS"+" = "+JSON.stringify(gl.getParameter(gl.MAX_VIEWPORT_DIMS))+"</li>\n";

/* … */
   html.divMessages.innerHTML+="</ul>\n";
};
