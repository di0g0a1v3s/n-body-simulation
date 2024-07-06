import { SimulationOptions, SimulationRunner } from '../Simulation/Runner';
import { listOfTemplates, randomUniverseTemplate } from '../Universe/UniverseTemplates';

const DEFAULT_SIMULATION_OPTIONS: SimulationOptions = {
    speed: 20,
    showGrid: true,
    showTrails: true,
    trackBodies: false,
    gravitationalConstant: 0.0001,
}

export class UiController {

    private simulation: SimulationRunner;
    private speedController: HTMLInputElement;
    private gridController: HTMLInputElement;
    private trailController: HTMLInputElement;
    private trackBodiesControl: HTMLInputElement;
    private gControl: HTMLInputElement;
    private randomUniverseBtn: HTMLButtonElement;

    constructor() {
        const htmlCanvas = document.getElementById("main-canvas") as HTMLCanvasElement;

        htmlCanvas.width = window.innerWidth;
        htmlCanvas.height = window.innerHeight;
        window.addEventListener("resize", () => {
            htmlCanvas.width = window.innerWidth;
            htmlCanvas.height = window.innerHeight;
        })

        // this.setUpTemplateList();


        this.simulation = new SimulationRunner(DEFAULT_SIMULATION_OPTIONS, htmlCanvas, randomUniverseTemplate(), true);

        this.speedController = document.getElementById("speed-control") as HTMLInputElement;
        this.gridController = document.getElementById("show-grid-control") as HTMLInputElement;
        this.trailController = document.getElementById("show-trail-control") as HTMLInputElement;
        this.trackBodiesControl = document.getElementById("track-bodies-control") as HTMLInputElement;
        this.gControl = document.getElementById("gravitational-force-control") as HTMLInputElement;

        this.randomUniverseBtn = document.getElementById("random-template") as HTMLButtonElement;
        

        [this.speedController, this.gridController, this.trailController, this.trackBodiesControl, this.gControl].forEach(input => {
            input.addEventListener("change", () => {
                this.simulation.setOptions({
                    speed: Number.parseInt(this.speedController.value),
                    gravitationalConstant: Number.parseFloat(this.gControl.value),
                    showGrid: this.gridController.checked,
                    showTrails: this.trailController.checked,
                    trackBodies: this.trackBodiesControl.checked,
                });
            })
        })

        this.randomUniverseBtn.addEventListener("click", () => {
            this.simulation.replaceUniverse(randomUniverseTemplate());
        })

        this.updateUiComponentsWithOptions(DEFAULT_SIMULATION_OPTIONS);
    }

    updateUiComponentsWithOptions(simulationOptions: SimulationOptions) {
        this.speedController.value = simulationOptions.speed.toString();
        this.gControl.value = simulationOptions.gravitationalConstant.toString();
        this.gridController.checked = simulationOptions.showGrid;
        this.trailController.checked = simulationOptions.showTrails;
        this.trackBodiesControl.checked = simulationOptions.trackBodies;
    }

    setUpTemplateList() {
        const container = document.getElementById("template-list-container") as HTMLDivElement;
        listOfTemplates.forEach(template => {
            const canvas = document.createElement("canvas");
            container.appendChild(canvas);
            canvas.className="thumbnail-canvas";
            canvas.addEventListener("click", () => {
                this.simulation.replaceUniverse(template);
            })
            canvas.width = 250;
            const runner = new SimulationRunner({
                ...DEFAULT_SIMULATION_OPTIONS,
                showGrid: false,
                trackBodies: true
            }, canvas, template, false);
            setInterval(() => {
                runner.replaceUniverse(template); 
            }, 20000)
        });
    }
}

