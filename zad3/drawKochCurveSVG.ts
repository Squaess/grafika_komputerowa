//repeat 3 forward 100 left 120
//repeat 4 forward 50 left 90
//repeat 6 forward 50 left 40
//repeat 18 forward 50 left 20

class WindowCanvasKochSVG {


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
    public points : string='';

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
        this.points += (Math.floor(this.x0)+", "+Math.floor(this.y0)+" ");
        this.x0=this.x1;
        this.y0=this.y1;
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



const windowCanvasKoch2: WindowCanvasKochSVG = new WindowCanvasKochSVG();


function doTask() {

    let task = (<HTMLInputElement>document.getElementById("task")).value.toLocaleLowerCase();

    // for(let j =1;j<9;j++){
    //     document.getElementById("polygons"+j).style.display="none"
    //     // console.log((document.getElementById("polygons"+i).style.display))
    // }
    //
    // for(let i =1;i<9;i++){
    //
    //     if(parseInt(task)===i)
    //         document.getElementById("polygons"+i).style.display=""
    //
    // }

    let w = 1500;
    let r = parseInt(task);

    if (w==0 || r==0) return;

    windowCanvasKoch2.init(w,w/3);
    windowCanvasKoch2.begin(0,500);
    windowCanvasKoch2.koch(w,r);
    windowCanvasKoch2.end();
    console.log(windowCanvasKoch2.points);
    // document.querySelector(".koch").innerHTML=windowCanvasKoch2.points;
    document.getElementById("koch").innerHTML = "<polygon points=\""+windowCanvasKoch2.points +"\" style=\"fill:lime;stroke:purple;stroke-width:2;fill-rule:nonzero;\"></polygon>";



    windowCanvasKoch2.points = ""

        // <polygon points="" style="fill:lime;stroke:purple;stroke-width:2;fill-rule:nonzero;"></polygon>
    // let textPoints='';
    // for(let i=0; i<windowCanvasKoch2.points.length; i++){
    //     textPoints+= windowCanvasKoch2.points[i] +" "
    // }
    // console.log(textPoints);
    // document.getElementById("points2").innerHTML = windowCanvasKoch2.points;
    //
    // console.log(document.getElementById("polygons"));
    // document.getElementById("polygons").textContent = "abCCCCCCCCCCCCCCCCC"

    // <polygon
    //     points="0, 50 16, 50 25, 35 33, 50 50, 50 58, 35 50, 21 66, 21 75, 6 83, 21 100, 21 91, 35 100, 50 116, 50 125, 35 133, 50"
    // style="fill:lime;stroke:purple;stroke-width:2;fill-rule:nonzero;"></polygon>

}

function clean() {

    windowCanvasKoch2.clear();
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
