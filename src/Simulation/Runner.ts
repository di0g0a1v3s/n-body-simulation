import { Vector } from "../Geometry/Vector";
import { Body, Universe, UniverseSnapshot } from '../Universe/Universe';
import { Camera } from "./Camera";
import { Renderer } from "./Renderer";
import { InteractionHandler } from './InteractionHandler';
import { createLimitedQueue, LimitedQueue } from '../Utils/Utils';
import { Canvas } from "./Canvas";
import { randomUniverseTemplate, UniverseTemplate } from "../Universe/UniverseTemplates";


const MAX_SNAPSHOTS = 3000;

export type SimulationOptions = {
    readonly speed: number;
    readonly showGrid: boolean;
    readonly showTrails: boolean;
    readonly trackBodies: boolean;
    readonly gravitationalConstant: number;
}
export class SimulationRunner {

    private universe: Universe;
    private renderer: Renderer;
    private prevSnapshotsQueue: LimitedQueue<UniverseSnapshot>;
    constructor(private options: SimulationOptions, private htmlCanvas: HTMLCanvasElement, universeTemplate: UniverseTemplate) {

        this.universe = Universe.createFromTemplate(universeTemplate, this.options.gravitationalConstant);
        const camera = new Camera();  
        const canvas = new Canvas(this.htmlCanvas);
        this.renderer = new Renderer(canvas, camera, this.options)
        InteractionHandler.setUpHandlers(camera, canvas)

        this.prevSnapshotsQueue = createLimitedQueue(MAX_SNAPSHOTS);
        
        let previousTimeStamp: number;
        const renderingLoop = (timeStamp: number) => {
            if (previousTimeStamp !== timeStamp) {
                this.renderer.renderUniverse(this.universe.getSnapshot(), this.prevSnapshotsQueue);
            }
            previousTimeStamp = timeStamp;
            window.requestAnimationFrame(renderingLoop);     
        }
        window.requestAnimationFrame(renderingLoop);


        let updateCount = 0;
        let time = (new Date()).getTime();
        const simulationLoop = () => {
            const newTime = (new Date()).getTime()
            for(let i = 0; i < this.options.speed; i++) {
                if(updateCount % 10 === 0) {
                    this.prevSnapshotsQueue.push(this.universe.getSnapshot());
                }
                updateCount++;
                this.universe.updatePositions((newTime - time));
            }
            time = newTime;
            // if(this.universe.getSnapshot().bodies.length < 3 ) {
            //     this.replaceUniverse(randomUniverseTemplate());
            // }
            
            setTimeout(simulationLoop, 0);
        };
        simulationLoop();
    }

    setOptions(options: Partial<SimulationOptions>) {
        this.options = {
            ...this.options,
            ...options
        }
        this.universe.setGravitationalConstant(this.options.gravitationalConstant);
        this.renderer.setOptions(this.options)
    }

    getOptions(): SimulationOptions {
        return this.getOptions();
    }

    replaceUniverse(template: UniverseTemplate) {
        this.universe = Universe.createFromTemplate(template, this.options.gravitationalConstant);
        this.prevSnapshotsQueue = createLimitedQueue(MAX_SNAPSHOTS);
        this.renderer.isFirstFrame = true;

    }
}