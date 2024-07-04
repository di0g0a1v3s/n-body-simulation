import { UniverseSnapshot } from "../Universe/Universe"
import { Camera } from "./Camera";
import { Canvas } from "./Canvas";
import { Circle, RectangleAA } from '../Geometry/Shapes';
import { Vector } from '../Geometry/Vector';


export class Renderer { 
    constructor(private canvas: Canvas, private camera: Camera) {
    }

    renderUniverseSnapshot(universe: UniverseSnapshot) {
        this.canvas.clear();
        this.renderAxisAndGrid();
        universe.planets.forEach(planet => {
            const circleAbsoluteCoords = new Circle(planet.position, planet.radius);
            const circleCameraCoords = circleAbsoluteCoords.applyTransformation(this.camera.getCameraTransform())
            this.canvas.drawCircle(circleCameraCoords);
        })
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
