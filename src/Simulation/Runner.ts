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
    private updateCount: number;
    currentTemplate: UniverseTemplate;
    constructor(private options: SimulationOptions, private htmlCanvas: HTMLCanvasElement, universeTemplate: UniverseTemplate, setUpInteractions: boolean) {
        this.currentTemplate = universeTemplate;
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


        this.updateCount = 0;
        const simulationLoop = () => {
            const deltaT = 5;
            for(let i = 0; i < this.options.speed; i++) {
                if(this.updateCount % 10 === 0) {
                    this.prevSnapshotsQueue.push(this.universe.getSnapshot());
                }
                this.updateCount++;
                this.universe.updatePositions(deltaT);
            }    
        

            // if(this.universe.getSnapshot().bodies.length < 6 ) {
            //     this.replaceUniverse(randomUniverseTemplate());
            // }
            // this.universe.getSnapshot().bodies.forEach(b1 => {
            //     this.universe.getSnapshot().bodies.forEach(b2 => {
            //         if(b1 !== b2) {
            //             if(Vector.diffBetweenPoints(b1.position, b2.position).magnitudeSquared() > 200000 * b1.radius**2) {
            //                 this.replaceUniverse(randomUniverseTemplate());
            //             }
            //         }
            //     })
            // })
            // if(this.updateCount > 500000) {
            //     console.log("qqq good", this.currentTemplate)
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
        this.updateCount = 0;
        this.currentTemplate = template;
        this.universe = Universe.createFromTemplate(template);
        this.prevSnapshotsQueue = createLimitedQueue(MAX_SNAPSHOTS);
        this.renderer.isFirstFrame = true;
    }

    getTemplateDataFromCurrUniverseState(): UniverseTemplate {
       return this.universe.getTemplateDataFromCurrUniverseState();
    }
}