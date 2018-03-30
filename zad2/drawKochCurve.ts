//repeat 3 forward 100 left 120
//repeat 4 forward 50 left 90
//repeat 6 forward 50 left 40
//repeat 18 forward 50 left 20

class WindowCanvasKoch {


    private x0:number;
    private y0:number;
    private w2:number;
    private h2:number;
    private x1:number;
    private y1:number;
    private direction360: number;
    private _deg:number;
    private c: HTMLCanvasElement;
    private ctx;
    public points : string[] = [];

    constructor() {
        this.x0= 0;
        this.y0= 0;
        this.w2= 500;
        this.h2= 500;
        this.x1= 0;
        this.y1= 0;
        this.direction360= 0;
        this._deg=0;

    }

    init(width, height) {
        this.c = <HTMLCanvasElement> document.getElementById("canvas");
        this.ctx = this.c.getContext("2d");
        this.ctx.beginPath();
        this.x0 = this.w2 = width / 2;
        this.y0 = this.h2 = height / 2;
    }

    begin(x,y) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x0=x, this.y0=y);
    }

    end() {
        this.ctx.closePath();
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.strokeStyle = "blue";
        this.ctx.lineWidth="1px";
        this.ctx.stroke();
    }

    from360(angle360) {
        return Math.PI * angle360 / 180;
    }


    forward(length) {
        this.x1 = this.x0 + length * Math.cos(this.from360(this.direction360));
        this.y1 = this.y0 + length * Math.sin(this.from360(this.direction360));
        this.points.push("draw " + Math.floor(this.x0)+" "+Math.floor(Math.abs(500-this.y0)+1));
        this.x0=this.x1;
        this.y0=this.y1
        // doTurtleMovement()

        // this.ctx.lineTo(this.x0=this.x1,this.y0=this.y1);
    }

    right(angle360) {
        this.direction360 -= angle360;
    }

    left(angle360) {
        this.direction360 += angle360;
    }


    koch(length, depth) {
        if (depth === 0) {
            this.forward(length);
        } else {
            this.koch(length / 3, depth - 1);
            this.right(60);
            this.koch(length / 3, depth - 1);
            this.left(120);
            this.koch(length / 3, depth - 1);
            this.right(60);
            this.koch(length / 3, depth - 1);
        }
    }

    set deg(value) {
        this._deg = value;
    }


    clear() {
        let canvas = (<HTMLCanvasElement>document.getElementById("canvas"));
        canvas.height = 500;
    }
}



const windowCanvasKoch: WindowCanvasKoch = new WindowCanvasKoch();


function doTask() {

    let task = (<HTMLInputElement>document.getElementById("task")).value.toLocaleLowerCase();

    let w = 1500;
    let r = parseInt(task);

    if (w==0 || r==0) return;
    windowCanvasKoch.points=[];
    windowCanvasKoch.init(w,w/3);
    windowCanvasKoch.begin(0,500);
    windowCanvasKoch.koch(w,r);
    windowCanvasKoch.end();
    let text='';
    for(let i=0;i<windowCanvasKoch.points.length;i++){
        console.log(windowCanvasKoch.points[i]);
        doTask2(windowCanvasKoch.points[i])
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

function doTask2(task:string) {

    // let task = (<HTMLInputElement>document.getElementById("task")).value.toLocaleLowerCase();

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
        case TASK.DRAW: {
            console.log("DRAW")
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


