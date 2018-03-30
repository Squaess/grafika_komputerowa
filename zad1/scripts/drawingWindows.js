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
function doTask() {
    var task = document.getElementById("task").value.toLocaleLowerCase();
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
        // case TASK.DRAW: {
        //     console.log("DRAW")
        //     turtle.draw(parseInt(commands[1]), parseInt(commands[2]));
        //     break;
        // }
        default: {
            console.log("Invalid choice");
            additionalInfo.info = "Invalid choice";
            break;
        }
    }
}
//# sourceMappingURL=drawingWindows.js.map