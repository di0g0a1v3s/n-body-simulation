import { Point, Vector } from '../Geometry/Vector';
import { BodyTemplate, UniverseTemplate } from './UniverseTemplates';
import * as Utils from "../Utils/Utils";
import { colorAverage } from '../Utils/Utils';

const COLLISION_TOLERANCE_PERCENTAGE = 0

export interface UniverseSnapshot {
    readonly bodies: ReadonlyArray<BodySnapshot>;
}

export type BodySnapshot = {
    readonly position: Point;
    readonly radius: number;
    readonly mass: number;
    readonly color: string;
}

export class Body {
    private _mass: number;
    private _radius: number;
    private _velocity: Vector;
    private _position: Point;
    private _color: string;
    static create(mass: number, position: Point, velocity: Vector, color?: string | null) {
        return new this(mass, Math.sqrt(mass), position, velocity, color ?? Utils.getRandomColor());
    }

    static createFromTemplate(bodyTempalte: BodyTemplate) {
        return new this(bodyTempalte.mass, Math.sqrt(bodyTempalte.mass), bodyTempalte.position, Vector.fromPoint(bodyTempalte.velocity), bodyTempalte.color);
    }
    
    private constructor(mass: number, radius: number, position: Point, velocity: Vector, color: string) {
        this._mass = mass;
        this._radius = radius;
        this._position = position;
        this._velocity = velocity;
        this._color = color;
    }

    public get mass() {
        return this._mass;
    }

    public get radius() {
        return this._radius;
    }

    public get position() {
        return this._position;
    }

    public get velocity() {
        return this._velocity;
    }

    public get color() {
        return this._color;
    }

    public updateVelocity(newVelocity: Vector) {
        this._velocity = newVelocity;
    }

    public updatePosition(newPosition: Point) {
        this._position = newPosition;
    }

    clone(): Body {
        return new Body(this._mass, this._radius, this._position, this._velocity, this._color)
    }
}

export class Universe {
    private bodies: Body[];
    private constructor(private gravitationalContant: number) {
        this.bodies = [];
    }

    static createFromTemplate(template: UniverseTemplate){
        const u =  new this(template.gravitationalConstant);
        template.bodies.forEach(body => {
            u.addBody(Body.createFromTemplate(body))
        })
        return u;
    }

    setGravitationalConstant(g: number) {
        this.gravitationalContant = g;
    }

    getGravitationalConstant() {
        return this.gravitationalContant;
    }

    private addBody(body: Body) {
        this.bodies.push(body)
    }

    public addBodyFromTemplate(body: BodyTemplate) {
        this.bodies.push(Body.createFromTemplate(body))
    }

    public deleteBody(index: number) {
        this.bodies.splice(index, 1);
    }

    private collidingBodies(body1: Body, body2: Body) {
        return Vector.diffBetweenPoints(body1.position, body2.position).magnitudeSquared() < (body1.radius + body2.radius)**2 * (1+COLLISION_TOLERANCE_PERCENTAGE/100)
    }

    public getSnapshot(): UniverseSnapshot {
        return {
            bodies: this.bodies.map(p => ({
                mass: p.mass,
                radius: p.radius,
                position: {x: p.position.x, y: p.position.y},
                color: p.color,
            }))
        }
    }

    public getTemplateDataFromCurrUniverseState(): UniverseTemplate {
        return {
            name: "Placehoder",
            gravitationalConstant: this.getGravitationalConstant(),
            bodies: this.bodies.map(body => {
                return {
                    mass: body.mass,
                    color: body.color,
                    position: body.position,
                    velocity: body.velocity
                }
            })
        }
    }

    public updatePositions(deltaTsinceLastUpdate: number) {
        let bodiesOriginal = this.bodies.map(p => p.clone());

        bodiesOriginal.forEach((body1, indexBody1) => {
            let acceleration = new Vector(0,0);
            bodiesOriginal.forEach((body2) => {
                if(body1 !== body2) {
                    acceleration = acceleration.add(this.accelerationBetweenBodies(body1, body2))
                }
            }) 
            // newVelocity = a * deltaT + oldVelocity
            const newVelocity = this.bodies[indexBody1].velocity.add(acceleration.scalarMultiplication(deltaTsinceLastUpdate));
            // newPosition = v * deltaT + oldPosition
            const newPosition = Vector.fromPoint(this.bodies[indexBody1].position).add(this.bodies[indexBody1].velocity.scalarMultiplication(deltaTsinceLastUpdate));
            this.bodies[indexBody1].updateVelocity(newVelocity);
            this.bodies[indexBody1].updatePosition(newPosition);  
        })

        // collisions
        this.bodies.forEach((body1, indexBody1) => {
            this.bodies.forEach((body2, indexBody2) => {
                if(body1 !== body2 && this.collidingBodies(body1,body2)){
                    const newMass = body1.mass + body2.mass;
                    this.bodies[indexBody1] = Body.create(
                        newMass, 
                        // center of mass of two bodies: xf = (x1 * m1 + x2 * m2)/(m1 + m2)
                        Vector.fromPoint(body1.position).scalarMultiplication(body1.mass/newMass).add(Vector.fromPoint(body2.position).scalarMultiplication(body2.mass/newMass)),
                        // conservation of linear momentum: vf = (v1 * m1 + v2 * m2)/(m1 + m2)
                        body1.velocity.scalarMultiplication(body1.mass/newMass).add(body2.velocity.scalarMultiplication(body2.mass/newMass)),
                        colorAverage(body1.color, body2.color, body1.mass, body2.mass)
                    )
                    this.bodies.splice(indexBody2, 1)
                }
            })
        })
    }

    private accelerationBetweenBodies(body1: Body, body2: Body) {
        // a_12 = v_12 * (G * m_2)/||v_12||^3
        let vectorBody1ToBody2 = Vector.diffBetweenPoints(body1.position, body2.position);
        return vectorBody1ToBody2.scalarMultiplication(this.gravitationalContant * body2.mass/(vectorBody1ToBody2.magnitudeSquared() * vectorBody1ToBody2.magnitude()))
    }
}

