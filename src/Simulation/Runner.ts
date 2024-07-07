import { Vector } from "../Geometry/Vector";
import { Universe, UniverseSnapshot } from '../Universe/Universe';
import { Camera } from "./Camera";
import { Renderer } from "./Renderer";
import { InteractionHandler } from './InteractionHandler';
import { createLimitedQueue, LimitedQueue } from '../Utils/Utils';
import { Canvas } from "./Canvas";
import { UniverseTemplate } from "../Universe/UniverseTemplates";


const MAX_SNAPSHOTS = 3000;

export type SimulationOptions = {
    readonly speed: number;
    readonly showGrid: boolean;
    readonly showTrails: boolean;
    readonly trackBodies: boolean;
}
export class SimulationRunner {

    private universe: Universe;
    private renderer: Renderer;
    private prevSnapshotsQueue: LimitedQueue<UniverseSnapshot>;
    private onFrameCallbacks: (() => void)[] = [];
    constructor(private options: SimulationOptions, private htmlCanvas: HTMLCanvasElement, universeTemplate: UniverseTemplate, setUpInteractions: boolean) {

        this.universe = Universe.createFromTemplate(universeTemplate);
        const camera = new Camera();  
        const canvas = new Canvas(this.htmlCanvas);
        this.renderer = new Renderer(canvas, camera, this.options)
        if(setUpInteractions) {
            InteractionHandler.setUpHandlers(camera, canvas)
        }

        this.prevSnapshotsQueue = createLimitedQueue(MAX_SNAPSHOTS);
        
        let previousTimeStamp: number;
        const renderingLoop = (timeStamp: number) => {
            if (previousTimeStamp !== timeStamp) {
                this.renderer.renderUniverse(this.universe.getSnapshot(), this.prevSnapshotsQueue);
            }
            previousTimeStamp = timeStamp;
            window.requestAnimationFrame(renderingLoop);
            this.onFrameCallbacks.forEach(cb => cb());   
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

    onFrame(cb: () => void) {
        this.onFrameCallbacks.push(cb)
    }

    setOptions(options: Partial<SimulationOptions>) {
        this.options = {
            ...this.options,
            ...options
        }
        this.renderer.setOptions(this.options)
    }

    overrideGravitationalConstant(g: number) {
        this.universe.setGravitationalConstant(g);
    }

    getOptions(): SimulationOptions {
        return this.getOptions();
    }

    replaceUniverse(template: UniverseTemplate) {
        this.universe = Universe.createFromTemplate(template);
        this.prevSnapshotsQueue = createLimitedQueue(MAX_SNAPSHOTS);
        this.renderer.isFirstFrame = true;
    }

    getTemplateDataFromCurrUniverseState(): UniverseTemplate {
       return this.universe.getTemplateDataFromCurrUniverseState();
    }
}