import { Circle } from "../Geometry/Shapes";
import { Point } from "../Geometry/Vector";


enum MouseButton {
    LEFT = 0,
    MIDDLE = 1,
    RIGHT = 2,
}

export class Canvas {
    private onScrollCallbacks: ((point: Point, deltaY: number, deltaX: number) => void)[] = [];
    private onMouseLeftUpCallbacks: ((point: Point) => void)[] = [];
    private onMouseLeftDownCallbacks: ((point: Point) => void)[] = [];
    private onMouseMoveCallbacks: ((point: Point) => void)[] = [];
    
    constructor(private htmlCanvas: HTMLCanvasElement) {
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

    drawCircle(circle: Circle, color: string, opacity: number) {
        let ctx = this.htmlCanvas.getContext("2d");
        if(ctx != null) {
            ctx.fillStyle = color;
            ctx.globalAlpha = opacity;
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