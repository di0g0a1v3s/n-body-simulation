
function getRandomId() {
    return Math.random() * 100000;
}
const COLLISION_TOLERANCE_PERCENTAGE = 0

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

    static getOrigin(){
        return new Vector(0,0);
    }
}

class RectangleAA {
    constructor(xMin, yMin, xMax, yMax) {
        this.xMin = xMin;
        this.xMax = xMax;
        this.yMin = yMin;
        this.yMax = yMax;
    }

    getCenter(){
        return new Vector((this.xMax + this.xMin)/2, (this.yMax + this.yMin) / 2);
    }
}

class Transform2d {
    constructor(matrix3d) {
        this.matrix3d = matrix3d;
    }

    static getIdentityTransform() {
        return new Transform2d(new Matrix3d(
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ))
    }

    static translation(vector) {
        return new Transform2d(new Matrix3d(
            1, 0, vector.x,
            0, 1, vector.y,
            0, 0, 1
        ))
    }

    static scaleAroundOrigin(scaleFactor) {
        return new Transform2d(new Matrix3d(
            scaleFactor, 0, 0,
            0, scaleFactor, 0,
            0, 0, 1
        ))
    }

    static scaleAroundPoint(scaleFactor, point) {
        // return Transform2d.translation(new Vector(-point.x, -point.y))
        //     .concat(Transform2d.scaleAroundOrigin(scaleFactor))
        //         .concat(Transform2d.translation(point));
        return Transform2d.translation(point)
            .concat(Transform2d.scaleAroundOrigin(scaleFactor))
                .concat(Transform2d.translation(new Vector(-point.x, -point.y)));
    }

    concat(other) {
        return new Transform2d(this.matrix3d.multiplyWith(other.matrix3d))
    }

    transformPoint(point) {
        return new Vector(this.matrix3d.a00 * point.x + this.matrix3d.a01 * point.y + this.matrix3d.a02,
            this.matrix3d.a10 * point.x + this.matrix3d.a11 * point.y + this.matrix3d.a12);
    }

    transformRectangle(rectangle) {
        const topLeft = this.transformPoint(new Vector(rectangle.xMin, rectangle.yMin));
        const bottomRight = this.transformPoint(new Vector(rectangle.xMax, rectangle.yMax));
        return new RectangleAA(topLeft.x, topLeft.y, bottomRight.x, bottomRight.y)
    }
}

class Matrix3d {
    constructor(a00,a01,a02,a10,a11,a12,a20,a21,a22){
        this.a00 = a00;
        this.a01 = a01;
        this.a02 = a02;
        this.a10 = a10;
        this.a11 = a11;
        this.a12 = a12;
        this.a20 = a20;
        this.a21 = a21;
        this.a22 = a22;
    }

    multiplyWith(secondMatrix) {
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

        if(trackBodies || this.currentCameraBounds == null) {
            const pointsToCoverInCamera = universe.planets.map(p => p.position);
            pointsToCoverInCamera.push(new Vector(-10,-10))
            pointsToCoverInCamera.push(new Vector(10,10))
            if(this.currentCameraBounds != null) {
                // pointsToCoverInCamera.push(new Vector(this.currentCameraBounds.xMin, this.currentCameraBounds.yMin))
                // pointsToCoverInCamera.push(new Vector(this.currentCameraBounds.xMax, this.currentCameraBounds.yMax))
            }
            this.currentCameraBounds = this.getCameraBoundsForTrackingBodies(pointsToCoverInCamera)
        } else {
            // console.log(this.currentCameraBounds)
            console.log(this.currentCameraBounds)
            // this.currentCameraBounds = Transform2d.translation(Vector.getOrigin().diff(this.currentCameraBounds.getCenter()))
            //     .concat(Transform2d.translation(universe.planets[0].position))
            //     .transformRectangle(this.currentCameraBounds);
            // this.currentCameraBounds = Transform2d.scaleAroundPoint(1/1.001, universe.planets[0].position).transformRectangle(this.currentCameraBounds);
        }
        
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

    getCameraBoundsForTrackingBodies(pointsToCover) {
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

        return new RectangleAA(inflatedBounds.xMin, inflatedBounds.yMin, inflatedBounds.xMax, inflatedBounds.yMax);
    }
}

let universe = new Universe();
universe.addPlanet(new Planet(20000000, new Vector(-1000, 0), new Vector(0, 0.4)));
universe.addPlanet(new Planet(20000000, new Vector(1000, 0), new Vector(0, -0.4)));
// universe.addPlanet(new Planet(20000000, new Vector(0, 0), new Vector(0.1, 0.1)));
// universe.addPlanet(new Planet(30000000, new Vector(100, 700), new Vector(0, 0)));
// universe.addPlanet(new Planet(30000000, new Vector(1700, 700), new Vector(0, 0)));
universe.addPlanet(new Planet(200000000, new Vector(0, 0), new Vector(0, 0)));
// TODO check why position(0,0) fails
// universe.addPlanet(new Planet(30000000, new Vector(2200, 700), new Vector(0, 0)));

let canvas = new Canvas(1500, 700)

const checkbox = $('#track-bodies')[0]
let trackBodies = checkbox.checked;

checkbox.addEventListener('change', (event) => {
    trackBodies = event.currentTarget.checked
})


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

