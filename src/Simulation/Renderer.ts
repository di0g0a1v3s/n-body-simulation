import { UniverseSnapshot, BodySnapshot } from '../Universe/Universe';
import { Camera } from "./Camera";
import { Canvas } from "./Canvas";
import { Circle, RectangleAA } from '../Geometry/Shapes';
import { Vector } from '../Geometry/Vector';
import { LimitedQueue } from '../Utils/Utils';
import { Transform2d } from '../Geometry/Transform2d';

export type RendererOptions = {
    readonly showGrid: boolean;
    readonly showTrails: boolean;
    readonly trackBodies: boolean;
}
export class Renderer { 
    public isFirstFrame = true;
    constructor(private canvas: Canvas, private camera: Camera, private options: RendererOptions) {
        
    }

    setOptions(options: Partial<RendererOptions>) {
        this.options = {
            ...this.options,
            ...options
        }
    }

    renderUniverse(universe: UniverseSnapshot, prevSnapshotsQueue: LimitedQueue<UniverseSnapshot>) {
        if(this.isFirstFrame) {
            if(universe.bodies.length > 0) {
                this.camera.updateTransform(this.calcTransformToTrackBodies(universe, true));
            }
            this.isFirstFrame = false;
        }

        this.canvas.clear();
        if(this.options.showGrid) {
            this.renderAxisAndGrid(); 
        }

        if(prevSnapshotsQueue.length > 0 && this.options.showTrails) {
            let opacity = 0.2;
            const opacityStep = 0.2/prevSnapshotsQueue.length;
            prevSnapshotsQueue.forEach(prevUniverse => {
                opacity += opacityStep;
                prevUniverse.bodies.forEach(body => {
                    this.renderBodySnapshot(body, opacity/10, opacity);
                })
            })
        }
        
        universe.bodies.forEach(body => {
            this.renderBodySnapshot(body, 1, 1);
        })

        if(this.options.trackBodies && universe.bodies.length > 0) {
            this.camera.updateTransform(this.calcTransformToTrackBodies(universe, false))
        }
        
    }

    private renderBodySnapshot(body: BodySnapshot, opacity: number, scale: number) {
        const circleAbsoluteCoords = new Circle(body.position, body.radius*scale);
        const circleCameraCoords = circleAbsoluteCoords.applyTransformation(this.camera.getCameraTransform())
        this.canvas.drawCircle(circleCameraCoords, body.color, opacity);
    }

    private renderAxisAndGrid() {
        
        const cameraBounds = this.getCameraBounds();
        let distanceBetweenGridLines = 50;
        let min = 0;
        let n = Number.POSITIVE_INFINITY;
        while(n > 20) {
            n = n/2;
            distanceBetweenGridLines *= 2; 
            min = Math.min(cameraBounds.xMin, cameraBounds.yMin)
            let max = Math.max(cameraBounds.xMax, cameraBounds.yMax)
            min = Math.round(min/distanceBetweenGridLines)*distanceBetweenGridLines
            max = Math.round(max/distanceBetweenGridLines)*distanceBetweenGridLines
            n = Math.round((max-min)/distanceBetweenGridLines);
        }
        for(let i = 0; i <= n; i++) {
            const gridPoint = { x: min + i*distanceBetweenGridLines, y: min + i*distanceBetweenGridLines };
            const gridPointInCanvas = this.camera.getCameraTransform().transformPoint(gridPoint);
            this.canvas.drawHorizontalLine(gridPointInCanvas.y, true, 'blue');
            this.canvas.drawVerticalLine(gridPointInCanvas.x, true, 'blue');
        }
        const originPointInCanvas = this.camera.getCameraTransform().transformPoint(Vector.getOrigin());
        this.canvas.drawHorizontalLine(originPointInCanvas.y, false, 'red');
        this.canvas.drawVerticalLine(originPointInCanvas.x, false, 'red');
    }

    private getCameraBounds() {
        const topLeft = this.camera.getCameraInverseTransform().transformPoint({x: 0, y: 0});
        const bottomRight = this.camera.getCameraInverseTransform().transformPoint({x: this.canvas.width, y: this.canvas.height});
        return new RectangleAA(topLeft.x, topLeft.y, bottomRight.x, bottomRight.y);
    }

    calcTransformToTrackBodies(universe: UniverseSnapshot, adjustZoom: boolean) {
        const cameraBounds = this.getCameraBounds();
        const sumPoints = universe.bodies.reduce((sum, body) => {
            return {x: body.position.x * body.mass + sum.x, y: body.position.y * body.mass + sum.y}
        }, {x: 0, y: 0})
        const totalMass = universe.bodies.reduce((mass, body) => {
            return body.mass + mass;
        }, 0)
        const centroid = { x: sumPoints.x/totalMass, y: sumPoints.y/totalMass };
        const diff = Vector.diffBetweenPoints(centroid, cameraBounds.getCenter());

        if(adjustZoom) {
            const { maxX, maxY, minX, minY } = universe.bodies.reduce((limits, body) => {
                if(body.position.x - body.radius < limits.minX) {
                    limits.minX = body.position.x - body.radius;
                }
                if(body.position.y - body.radius < limits.minY) {
                    limits.minY = body.position.y - body.radius;
                }
                if(body.position.x + body.radius >limits. maxX) {
                    limits.maxX = body.position.x + body.radius;
                }
                if(body.position.y + body.radius > limits.maxY) {
                    limits.maxY = body.position.y + body.radius;
                }
                return limits;
            }, {maxX: Number.NEGATIVE_INFINITY, maxY: Number.NEGATIVE_INFINITY, minX: Number.POSITIVE_INFINITY, minY: Number.POSITIVE_INFINITY }) 
    
            const rawDeltaX = maxX - minX
            const rawDeltaY = maxY - minY
            const deltaX = Math.ceil((rawDeltaX) * 4);
            const deltaY = Math.ceil((rawDeltaY) * 3);
    
            const scaleX = (cameraBounds.xMax - cameraBounds.xMin)/deltaX;
            const scaleY = (cameraBounds.yMax - cameraBounds.yMin)/deltaY;
    
            return this.camera.getCameraTransform().concat(Transform2d.translation(diff)).concat(Transform2d.scaleAroundPoint(Math.min(scaleX, scaleY), centroid));
        } else {
            return this.camera.getCameraTransform().concat(Transform2d.translation(diff))
        }
        
    }
}
