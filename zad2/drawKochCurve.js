//repeat 3 forward 100 left 120
//repeat 4 forward 50 left 90
//repeat 6 forward 50 left 40
//repeat 18 forward 50 left 20
var WindowCanvasKoch = /** @class */ (function () {
    function WindowCanvasKoch() {
        this.points = [];
        this.x0 = 0;
        this.y0 = 0;
        this.w2 = 500;
        this.h2 = 500;
        this.x1 = 0;
        this.y1 = 0;
        this.direction360 = 0;
        this._deg = 0;
    }
    WindowCanvasKoch.prototype.init = function (width, height) {
        this.c = document.getElementById("canvas");
        this.ctx = this.c.getContext("2d");
        this.ctx.beginPath();
        this.x0 = this.w2 = width / 2;
        this.y0 = this.h2 = height / 2;
    };
    WindowCanvasKoch.prototype.begin = function (x, y) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x0 = x, this.y0 = y);
    };
    WindowCanvasKoch.prototype.end = function () {
        this.ctx.closePath();
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.strokeStyle = "blue";
        this.ctx.lineWidth = "1px";
        this.ctx.stroke();
    };
    WindowCanvasKoch.prototype.from360 = function (angle360) {
        return Math.PI * angle360 / 180;
    };
    WindowCanvasKoch.prototype.forward = function (length) {
        this.x1 = this.x0 + length * Math.cos(this.from360(this.direction360));
        this.y1 = this.y0 + length * Math.sin(this.from360(this.direction360));
        this.points.push("draw " + Math.floor(this.x0) + " " + Math.floor(Math.abs(500 - this.y0) + 1));
        this.x0 = this.x1;
        this.y0 = this.y1;
        // doTurtleMovement()
        // this.ctx.lineTo(this.x0=this.x1,this.y0=this.y1);
    };
    WindowCanvasKoch.prototype.right = function (angle360) {
        this.direction360 -= angle360;
    };
    WindowCanvasKoch.prototype.left = function (angle360) {
        this.direction360 += angle360;
    };
    WindowCanvasKoch.prototype.koch = function (length, depth) {
        if (depth === 0) {
            this.forward(length);
        }
        else {
            this.koch(length / 3, depth - 1);
            this.right(60);
            this.koch(length / 3, depth - 1);
            this.left(120);
            this.koch(length / 3, depth - 1);
            this.right(60);
            this.koch(length / 3, depth - 1);
        }
    };
    Object.defineProperty(WindowCanvasKoch.prototype, "deg", {
        set: function (value) {
            this._deg = value;
        },
        enumerable: true,
        configurable: true
    });
    WindowCanvasKoch.prototype.clear = function () {
        var canvas = document.getElementById("canvas");
        canvas.height = 500;
    };
    return WindowCanvasKoch;
}());
var windowCanvasKoch = new WindowCanvasKoch();
function doTask() {
    var task = document.getElementById("task").value.toLocaleLowerCase();
    var w = 1500;
    var r = parseInt(task);
    if (w == 0 || r == 0)
        return;
    windowCanvasKoch.points = [];
    windowCanvasKoch.init(w, w / 3);
    windowCanvasKoch.begin(0, 500);
    windowCanvasKoch.koch(w, r);
    windowCanvasKoch.end();
    var text = '';
    for (var i = 0; i < windowCanvasKoch.points.length; i++) {
        console.log(windowCanvasKoch.points[i]);
        doTask2(windowCanvasKoch.points[i]);
        // console.log(windowCanvasKoch.points[i]+" "+windowCanvasKoch.points[i+1]+" "+windowCanvasKoch.points[i+2])
    }
    document.getElementById("points").innerHTML = text;
}
function clean() {
    windowCanvasKoch.clear();
}
// ?????????????????????????????????????????????????????????????????
//repeat 3 forward 100 left 120
//repeat 4 forward 50 left 90
//repeat 6 forward 50 left 40
//repeat 18 forward 50 left 20
var TASK;
(function (TASK) {
    TASK["LEFT"] = "left";
    TASK["RIGHT"] = "right";
    TASK["FORWARD"] = "forward";
    TASK["REPEAT"] = "repeat";
    TASK["BIGGER"] = "bigger";
    TASK["SMALLER"] = "smaller";
    TASK["CLEAR"] = "clear";
    TASK["MOVETO"] = "moveto";
    TASK["DRAW"] = "draw";
})(TASK || (TASK = {}));
var WindowCanvas = /** @class */ (function () {
    function WindowCanvas() {
        this._minX = 0;
        this._maxX = 500;
        this._minY = 0;
        this._maxY = 500;
        this._sizeX = Math.abs(this._maxX - this._minX);
        this._sizeY = Math.abs(this._maxY - this._minY);
    }
    Object.defineProperty(WindowCanvas.prototype, "sizeX", {
        get: function () {
            return this._sizeX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowCanvas.prototype, "sizeY", {
        get: function () {
            return this._sizeY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowCanvas.prototype, "maxY", {
        get: function () {
            return this._maxY;
        },
        set: function (value) {
            this._maxY = value;
            this.computeYSize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowCanvas.prototype, "maxX", {
        get: function () {
            return this._maxX;
        },
        set: function (value) {
            this._maxX = value;
            this.computeXSize();
        },
        enumerable: true,
        configurable: true
    });
    WindowCanvas.prototype.computeXSize = function () {
        console.log(this._sizeX + "size");
        this._sizeX = Math.abs(this._maxX - this._minX);
    };
    WindowCanvas.prototype.computeYSize = function () {
        this._sizeY = Math.abs(this._maxY - this._minY);
    };
    WindowCanvas.prototype.doWindowBigger = function () {
        var canvas = document.getElementById("canvas");
        windowCanvas.maxX = windowCanvas.maxX + 10;
        windowCanvas.maxY = windowCanvas.maxY + 10;
        console.log(windowCanvas.sizeX + "sizeY");
        canvas.width = windowCanvas.sizeX;
        canvas.height = windowCanvas.sizeY;
    };
    WindowCanvas.prototype.doWindowSmaller = function () {
        var canvas = document.getElementById("canvas");
        windowCanvas.maxX = windowCanvas.maxX - 10;
        windowCanvas.maxY = windowCanvas.maxY - 10;
        console.log(windowCanvas.sizeX + "sizeY");
        canvas.width = windowCanvas.sizeX;
        canvas.height = windowCanvas.sizeY;
    };
    WindowCanvas.prototype.drawLine = function (startX, startY, endX, endY, color) {
        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(startX, Math.abs(startY - this.sizeY));
        ctx.lineTo(endX, Math.abs(endY - this.sizeY));
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
    };
    WindowCanvas.prototype.clear = function () {
        var canvas = document.getElementById("canvas");
        canvas.height = windowCanvas.sizeY;
    };
    return WindowCanvas;
}());
var Turtle = /** @class */ (function () {
    function Turtle() {
        this._xPos = 1;
        this._yPos = 1;
        this._directions = 0;
        this._color = "#000000";
    }
    Object.defineProperty(Turtle.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    Turtle.prototype.turnLeft = function (arg) {
        this._directions += arg;
        if (this._directions >= 360)
            this._directions -= 360;
    };
    Turtle.prototype.turnRight = function (arg) {
        this._directions -= arg;
        if (this._directions < 0)
            this._directions += 360;
    };
    Turtle.prototype.moveForward = function (length) {
        var endX = this._xPos + length * Math.sin(this._directions * Math.PI / 180);
        var endY = this._yPos + length * Math.cos(this._directions * Math.PI / 180);
        windowCanvas.drawLine(this._xPos, this._yPos, endX, endY, this.color);
        this._xPos = endX;
        this._yPos = endY;
    };
    Turtle.prototype.draw = function (endX, endY) {
        windowCanvas.drawLine(this._xPos, this._yPos, endX, endY, this.color);
        this._xPos = endX;
        this._yPos = endY;
    };
    Object.defineProperty(Turtle.prototype, "xPos", {
        get: function () {
            return this._xPos;
        },
        set: function (value) {
            this._xPos = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Turtle.prototype, "yPos", {
        get: function () {
            return this._yPos;
        },
        set: function (value) {
            this._yPos = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Turtle.prototype, "directions", {
        get: function () {
            return this._directions;
        },
        enumerable: true,
        configurable: true
    });
    Turtle.prototype.moveTo = function (number, number2) {
        this._xPos = number;
        this._yPos = number2;
    };
    return Turtle;
}());
var windowCanvas = new WindowCanvas();
var turtle = new Turtle();
var additionalInfo = { info: "" };
function doTask2(task) {
    // let task = (<HTMLInputElement>document.getElementById("task")).value.toLocaleLowerCase();
    if (task[0].charAt(0) === '#') {
        console.log(task);
        turtle.color = task;
    }
    else {
        var commands = task.split(" ");
        commands[0] === TASK.REPEAT ? doLoop(commands) : doTurtleMovement(commands);
    }
    document.getElementById("chosenTask").innerHTML =
        "direction: " + turtle.directions + "\nX position " + turtle.xPos +
            "\nY position " + turtle.yPos + "\n" + " color " + turtle.color + " " + additionalInfo.info;
    additionalInfo.info = "";
}
function doLoop(commands) {
    if (commands.length % 2 === 0) {
        for (var i = 0; i < parseInt(commands[1]); i++) {
            for (var j = 2; j < commands.length; j += 2)
                doTurtleMovement([commands[j], commands[j + 1]]);
        }
    }
    else {
        additionalInfo.info = "bad number of arguments";
    }
}
function doTurtleMovement(commands) {
    switch (commands[0]) {
        case TASK.LEFT: {
            console.log("LEFT");
            turtle.turnRight(parseInt(commands[1])); //male oszustwo
            break;
        }
        case TASK.RIGHT: {
            console.log("RIGHT");
            turtle.turnLeft(parseInt(commands[1])); //male oszustwo
            break;
        }
        case TASK.FORWARD: {
            console.log("FORWARD");
            turtle.moveForward(parseInt(commands[1]));
            break;
        }
        case TASK.MOVETO: {
            console.log("MOVETO");
            turtle.moveTo(parseInt(commands[1]), parseInt(commands[2]));
            break;
        }
        case TASK.CLEAR: {
            console.log("CLEAR");
            windowCanvas.clear();
            break;
        }
        case TASK.BIGGER: {
            console.log("BIGGER");
            windowCanvas.doWindowBigger();
            break;
        }
        case TASK.SMALLER: {
            console.log("SMALLER");
            windowCanvas.doWindowSmaller();
            break;
        }
        case TASK.DRAW: {
            console.log("DRAW");
            turtle.draw(parseInt(commands[1]), parseInt(commands[2]));
            break;
        }
        default: {
            console.log("Invalid choice");
            additionalInfo.info = "Invalid choice";
            break;
        }
    }
}
