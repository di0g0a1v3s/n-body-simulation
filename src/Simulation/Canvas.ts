import { Circle } from "../Geometry/Shapes";
import { Point } from "../Geometry/Vector";


export interface Canvas {
    clear(): void;
    readonly width: number;
    readonly height: number;
    drawCircle(circle: Circle): void
    onScroll(callback: (point: Point, deltaY: number, deltaX: number) => void): void
    drawVerticalLine(x: number, dashed: boolean, color: string): void;
    drawHorizontalLine(y: number, dashed: boolean, color: string): void;
    onMouseLeftDown(callback: (point: Point) => void): void
    onMouseLeftUp(callback: (point: Point) => void): void
    onMouseMove(callback: (point: Point) => void): void
    
}

enum MouseButton {
    LEFT = 0,
    MIDDLE = 1,
    RIGHT = 2,
}

class CanvasImpl implements Canvas {
    // singleton class
    private static instance: CanvasImpl;
    private htmlCanvas: HTMLCanvasElement;
    private onScrollCallbacks: ((point: Point, deltaY: number, deltaX: number) => void)[] = [];
    private onMouseLeftUpCallbacks: ((point: Point) => void)[] = [];
    private onMouseLeftDownCallbacks: ((point: Point) => void)[] = [];
    private onMouseMoveCallbacks: ((point: Point) => void)[] = [];

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
            this.htmlCanvas = canvas as HTMLCanvasElement;
        }
        this.htmlCanvas.width = window.innerWidth;
        this.htmlCanvas.height = window.innerHeight;
        this.clear();

        const getEvtPointInCanvas = (evt: MouseEvent): Point => {
            const rect = this.htmlCanvas.getBoundingClientRect();
            const x = evt.clientX - rect.left
            const y = evt.clientY - rect.top
            return { x, y }
        }

        this.htmlCanvas.addEventListener("wheel", evt => {
            const evtPointInCanvas = getEvtPointInCanvas(evt);
            this.onScrollCallbacks.forEach(cb => {
                cb(evtPointInCanvas, evt.deltaY, evt.deltaX);
            })
        })

        this.htmlCanvas.addEventListener("mouseup", evt => {
            if(evt.button === MouseButton.LEFT) {
                const evtPointInCanvas = getEvtPointInCanvas(evt);
                this.onMouseLeftUpCallbacks.forEach(cb => {
                    cb(evtPointInCanvas);
                })
            }
        })

        this.htmlCanvas.addEventListener("mousedown", evt => {
            if(evt.button === MouseButton.LEFT) {
                const evtPointInCanvas = getEvtPointInCanvas(evt);
                this.onMouseLeftDownCallbacks.forEach(cb => {
                    cb(evtPointInCanvas);
                })
            }
        })

        this.htmlCanvas.addEventListener("mousemove", evt => {
            const evtPointInCanvas = getEvtPointInCanvas(evt);
            this.onMouseMoveCallbacks.forEach(cb => {
                cb(evtPointInCanvas);
            })
            
        })

        window.addEventListener("resize", () => {
            this.htmlCanvas.width = window.innerWidth;
            this.htmlCanvas.height = window.innerHeight;
        })
    }

    public onScroll(callback: (point: Point, deltaY: number, deltaX: number) => void) {
        if(callback != null) {
            this.onScrollCallbacks.push(callback);
        }
    }

    public onMouseLeftDown(callback: (point: Point) => void) {
        if(callback != null) {
            this.onMouseLeftDownCallbacks.push(callback);
        }
    }

    public onMouseLeftUp(callback: (point: Point) => void) {
        if(callback != null) {
            this.onMouseLeftUpCallbacks.push(callback);
        }
    }

    public onMouseMove(callback: (point: Point) => void) {
        if(callback != null) {
            this.onMouseMoveCallbacks.push(callback);
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

    drawVerticalLine(x: number, dashed: boolean, color: string) {
        let ctx = this.htmlCanvas.getContext("2d");
        if(ctx == null) {
            return;
        }
        if(dashed){
            ctx.setLineDash([5, 15]);
        } else {
            ctx.setLineDash([])
        }

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, this.htmlCanvas.height);
        ctx.strokeStyle = color;
        ctx.stroke();
    }

    drawHorizontalLine(y: number, dashed: boolean, color: string) {
        let ctx = this.htmlCanvas.getContext("2d");
        if(ctx == null) {
            return;
        }
        if(dashed){
            ctx.setLineDash([5, 15]);
        } else {
            ctx.setLineDash([])
        }

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(this.htmlCanvas.width, y);
        ctx.strokeStyle = color;
        ctx.stroke();
    }

}

export const canvas = CanvasImpl.Instance;