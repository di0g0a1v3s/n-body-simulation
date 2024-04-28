
function getRandomId() {
    return Math.random() * 100000;
}


class Vector {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    
    add(vector2){
        return new Vector(this.x + vector2.x, this.y + vector2.y)
    }

    diff(vector2){
        return new Vector(this.x - vector2.x, this.y - vector2.y)
    }

    scalarMultiplication(scalar) {
        return new Vector(scalar * this.x, scalar * this.y)
    }

    magnitudeSquared() {
        return this.x*this.x + this.y*this.y;
    }

    magnitude() {
        return Math.sqrt(this.magnitudeSquared());
    }
}

class PhysicalLaws {
    static G_CONSTANT = 0.000001;
    static accelerationBetweenPlanets(planet1, planet2) {
        // a_12 = v_12 * (G * m_2)/||v_12||^3
        let vectorPlanet1ToPlanet2 = planet2.position.diff(planet1.position);
        return vectorPlanet1ToPlanet2.scalarMultiplication(PhysicalLaws.G_CONSTANT * planet2.mass/(vectorPlanet1ToPlanet2.magnitudeSquared() * vectorPlanet1ToPlanet2.magnitude()))
    }
}

class Planet {
    constructor(mass, position, velocity, id) {
        if(id == null ){
            this.id = getRandomId();
        } else {
            this.id = id;
        }
        this.mass = mass;
        this.radius = mass/3000000
        this.position = position;
        this.velocity = velocity;
    }

    updatePositionAndVelocity(acceleration, deltaT) {
        // newVelocity = a * deltaT + oldVelocity
        const newVelocity = this.velocity.add(acceleration.scalarMultiplication(deltaT));
        // newPosition = v * deltaT + oldPosition
        const newPosition = this.position.add(this.velocity.scalarMultiplication(deltaT));
        this.velocity = newVelocity;
        this.position = newPosition;
    }
}

class Universe {
    constructor() {
        this.planets = [];
    }

    addPlanet(planet){
        this.planets.push(planet)
    }

    updatePositions(deltaTsinceLastUpdate){
        const planetsOriginal = this.planets.map(p => new Planet(p.mass, p.position, p.velocity, p.id));
        planetsOriginal.forEach((planet1, indexPlanet1) => {
            let acceleration = new Vector(0,0);
            planetsOriginal.forEach((planet2) => {
                if(planet1.id !== planet2.id){
                    acceleration = acceleration.add(PhysicalLaws.accelerationBetweenPlanets(planet1, planet2))
                }
            })
            this.planets[indexPlanet1].updatePositionAndVelocity(acceleration, deltaTsinceLastUpdate);
        })
    }
}

class Canvas {
    constructor(width, height) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        document.body.appendChild(this.canvas);
        this.clearCanvas();
    }

    clearCanvas() {
        let ctx = this.canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    updateWithUniverse(universe) {
        this.clearCanvas();
        universe.planets.forEach(planet => {
            this.drawPlanet(planet);
        })
    }

    drawPlanet(planet) {
        // ctx.fillRect(planet.position.x - 5, planet.position.y - 5, 10, 10);
        let ctx = this.canvas.getContext("2d");
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(planet.position.x, planet.position.y, planet.radius, 0, 2 * Math.PI, true);
        ctx.fill();
    }

}

let universe = new Universe();
universe.addPlanet(new Planet(10000000, new Vector(500, 300), new Vector(0, -0.16)));
universe.addPlanet(new Planet(10000000, new Vector(300, 300), new Vector(0, 0.16)));
// universe.addPlanet(new Planet(30000000, new Vector(1400, 700), new Vector(0, 0)));
let canvas = new Canvas(1500, 700)

let previousTimeStamp;
const step = timeStamp => {
    let deltaT = 0
    if(previousTimeStamp != null) {
        deltaT = timeStamp - previousTimeStamp;
    }
    if (previousTimeStamp !== timeStamp) {
        universe.updatePositions(deltaT);
        canvas.updateWithUniverse(universe);
    }
    previousTimeStamp = timeStamp;
    window.requestAnimationFrame(step);     
}
window.requestAnimationFrame(step);

