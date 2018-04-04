var svgns = "http://www.w3.org/2000/svg";
var svg = document.getElementsByTagName('svg')[0];

var drawLine = function(x1, y1, x2, y2, svg) {
  var shape = svgDocument.createElementNS(svgns, "line");
  shape.setAttributeNS(null, "x1", x1);
  shape.setAttributeNS(null, "y1", y1);
  shape.setAttributeNS(null, "x2",  x2);
  shape.setAttributeNS(null, "y2",  y2);
  shape.setAttributeNS(null, "stroke", "black");
  svg.appendChild(shape);
}

function makeShape(evt) {

    var svg = document.getElementsByTagName('svg')[0];

    if ( window.svgDocument == null )
        svgDocument = evt.target.ownerDocument;

    drawKochCurve(20.0, 200.0, 400.0, 200.0, svg, 3, Math.PI/3);
}

var drawKochCurve = function(x1, y1, x2, y2, svg, degree, alfa) {
  if ( degree === 0 ){
    drawLine(x1, y1, x2, y2, svg);
  } else {
    var xa = x1 + 1/3 * (x2 - x1),
        ya = y1 + 1/3 * (y2 - y1),

        xb = x1 + 2/3 * (x2 - x1),
        yb = y1 + 2/3 * (y2 - y1),

        xc = xa + (xb - xa) * Math.cos(-alfa) - (yb - ya) * Math.sin(-alfa),
        yc = ya + (yb - ya) * Math.cos(-alfa) + (xb - xa) * Math.sin(-alfa);


      drawKochCurve(x1,y1, xa,ya, svg, degree-1, alfa);
      drawKochCurve(xa,ya, xc,yc, svg,degree-1, alfa);
      drawKochCurve(xc,yc, xb,yb, svg,degree-1, alfa);
      drawKochCurve(xb,yb, x2,y2,  svg,degree-1, alfa);
  }
}
