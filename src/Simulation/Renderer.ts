import { UniverseSnapshot, PlanetSnapshot } from '../Universe/Universe';
import { Camera } from "./Camera";
import { Canvas } from "./Canvas";
import { Circle, RectangleAA } from '../Geometry/Shapes';
import { Vector } from '../Geometry/Vector';
import { LimitedQueue, createLimitedQueue } from '../Utils/Utils';


export class Renderer { 
    constructor(private canvas: Canvas, private camera: Camera) {
        
    }

    renderUniverse(universe: UniverseSnapshot, prevSnapshotsQueue: LimitedQueue<UniverseSnapshot>) {
        this.canvas.clear();
        this.renderAxisAndGrid();

        if(prevSnapshotsQueue.length > 0) {
            let opacity = 0.2;
            const opacityStep = 0.2/prevSnapshotsQueue.length;
            prevSnapshotsQueue.forEach(prevUniverse => {
                opacity += opacityStep;
                prevUniverse.planets.forEach(planet => {
                    this.renderPlanetSnapshot(planet, opacity/10, opacity);
                })
            })
        }
        
        universe.planets.forEach(planet => {
            this.renderPlanetSnapshot(planet, 1, 1);
        })
    }

    private renderPlanetSnapshot(planet: PlanetSnapshot, opacity: number, scale: number) {
        const circleAbsoluteCoords = new Circle(planet.position, planet.radius*scale);
        const circleCameraCoords = circleAbsoluteCoords.applyTransformation(this.camera.getCameraTransform())
        this.canvas.drawCircle(circleCameraCoords, planet.color, opacity);
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
}
