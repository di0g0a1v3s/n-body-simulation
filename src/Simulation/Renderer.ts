import { UniverseSnapshot } from "../Universe/Universe"
import { Camera } from "./Camera";
import { Canvas } from "./Canvas";
import { Circle } from '../Geometry/Shapes';


export class Renderer { 
    constructor(private canvas: Canvas, private camera: Camera) {
    }

    renderUniverseSnapshot(universe: UniverseSnapshot) {
        this.canvas.clear();
        
        // this.drawAxisAndGrid(this.currentCameraBounds);
        universe.planets.forEach(planet => {
            const circleAbsoluteCoords = new Circle(planet.position, planet.radius);
            const circleCameraCoords = circleAbsoluteCoords.applyTransformation(this.camera.getCameraTransform())
            this.canvas.drawCircle(circleCameraCoords);
        })
    }
}
    //TODO: use transform2d for this
    // absoluteToRelativePosition(vector, bounds) {
    //     return new Vector(
    //         (vector.x - bounds.xMin)/parseFloat(bounds.xMax - bounds.xMin),
    //         (vector.y - bounds.yMin)/parseFloat(bounds.yMax - bounds.yMin),
    //     )
    // }

    // relativeToAbsolutePosition(vector, bounds) {
    //     return new Vector(
    //         vector.x * (bounds.xMax - bounds.xMin) + bounds.xMin,
    //         vector.y * (bounds.yMax - bounds.yMin) + bounds.yMin,
    //     )
    // }

    // getCameraBoundsForTrackingBodies(pointsToCover) {
    //     const PADDING = 200;
    //     const bounds = {
    //         xMax: Number.NEGATIVE_INFINITY,
    //         xMin: Number.POSITIVE_INFINITY,
    //         yMax: Number.NEGATIVE_INFINITY,
    //         yMin: Number.POSITIVE_INFINITY,
    //     }
    //     pointsToCover.forEach(point => {
    //         if(point.x + PADDING > bounds.xMax) {
    //             bounds.xMax = point.x + PADDING;
    //         }
    //         if(point.x - PADDING < bounds.xMin) {
    //             bounds.xMin = point.x - PADDING;
    //         }
    //         if(point.y + PADDING > bounds.yMax) {
    //             bounds.yMax = point.y + PADDING;
    //         }
    //         if(point.y - PADDING < bounds.yMin) {
    //             bounds.yMin = point.y - PADDING;
    //         }
    //     })
    //     if((bounds.xMax - bounds.xMin)/(bounds.yMax - bounds.yMin) > this.canvasAspectRatio) {
    //         let yDelta = (bounds.xMax - bounds.xMin)/this.canvasAspectRatio;
    //         const yDeltaMissing = yDelta - (bounds.yMax - bounds.yMin);
    //         bounds.yMax = bounds.yMax + yDeltaMissing/2;
    //         bounds.yMin = bounds.yMin - yDeltaMissing/2;
    //     } else {
    //         let xDelta = (bounds.yMax - bounds.yMin)*this.canvasAspectRatio;
    //         const xDeltaMissing = xDelta - (bounds.xMax - bounds.xMin);
    //         bounds.xMax = bounds.xMax + xDeltaMissing/2;
    //         bounds.xMin = bounds.xMin - xDeltaMissing/2;
    //     }
    //     const inflatedBounds = {
    //         xMax: bounds.xMax,//(bounds.xMax - bounds.xMin) * 0.5,
    //         xMin: bounds.xMin, //(bounds.xMax - bounds.xMin) * 0.5,
    //         yMax: bounds.yMax,//(bounds.yMax - bounds.yMin) * 0.5,
    //         yMin: bounds.yMin,//(bounds.yMax - bounds.yMin) * 0.5,
    //     }

    //     return new RectangleAA(inflatedBounds.xMin, inflatedBounds.yMin, inflatedBounds.xMax, inflatedBounds.yMax);
    // }


    // drawAxisAndGrid(cameraBounds) {
        
    //     let n = Number.POSITIVE_INFINITY;
    //     let distanceBetweenGridLines = 50;
    //     let min = 0;
    //     while(n > 20) {
    //         n = n/2;
    //         distanceBetweenGridLines *= 2; 
    //         min = Math.min(cameraBounds.xMin, cameraBounds.yMin)
    //         let max = Math.max(cameraBounds.xMax, cameraBounds.yMax)
    //         min = Math.round(min/distanceBetweenGridLines)*distanceBetweenGridLines
    //         max = Math.round(max/distanceBetweenGridLines)*distanceBetweenGridLines
    //         n = Math.round((max-min)/distanceBetweenGridLines);
    //     }
    //     for(let i = 0; i<=n; i++) {
    //         const gridPointPositionRelativeToCamera = this.absoluteToRelativePosition(new Vector(min + i*distanceBetweenGridLines,min + i*distanceBetweenGridLines), cameraBounds);
    //         const gridPointPositionInCanvas = this.relativeToAbsolutePosition(gridPointPositionRelativeToCamera, this.canvasBounds); 
    //         this.drawAxisThoughPoint(gridPointPositionInCanvas, 'blue', true);
    //     }
    //     const originPositionRelativeToCamera = this.absoluteToRelativePosition(new Vector(0,0), cameraBounds);
    //     const originPositionInCanvas = this.relativeToAbsolutePosition(originPositionRelativeToCamera, this.canvasBounds);
    //     this.drawAxisThoughPoint(originPositionInCanvas, 'red', false);
    // }
