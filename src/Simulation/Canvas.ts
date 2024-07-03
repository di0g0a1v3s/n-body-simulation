import { Circle } from "../Geometry/Shapes";
import { Point } from "../Geometry/Vector";


export interface Canvas {
    clear(): void;
    readonly width: number;
    readonly height: number;
    drawCircle(circle: Circle): void
    onScroll(callback: (stagePoint: Point, deltaY: number, deltaX: number) => void): void
}

class CanvasImpl implements Canvas {
    // singleton class
    private static instance: CanvasImpl;
    private htmlCanvas: HTMLCanvasElement;
    private onScrollCallbacks: ((stagePoint: Point, deltaY: number, deltaX: number) => void)[];

    public static get Instance() {
        if(this.instance == null) {
            this.instance = new this();
        }
        return this.instance;
    }

    
    private constructor() {
        const canvas = document.getElementById("main-canvas")
        if(canvas == null) {
            this.htmlCanvas = document.createElement('canvas');
            this.htmlCanvas.id = "main-canvas";
            document.body.appendChild(this.htmlCanvas);
        } else {
            this.htmlCanvas = <HTMLCanvasElement>canvas;
        }
        this.htmlCanvas.width = window.innerWidth;
        this.htmlCanvas.height = window.innerHeight;
        this.clear();
        this.onScrollCallbacks = [];
        this.htmlCanvas.addEventListener("wheel", evt => {
            console.log("qqq wheel")
            const rect = this.htmlCanvas.getBoundingClientRect();
            const x = evt.clientX - rect.left
            const y = evt.clientY - rect.top
            const evtPointInCanvas = { x, y };
            this.onScrollCallbacks.forEach(cb => {
                cb(evtPointInCanvas, evt.deltaY, evt.deltaX);
            })
            // if(this.currentCameraBounds != null) {
            //     const evtPositionRelativeToCanvas = this.absoluteToRelativePosition(evtPointInCanvas, this.canvasBounds);
            //     const evtPositionInCamera = this.relativeToAbsolutePosition(evtPositionRelativeToCanvas, this.currentCameraBounds);
            //     this.currentCameraBounds = Transform2d.scaleAroundPoint(1+evt.deltaY/1000, evtPositionInCamera)
            //         .transformRectangle(this.currentCameraBounds);
            // }
        })
        window.addEventListener("resize", () => {
            this.htmlCanvas.width = window.innerWidth;
            this.htmlCanvas.height = window.innerHeight;
        })
    }

    public onScroll(callback: (stagePoint: Point, deltaY: number, deltaX: number) => void) {
        if(callback != null) {
            this.onScrollCallbacks.push(callback);
        }
    }

    public get width() {
        return this.htmlCanvas.width;
    }

    public get height() {
        return this.htmlCanvas.height;
    }

    public get aspectRatio() {
        return this.width/this.height;
    }

    clear() {
        let ctx = this.htmlCanvas.getContext("2d");
        if(ctx != null) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, this.width, this.height);
        }
    }

    // drawAxisThoughPoint(pointInCanvas, color, dashed) {
    //     let ctx = this.canvas.getContext("2d");
    //     if(dashed){
    //         ctx.setLineDash([5, 15]);
    //     } else {
    //         ctx.setLineDash([])
    //     }

    //     ctx.beginPath();
    //     ctx.moveTo(0, pointInCanvas.y);
    //     ctx.lineTo(this.canvas.width, pointInCanvas.y);
    //     ctx.strokeStyle = color;
    //     ctx.stroke();
        

    //     ctx.beginPath();
    //     ctx.moveTo(pointInCanvas.x, 0);
    //     ctx.lineTo(pointInCanvas.x, this.canvas.height);
    //     ctx.strokeStyle = color;
    //     ctx.stroke();

    // }

    drawCircle(circle: Circle) {
        let ctx = this.htmlCanvas.getContext("2d");
        if(ctx != null) {
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, 2 * Math.PI, true);
            ctx.fill();
        }
    }

}

export const canvas = CanvasImpl.Instance;