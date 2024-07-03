import { Vector } from "../Geometry/Vector";
import { Planet, Universe } from "../Universe/Universe";
import { Camera } from "./Camera";
import { canvas } from "./Canvas";
import { Renderer } from "./Renderer";
import { InteractionHandler } from './InteractionHandler';

export abstract class SimulationRunner {
    static startSimulation() {
        let universe = new Universe();
        // universe.addPlanet(new Planet(20000000, new Vector(-1000, 0), new Vector(0, 0.4)));
        // universe.addPlanet(new Planet(20000000, new Vector(1000, 0), new Vector(0, -0.4)));
        universe.addPlanet(new Planet(2000, new Vector(100, 100), new Vector(0, 0)));
        universe.addPlanet(new Planet(2000, new Vector(0, 0), new Vector(0, 0)));
        universe.addPlanet(new Planet(2000, new Vector(200, 200), new Vector(0, 0)));

        const camera = new Camera();
        const renderer = new Renderer(canvas, camera)
        InteractionHandler.setUpHandlers(camera, canvas)
        
        let previousTimeStamp: number;
        const step = (timeStamp: number) => {
            let deltaT = 0
            if(previousTimeStamp != null) {
                deltaT = timeStamp - previousTimeStamp;
            }
            if (previousTimeStamp !== timeStamp) {
                universe.updatePositions(deltaT);
                renderer.renderUniverseSnapshot(universe.getSnapshot());
            }
            previousTimeStamp = timeStamp;
            window.requestAnimationFrame(step);     
        }
        window.requestAnimationFrame(step);
    }
}