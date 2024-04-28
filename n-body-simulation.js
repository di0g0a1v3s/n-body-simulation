
function getRandomId() {
    return Math.random() * 100000;
}
const COLLISION_TOLERANCE_PERCENTAGE = 200

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

    collidingWithOther(otherPlanet) {
        return this.position.diff(otherPlanet.position).magnitudeSquared() < (this.radius + otherPlanet.radius)**2 * (1+COLLISION_TOLERANCE_PERCENTAGE/100)
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
        let planetsOriginal = this.planets.map(p => new Planet(p.mass, p.position, p.velocity, p.id));
        planetsOriginal.forEach((planet1, indexPlanet1) => {
            let acceleration = new Vector(0,0);
            planetsOriginal.forEach((planet2) => {
                if(planet1.id !== planet2.id){
                    acceleration = acceleration.add(PhysicalLaws.accelerationBetweenPlanets(planet1, planet2))
                }
            })
            this.planets[indexPlanet1].updatePositionAndVelocity(acceleration, deltaTsinceLastUpdate);
        })

        // collisions
        this.planets.forEach((planet1, indexPlanet1) => {
            if(planet1 == null){
                return;
            }
            this.planets.forEach((planet2, indexPlanet2) => {
                if(planet2 != null && planet1.id !== planet2.id && planet1.collidingWithOther(planet2)){
                    const newMass = planet1.mass + planet2.mass;
                    this.planets[indexPlanet1] = new Planet(
                        newMass, 
                        planet1.mass > planet2.mass ? planet1.position : planet2.position, 
                        planet1.velocity.scalarMultiplication(planet1.mass/newMass).add(planet2.velocity.scalarMultiplication(planet2.mass/newMass)), 
                        planet1.id)
                    this.planets[indexPlanet2] = null;
                }
            })
        })
        this.planets = this.planets.filter(planet => planet != null)
    }
}

class Canvas {
    constructor(width, height) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        document.body.appendChild(this.canvas);
        this.canvasAspectRatio = width/height;
        this.canvasBounds = {
            xMax: width,
            xMin: 0,
            yMax: height,
            yMin: 0,
        }
        this.currentCameraBounds = null;
        this.clearCanvas();
    }

    clearCanvas() {
        let ctx = this.canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    updateWithUniverse(universe) {
        this.clearCanvas();

        const pointsToCoverInCamera = universe.planets.map(p => p.position);
        pointsToCoverInCamera.push(new Vector(-10,-10))
        pointsToCoverInCamera.push(new Vector(10,10))
        if(this.currentCameraBounds != null) {
            // pointsToCoverInCamera.push(new Vector(this.currentCameraBounds.xMin, this.currentCameraBounds.yMin))
            // pointsToCoverInCamera.push(new Vector(this.currentCameraBounds.xMax, this.currentCameraBounds.yMax))
        }

        this.currentCameraBounds = this.getCameraBounds(pointsToCoverInCamera)
        this.drawAxisAndGrid(this.currentCameraBounds);
        universe.planets.forEach(planet => {
            this.drawPlanet(planet, this.currentCameraBounds);
        })
        
    }

    drawAxisAndGrid(cameraBounds) {
        
        let n = Number.POSITIVE_INFINITY;
        let distanceBetweenGridLines = 50;
        let min = 0;
        while(n > 20) {
            n = n/2;
            distanceBetweenGridLines *= 2; 
            min = Math.min(cameraBounds.xMin, cameraBounds.yMin)
            let max = Math.max(cameraBounds.xMax, cameraBounds.yMax)
            min = Math.round(min/distanceBetweenGridLines)*distanceBetweenGridLines
            max = Math.round(max/distanceBetweenGridLines)*distanceBetweenGridLines
            n = Math.round((max-min)/distanceBetweenGridLines);
        }
        for(let i = 0; i<=n; i++) {
            const gridPointPositionRelativeToCamera = this.absoluteToRelativePosition(new Vector(min + i*distanceBetweenGridLines,min + i*distanceBetweenGridLines), cameraBounds);
            const gridPointPositionInCanvas = this.relativeToAbsolutePosition(gridPointPositionRelativeToCamera, this.canvasBounds); 
            this.drawAxisThoughPoint(gridPointPositionInCanvas, 'blue', true);
        }
        const originPositionRelativeToCamera = this.absoluteToRelativePosition(new Vector(0,0), cameraBounds);
        const originPositionInCanvas = this.relativeToAbsolutePosition(originPositionRelativeToCamera, this.canvasBounds);
        this.drawAxisThoughPoint(originPositionInCanvas, 'red', false);
    }

    drawAxisThoughPoint(pointInCanvas, color, dashed) {
        let ctx = this.canvas.getContext("2d");
        if(dashed){
            ctx.setLineDash([5, 15]);
        } else {
            ctx.setLineDash([])
        }

        ctx.beginPath();
        ctx.moveTo(0, pointInCanvas.y);
        ctx.lineTo(this.canvas.width, pointInCanvas.y);
        ctx.strokeStyle = color;
        ctx.stroke();
        

        ctx.beginPath();
        ctx.moveTo(pointInCanvas.x, 0);
        ctx.lineTo(pointInCanvas.x, this.canvas.height);
        ctx.strokeStyle = color;
        ctx.stroke();

    }

    // drawPlanet(planet) {
    //     // ctx.fillRect(planet.position.x - 5, planet.position.y - 5, 10, 10);
    //     let ctx = this.canvas.getContext("2d");
    //     ctx.fillStyle = "white";
    //     ctx.beginPath();
    //     ctx.arc(planet.position.x, planet.position.y, planet.radius, 0, 2 * Math.PI, true);
    //     ctx.fill();
    // }

    drawPlanet(planet, cameraBounds) {
        const planetPositionRelativeToCamera = this.absoluteToRelativePosition(planet.position, cameraBounds);
        const planetPositionInCanvas = this.relativeToAbsolutePosition(planetPositionRelativeToCamera, this.canvasBounds);
        const planetRadiusInCanvas = planet.radius * this.canvas.height/(cameraBounds.yMax - cameraBounds.yMin)
        let ctx = this.canvas.getContext("2d");
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(planetPositionInCanvas.x, planetPositionInCanvas.y, planetRadiusInCanvas, 0, 2 * Math.PI, true);
        ctx.fill();
    }

    absoluteToRelativePosition(vector, bounds) {
        return new Vector(
            (vector.x - bounds.xMin)/parseFloat(bounds.xMax - bounds.xMin),
            (vector.y - bounds.yMin)/parseFloat(bounds.yMax - bounds.yMin),
        )
    }

    relativeToAbsolutePosition(vector, bounds) {
        return new Vector(
            vector.x * (bounds.xMax - bounds.xMin) + bounds.xMin,
            vector.y * (bounds.yMax - bounds.yMin) + bounds.yMin,
        )
    }

    getCameraBounds(pointsToCover) {
        const PADDING = 200;
        const bounds = {
            xMax: Number.NEGATIVE_INFINITY,
            xMin: Number.POSITIVE_INFINITY,
            yMax: Number.NEGATIVE_INFINITY,
            yMin: Number.POSITIVE_INFINITY,
        }
        pointsToCover.forEach(point => {
            if(point.x + PADDING > bounds.xMax) {
                bounds.xMax = point.x + PADDING;
            }
            if(point.x - PADDING < bounds.xMin) {
                bounds.xMin = point.x - PADDING;
            }
            if(point.y + PADDING > bounds.yMax) {
                bounds.yMax = point.y + PADDING;
            }
            if(point.y - PADDING < bounds.yMin) {
                bounds.yMin = point.y - PADDING;
            }
        })
        if((bounds.xMax - bounds.xMin)/(bounds.yMax - bounds.yMin) > this.canvasAspectRatio) {
            let yDelta = (bounds.xMax - bounds.xMin)/this.canvasAspectRatio;
            const yDeltaMissing = yDelta - (bounds.yMax - bounds.yMin);
            bounds.yMax = bounds.yMax + yDeltaMissing/2;
            bounds.yMin = bounds.yMin - yDeltaMissing/2;
        } else {
            let xDelta = (bounds.yMax - bounds.yMin)*this.canvasAspectRatio;
            const xDeltaMissing = xDelta - (bounds.xMax - bounds.xMin);
            bounds.xMax = bounds.xMax + xDeltaMissing/2;
            bounds.xMin = bounds.xMin - xDeltaMissing/2;
        }
        const inflatedBounds = {
            xMax: bounds.xMax,//(bounds.xMax - bounds.xMin) * 0.5,
            xMin: bounds.xMin, //(bounds.xMax - bounds.xMin) * 0.5,
            yMax: bounds.yMax,//(bounds.yMax - bounds.yMin) * 0.5,
            yMin: bounds.yMin,//(bounds.yMax - bounds.yMin) * 0.5,
        }
        return inflatedBounds;
    }
}

let universe = new Universe();
universe.addPlanet(new Planet(20000000, new Vector(-200, 0), new Vector(0, 0.16)));
universe.addPlanet(new Planet(20000000, new Vector(200, 0), new Vector(0, -0.16)));
universe.addPlanet(new Planet(20000000, new Vector(0, 0), new Vector(0.1, 0.1)));
universe.addPlanet(new Planet(30000000, new Vector(100, 700), new Vector(0, 0)));
universe.addPlanet(new Planet(30000000, new Vector(1700, 700), new Vector(0, 0)));
// universe.addPlanet(new Planet(30000000, new Vector(2200, 700), new Vector(0, 0)));
let canvas = new Canvas(1500, 700)

const stopAllPlanets = () => {
    universe.planets.forEach(planet => {
        planet.velocity = new Vector(0,0)
    })
}

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

