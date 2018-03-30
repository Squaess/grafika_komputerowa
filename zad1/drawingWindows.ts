//repeat 3 forward 100 left 120
//repeat 4 forward 50 left 90
//repeat 6 forward 50 left 40
//repeat 18 forward 50 left 20

enum TASK {
    LEFT = "left",
    RIGHT = "right",
    FORWARD = "forward",
    REPEAT = "repeat",
    BIGGER = "bigger",
    SMALLER = "smaller",
    CLEAR = "clear",
    MOVETO = "moveto",
    DRAW = "draw"
}


class WindowCanvas {
    get sizeX(): number {
        return this._sizeX;
    }

    get sizeY(): number {
        return this._sizeY;
    }

    get maxY(): number {
        return this._maxY;
    }

    set maxY(value: number) {
        this._maxY = value;
        this.computeYSize()
    }

    get maxX(): number {
        return this._maxX;
    }

    set maxX(value: number) {
        this._maxX = value;
        this.computeXSize()
    }

    private _minX: number;
    private _maxX: number;
    private _minY: number;
    private _maxY: number;
    private _sizeX: number;
    private _sizeY: number;

    constructor() {
        this._minX = 0;
        this._maxX = 500;
        this._minY = 0;
        this._maxY = 500;
        this._sizeX = Math.abs(this._maxX - this._minX);
        this._sizeY = Math.abs(this._maxY - this._minY);
    }

    computeXSize() {
        console.log(this._sizeX + "size")
        this._sizeX = Math.abs(this._maxX - this._minX);
    }

    computeYSize() {
        this._sizeY = Math.abs(this._maxY - this._minY);
    }

    doWindowBigger() {
        let canvas = (<HTMLCanvasElement>document.getElementById("canvas"));
        windowCanvas.maxX = windowCanvas.maxX + 10;
        windowCanvas.maxY = windowCanvas.maxY + 10;

        console.log(windowCanvas.sizeX + "sizeY");
        canvas.width = windowCanvas.sizeX;
        canvas.height = windowCanvas.sizeY;
    }

    doWindowSmaller() {
        let canvas = (<HTMLCanvasElement>document.getElementById("canvas"));
        windowCanvas.maxX = windowCanvas.maxX - 10;
        windowCanvas.maxY = windowCanvas.maxY - 10;

        console.log(windowCanvas.sizeX + "sizeY");
        canvas.width = windowCanvas.sizeX;
        canvas.height = windowCanvas.sizeY;
    }

    drawLine(startX: number, startY: number, endX: number, endY: number, color: string) {
        let c = <HTMLCanvasElement> document.getElementById("canvas");
        let ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(startX, Math.abs(startY - this.sizeY));
        ctx.lineTo(endX, Math.abs(endY - this.sizeY));
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
    }

    clear() {
        let canvas = (<HTMLCanvasElement>document.getElementById("canvas"));
        canvas.height = windowCanvas.sizeY;
    }

}

class Turtle {
    get color(): string {
        return this._color;
    }

    private _yPos: number;
    private _xPos: number;
    private _directions: number;
    private _color: string;

    constructor() {
        this._xPos = 1;
        this._yPos = 1;
        this._directions = 0;
        this._color = "#000000"
    }

    turnLeft(arg: number) {
        this._directions += arg;
        if (this._directions >= 360) this._directions -= 360;
    }

    turnRight(arg: number) {
        this._directions -= arg;
        if (this._directions < 0) this._directions += 360;
    }

    moveForward(length: number) {
        let endX = this._xPos + length * Math.sin(this._directions * Math.PI / 180);
        let endY = this._yPos + length * Math.cos(this._directions * Math.PI / 180);
        windowCanvas.drawLine(this._xPos, this._yPos, endX, endY, this.color);
        this._xPos = endX;
        this._yPos = endY;
    }

    draw(endX: number, endY: number){
        windowCanvas.drawLine(this._xPos, this._yPos, endX, endY, this.color);
        this._xPos = endX;
        this._yPos = endY;
    }

    get xPos(): number {
        return this._xPos;
    }

    set xPos(value: number) {
        this._xPos = value;
    }

    get yPos(): number {
        return this._yPos;
    }

    set yPos(value: number) {
        this._yPos = value;
    }

    get directions(): number {
        return this._directions;
    }

    set color(value: string) {
        this._color = value;
    }

    moveTo(number: number, number2: number) {
        this._xPos = number;
        this._yPos = number2;
    }
}


const windowCanvas: WindowCanvas = new WindowCanvas();
const turtle: Turtle = new Turtle();
const additionalInfo = {info: ""};

function doTask() {

    let task = (<HTMLInputElement>document.getElementById("task")).value.toLocaleLowerCase();

    if(task[0].charAt(0) === '#') {
        console.log(task);
        turtle.color = task
    }else {
        let commands = task.split(" ");
        commands[0] === TASK.REPEAT ? doLoop(commands) : doTurtleMovement(commands);

    }

    document.getElementById("chosenTask").innerHTML =
        "direction: " + turtle.directions + "\nX position " + turtle.xPos +
        "\nY position " + turtle.yPos + "\n" + " color " + turtle.color+" " + additionalInfo.info;
    additionalInfo.info = "";



}

function doLoop(commands: string[]) {
    if (commands.length % 2 === 0) {
        for (let i = 0; i < parseInt(commands[1]); i++) {
            for (let j = 2; j < commands.length; j += 2)
                doTurtleMovement([commands[j], commands[j + 1]])
        }
    } else {
        additionalInfo.info = "bad number of arguments"
    }
}

function doTurtleMovement(commands: string[]) {
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


