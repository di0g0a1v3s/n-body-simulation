import { Vector } from "../Geometry/Vector";
import { Planet, Universe, UniverseSnapshot } from "../Universe/Universe";
import { Camera } from "./Camera";
import { canvas } from "./Canvas";
import { Renderer } from "./Renderer";
import { InteractionHandler } from './InteractionHandler';
import { createLimitedQueue, LimitedQueue } from "../Utils/Utils";


const SIMULATION_REFRESH_RATE = 100;
const MAX_SNAPSHOTS = 3000;
export abstract class SimulationRunner {
    static startSimulation() {
        let universe = new Universe();
        // universe.addPlanet(Planet.create(200, new Vector(50, 0), new Vector(0, -0.008)));
        // universe.addPlanet(Planet.create(200, new Vector(-50, 0), new Vector(0, 0.008)));

        // const x = 0.016
        // universe.addPlanet(Planet.create(200, new Vector(50, 0), new Vector(x, x)));
        // universe.addPlanet(Planet.create(200, new Vector(-50, 0), new Vector(-x, -x)));
        // universe.addPlanet(Planet.create(200, new Vector(0, 50), new Vector(-x, x)));
        // universe.addPlanet(Planet.create(200, new Vector(0, -50), new Vector(x, -x)));

        // lagrange orbit
        // let p = 150
        // let w = 0.0113
        // universe.addPlanet(Planet.create(200, new Vector(0, p), new Vector(-w, 0)));
        // universe.addPlanet(Planet.create(200, new Vector(-p*Math.cos(Math.PI/6), -p*Math.sin(Math.PI/6)), new Vector(w*Math.sin(Math.PI/6), -w*Math.cos(Math.PI/6))));
        // universe.addPlanet(Planet.create(200, new Vector(p*Math.cos(Math.PI/6), -p*Math.sin(Math.PI/6)), new Vector(w*Math.sin(Math.PI/6), w*Math.cos(Math.PI/6))));

        // lagrange orbit
        let p = 100
        let w = 0.011
        universe.addPlanet(Planet.create(200, new Vector(0, p), new Vector(-w, 0)));
        universe.addPlanet(Planet.create(200, new Vector(-p*Math.cos(Math.PI/6), -p*Math.sin(Math.PI/6)), new Vector(w*Math.sin(Math.PI/6), -w*Math.cos(Math.PI/6))));
        universe.addPlanet(Planet.create(200, new Vector(p*Math.cos(Math.PI/6), -p*Math.sin(Math.PI/6)), new Vector(w*Math.sin(Math.PI/6), w*Math.cos(Math.PI/6))));

        //small and big
        // universe.addPlanet(Planet.create(400, new Vector(-496.3557156278445, 203.97775132610263), new Vector(-0.0011535626878914993, -0.0004451886338150743)));
        // universe.addPlanet(Planet.create(200, new Vector(992.7114312523858, -407.95550264951805), new Vector(0.0023071253757824643, 0.0008903772676305858)));

        // solar system
        // universe.addPlanet(Planet.create(20000, new Vector(0, 0), new Vector(0, 0)));
        // universe.addPlanet(Planet.create(20, new Vector(500, 0), new Vector(0, -0.06)));
        // universe.addPlanet(Planet.create(20, new Vector(-500, 0), new Vector(0, 0.06)));
        // universe.addPlanet(Planet.create(50, new Vector(1000, 0), new Vector(0, -0.044)));
        

        const camera = new Camera();
        const renderer = new Renderer(canvas, camera)
        InteractionHandler.setUpHandlers(camera, canvas)

        const prevSnapshotsQueue: LimitedQueue<UniverseSnapshot> = createLimitedQueue(MAX_SNAPSHOTS);
        
        let previousTimeStamp: number;
        const renderingLoop = (timeStamp: number) => {
            let deltaT = 0
            if(previousTimeStamp != null) {
                deltaT = timeStamp - previousTimeStamp;
            }
            if (previousTimeStamp !== timeStamp) {
                renderer.renderUniverse(universe.getSnapshot(), prevSnapshotsQueue);
            }
            previousTimeStamp = timeStamp;
            window.requestAnimationFrame(renderingLoop);     
        }
        window.requestAnimationFrame(renderingLoop);


        let time = (new Date()).getTime();
        const velocity = 20
        // const intervalMs = 1000/(SIMULATION_REFRESH_RATE);
        const simulationLoop = () => {
            const newTime = (new Date()).getTime()
            prevSnapshotsQueue.push(universe.getSnapshot());
            for(let i = 0; i < velocity; i++) {
                universe.updatePositions((newTime - time));
            }
            time = newTime;
            setTimeout(simulationLoop, 0);
        };
        simulationLoop();
        // setInterval(simulationLoop, intervalMs/velocity)
    }
}