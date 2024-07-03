export interface Point {
    readonly x: number,
    readonly y: number
}

export class Vector implements Point {
    constructor(public readonly x: number, public readonly y: number){
    }
    
    add(vector2: Vector): Vector {
        return new Vector(this.x + vector2.x, this.y + vector2.y)
    }

    diff(vector2: Vector): Vector {
        return new Vector(this.x - vector2.x, this.y - vector2.y)
    }

    scalarMultiplication(scalar: number): Vector {
        return new Vector(scalar * this.x, scalar * this.y)
    }

    magnitudeSquared(): number {
        return this.x*this.x + this.y*this.y;
    }

    magnitude() {
        return Math.sqrt(this.magnitudeSquared());
    }

    static getOrigin(): Vector {
        return new Vector(0,0);
    }

    static diffBetweenPoints(startPoint: Point, endPoint: Point): Vector {
        return new Vector(endPoint.x, endPoint.y).diff(new Vector(startPoint.x, startPoint.y));
    }

    static fromPoint(point: Point): Vector {
        return new Vector(point.x, point.y)
    }
}