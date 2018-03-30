"use strict";
var Window = /** @class */ (function () {
    function Window() {
    }
    Window.computeXSize = function (minX, maxX) {
        Window.sizeX = Math.abs(Window.maxX - Window.minX);
    };
    Window.computeYSize = function (minY, maxY) {
        Window.sizeY = Math.abs(Window.maxY - Window.minY);
    };
    Window.minX = 0;
    Window.maxX = 500;
    Window.minY = 0;
    Window.maxY = 500;
    Window.sizeX = Window.maxX - Window.minX;
    Window.sizeY = Window.maxY - Window.minY;
    return Window;
}());

var Turtle = /** @class */ (function () {
    function Turtle(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
    }
    return Turtle;
}());
var TASK;
(function (TASK) {
    TASK["LEFT"] = "left";
    TASK["RIGHT"] = "right";
    TASK["FORWARD"] = "forward";
    TASK["REPEAT"] = "repeat";
    TASK["BIGGER"] = "bigger";
    TASK["SMALLER"] = "smaller";
    TASK["CLEAR"] = "clear";
})(TASK || (TASK = {}));
function doTaskBigger() {
    var canvas = document.getElementById("canvas");
    Window.computeXSize(Window.minX + 10, Window.maxX + 10);
    Window.computeYSize(Window.minY + 10, Window.maxY + 10);
    console.log(Window.sizeX);
    canvas.width = Window.sizeX;
    canvas.height = Window.sizeY;
}
function doTask() {
    var task = document.getElementById("task").value.toLocaleLowerCase();
    document.getElementById("chosenTask").innerHTML = task;
    switch (task) {
        case TASK.LEFT: {
            console.log("left");
            break;
        }
        case TASK.RIGHT: {
            console.log("RIGHT");
            break;
        }
        case TASK.FORWARD: {
            console.log("FORWARD");
            break;
        }
        case TASK.REPEAT: {
            console.log("REPEAT");
            break;
        }
        case TASK.CLEAR: {
            console.log("CLEAR");
            break;
        }
        case TASK.BIGGER: {
            console.log("BIGGER");
            doTaskBigger();
            break;
        }
        case TASK.SMALLER: {
            console.log("SMALLER");
            break;
        }
        default: {
            console.log("Invalid choice");
            break;
        }
    }
}
