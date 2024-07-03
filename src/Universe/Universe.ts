import { Point, Vector } from "../Geometry/Vector";

const COLLISION_TOLERANCE_PERCENTAGE = 0

abstract class PhysicalLaws {
    static G_CONSTANT = 0//0.000001;
    static accelerationBetweenPlanets(planet1: Planet, planet2: Planet) {
        // a_12 = v_12 * (G * m_2)/||v_12||^3
        let vectorPlanet1ToPlanet2 = Vector.diffBetweenPoints(planet1.position, planet2.position);
        return vectorPlanet1ToPlanet2.scalarMultiplication(PhysicalLaws.G_CONSTANT * planet2.mass/(vectorPlanet1ToPlanet2.magnitudeSquared() * vectorPlanet1ToPlanet2.magnitude()))
    }
}

export interface UniverseSnapshot {
    readonly planets: ReadonlyArray<PlanetSnapshot>;
}

type PlanetSnapshot = {
    readonly position: Point;
    readonly radius: number;
    readonly mass: number;
}

export class Planet {
    public mass: number;
    public radius: number;
    public velocity: Vector;
    public position: Point;
    constructor(mass: number, position: Point, velocity: Vector) {
        this.mass = mass;
        this.radius = Math.sqrt(mass)
        this.position = position;
        this.velocity = velocity;
    }
}

export class Universe {
    private planets: Planet[];
    constructor() {
        this.planets = [];
    }

    addPlanet(planet: Planet){
        this.planets.push(planet)
    }

    private collidingPlanets(planet1: Planet, planet2: Planet) {
        return Vector.diffBetweenPoints(planet1.position, planet2.position).magnitudeSquared() < (planet1.radius + planet2.radius)**2 * (1+COLLISION_TOLERANCE_PERCENTAGE/100)
    }

    public getSnapshot(): UniverseSnapshot {
        return {
            planets: this.planets.map(p => ({
                mass: p.mass,
                radius: p.radius,
                position: {x: p.position.x, y: p.position.y},
            }))
        }
    }

    public updatePositions(deltaTsinceLastUpdate: number) {
        let planetsOriginal = this.planets.map(p => new Planet(p.mass, p.position, p.velocity));
        planetsOriginal.forEach((planet1, indexPlanet1) => {
            let acceleration = new Vector(0,0);
            planetsOriginal.forEach((planet2) => {
                if(planet1 !== planet2){
                    acceleration = acceleration.add(PhysicalLaws.accelerationBetweenPlanets(planet1, planet2))
                }
            }) 
            // newVelocity = a * deltaT + oldVelocity
            const newVelocity = this.planets[indexPlanet1].velocity.add(acceleration.scalarMultiplication(deltaTsinceLastUpdate));
            // newPosition = v * deltaT + oldPosition
            const newPosition = Vector.fromPoint(this.planets[indexPlanet1].position).add(this.planets[indexPlanet1].velocity.scalarMultiplication(deltaTsinceLastUpdate));
            this.planets[indexPlanet1].velocity = newVelocity;
            this.planets[indexPlanet1].position = newPosition;
            
            
        })

        // collisions
        this.planets.forEach((planet1, indexPlanet1) => {
            if(planet1 == null){
                return;
            }
            this.planets.forEach((planet2, indexPlanet2) => {
                if(planet2 != null && planet1 !== planet2 && this.collidingPlanets(planet1,planet2)){
                    const newMass = planet1.mass + planet2.mass;
                    this.planets[indexPlanet1] = new Planet(
                        newMass, 
                        planet1.mass > planet2.mass ? planet1.position : planet2.position, 
                        planet1.velocity.scalarMultiplication(planet1.mass/newMass).add(planet2.velocity.scalarMultiplication(planet2.mass/newMass)))
                    this.planets = this.planets.splice(indexPlanet2, 1)
                }
            })
        })
        this.planets = this.planets.filter(planet => planet != null)
    }
}
