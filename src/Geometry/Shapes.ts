import { Transform2d } from "./Transform2d";
import { Point } from "./Vector";

interface TransformableShape {
    applyTransformation(transform: Transform2d): TransformableShape
}

export class RectangleAA implements TransformableShape {
    constructor(public readonly xMin: number, public readonly yMin: number, public readonly xMax: number, public readonly yMax: number) {
    }

    getCenter(): Point {
        return { x: (this.xMax + this.xMin)/2, y: (this.yMax + this.yMin) / 2 };
    }

    applyTransformation(transform: Transform2d): RectangleAA {
        return transform.transformRectangle(this);
    }
}

export class Circle implements TransformableShape {
    constructor(public readonly center: Point, public readonly radius: number) {
        
    }

    applyTransformation(transform: Transform2d): Circle {
        return transform.transformCircle(this);
    }
}