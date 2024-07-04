import { Circle, RectangleAA } from "./Shapes";
import { Point, Vector } from "./Vector";

export class Transform2d {
    private constructor(private readonly matrix3d: Matrix3d) { }

    static getIdentityTransform(): Transform2d {
        return new Transform2d(new Matrix3d(
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ))
    }

    static translation(vector: Vector): Transform2d {
        return new Transform2d(new Matrix3d(
            1, 0, vector.x,
            0, 1, vector.y,
            0, 0, 1
        ))
    }

    static scaleAroundOrigin(scaleFactor: number): Transform2d {
        return new Transform2d(new Matrix3d(
            scaleFactor, 0, 0,
            0, scaleFactor, 0,
            0, 0, 1
        ))
    }

    static scaleAroundPoint(scaleFactor: number, point: Point): Transform2d {
        return Transform2d.translation(new Vector(point.x, point.y))
            .concat(Transform2d.scaleAroundOrigin(scaleFactor))
                .concat(Transform2d.translation(new Vector(-point.x, -point.y)));
    }

    getInverseTransform(): Transform2d {
        const { a00, a01, a02, a10, a11, a12, a20, a21, a22 } = this.matrix3d;

        const det = a00 * (a11 * a22 - a21 * a12) -
             a01 * (a10 * a22 - a12 * a20) +
             a02 * (a10 * a21 - a11 * a20);

        const invdet = 1 / det;

        const ia00 = (a11 * a22 - a21 * a12) * invdet;
        const ia01 = (a02 * a21 - a01 * a22) * invdet;
        const ia02 = (a01 * a12 - a02 * a11) * invdet;
        const ia10 = (a12 * a20 - a10 * a22) * invdet;
        const ia11 = (a00 * a22 - a02 * a20) * invdet;
        const ia12 = (a10 * a02 - a00 * a12) * invdet;
        const ia20 = (a10 * a21 - a20 * a11) * invdet;
        const ia21 = (a20 * a01 - a00 * a21) * invdet;
        const ia22 = (a00 * a11 - a10 * a01) * invdet;

        return new Transform2d(
            new Matrix3d(
                ia00, ia01, ia02, 
                ia10, ia11, ia12,
                ia20, ia21, ia22
            )
        )
    }

    concat(other: Transform2d): Transform2d {
        return new Transform2d(this.matrix3d.multiplyWith(other.matrix3d))
    }

    transformPoint(point: Point): Point {
        return { x: this.matrix3d.a00 * point.x + this.matrix3d.a01 * point.y + this.matrix3d.a02,
            y: this.matrix3d.a10 * point.x + this.matrix3d.a11 * point.y + this.matrix3d.a12 };
    }

    transformVector(vector: Vector): Vector {
        return new Vector(this.matrix3d.a00 * vector.x + this.matrix3d.a01 * vector.y,
            this.matrix3d.a10 * vector.x + this.matrix3d.a11 * vector.y);
    }

    transformRectangle(rectangle: RectangleAA): RectangleAA {
        const topLeft = this.transformPoint({x: rectangle.xMin, y: rectangle.yMin});
        const bottomRight = this.transformPoint({x: rectangle.xMax, y: rectangle.yMax});
        return new RectangleAA(topLeft.x, topLeft.y, bottomRight.x, bottomRight.y)
    }

    transformDistance(distance: number): number {
        return this.matrix3d.a00 * distance;
    }

    transformCircle(circle: Circle): Circle {
        const center = this.transformPoint(circle.center);
        return new Circle(center, this.transformDistance(circle.radius));
    }
}


class Matrix3d {
    constructor(
        public readonly a00: number,
        public readonly a01: number,
        public readonly a02: number,
        public readonly a10: number,
        public readonly a11: number,
        public readonly a12: number,
        public readonly a20: number,
        public readonly a21: number,
        public readonly a22: number) {}

    multiplyWith(secondMatrix: Matrix3d) {
        return new Matrix3d(
            this.a00 * secondMatrix.a00 + this.a01 * secondMatrix.a10 + this.a02 * secondMatrix.a20,
                this.a00 * secondMatrix.a01 + this.a01 * secondMatrix.a11+ this.a02 * secondMatrix.a21,
                    this.a00 * secondMatrix.a02+ this.a01 * secondMatrix.a12+ this.a02 * secondMatrix.a22,
            this.a10 * secondMatrix.a00+ this.a11 * secondMatrix.a10+ this.a12 * secondMatrix.a20,
                this.a10 * secondMatrix.a01 + this.a11 * secondMatrix.a11 + this.a12 * secondMatrix.a21,
                    this.a10 * secondMatrix.a02+ this.a11 * secondMatrix.a12 + this.a12 * secondMatrix.a22,
            this.a20 * secondMatrix.a00 + this.a21 * secondMatrix.a10  + this.a22 * secondMatrix.a20,
                this.a20 * secondMatrix.a01 + this.a21 * secondMatrix.a11 + this.a22 * secondMatrix.a21,
                    this.a20 * secondMatrix.a02 + this.a21 * secondMatrix.a12 + this.a22 * secondMatrix.a22,
        )
    }

}
