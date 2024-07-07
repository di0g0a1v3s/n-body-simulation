import { SimulationOptions, SimulationRunner } from '../Simulation/Runner';
import { listOfTemplates, randomUniverseTemplate, UniverseTemplate } from '../Universe/UniverseTemplates';

const DEFAULT_SIMULATION_OPTIONS: SimulationOptions = {
    speed: 20,
    showGrid: true,
    showTrails: true,
    trackBodies: false,
}

export class UiController {

    private simulation: SimulationRunner;
    private speedController: HTMLInputElement;
    private gridController: HTMLInputElement;
    private trailController: HTMLInputElement;
    private trackBodiesControl: HTMLInputElement;
    private gControl: HTMLInputElement;

    constructor() {
        const htmlCanvas = document.getElementById("main-canvas") as HTMLCanvasElement;

        htmlCanvas.width = window.innerWidth;
        htmlCanvas.height = window.innerHeight;
        window.addEventListener("resize", () => {
            htmlCanvas.width = window.innerWidth;
            htmlCanvas.height = window.innerHeight;
        })


        this.speedController = document.getElementById("speed-control") as HTMLInputElement;
        this.gridController = document.getElementById("show-grid-control") as HTMLInputElement;
        this.trailController = document.getElementById("show-trail-control") as HTMLInputElement;
        this.trackBodiesControl = document.getElementById("track-bodies-control") as HTMLInputElement;
        this.gControl = document.getElementById("gravitational-force-control") as HTMLInputElement;

        const template = randomUniverseTemplate();
        this.gControl.value = template.gravitationalConstant.toString();
        this.simulation = new SimulationRunner(DEFAULT_SIMULATION_OPTIONS, htmlCanvas, template, true);

        this.setUpTemplateList();
        this.simulation.onFrame(() => {
            this.setupListOfBodies(this.simulation.getTemplateDataFromCurrUniverseState());
        });
        

        [this.speedController, this.gridController, this.trailController, this.trackBodiesControl].forEach(input => {
            input.addEventListener("change", () => {
                this.simulation.setOptions({
                    speed: Number.parseInt(this.speedController.value),
                    showGrid: this.gridController.checked,
                    showTrails: this.trailController.checked,
                    trackBodies: this.trackBodiesControl.checked,
                });
            })
        })

        this.gControl.addEventListener("change", () => {
            this.simulation.overrideGravitationalConstant(Number.parseFloat(this.gControl.value))
        });

        (document.getElementById("random-template") as HTMLButtonElement).addEventListener("click", () => {
            const template = randomUniverseTemplate();
            this.gControl.value = template.gravitationalConstant.toString();
            this.simulation.replaceUniverse(template);
        });

        (document.getElementById("save-template") as HTMLButtonElement).addEventListener("click", () => {
            console.log("Template:", this.simulation.getTemplateDataFromCurrUniverseState());
        });

        this.updateUiComponentsWithOptions(DEFAULT_SIMULATION_OPTIONS);

        (window as any).setUniverse = (str: string) => {
            const template = JSON.parse(str) as UniverseTemplate;
            this.gControl.value = template.gravitationalConstant.toString();
            this.simulation.replaceUniverse(template);
        }
    }

    updateUiComponentsWithOptions(simulationOptions: SimulationOptions) {
        this.speedController.value = simulationOptions.speed.toString();
        this.gridController.checked = simulationOptions.showGrid;
        this.trailController.checked = simulationOptions.showTrails;
        this.trackBodiesControl.checked = simulationOptions.trackBodies;
    }

    setupListOfBodies(universe: UniverseTemplate) {
        const listContainer = document.getElementById("bodies-list-container") as HTMLDivElement;
        listContainer.innerHTML = ""
        universe.bodies.forEach(body => {
            const container = document.createElement("div")
            container.innerHTML = `Mass: ${body.mass.toFixed(2)}<br>P: (${body.position.x.toFixed(2)},${body.position.y.toFixed(2)})<br>V: (${body.velocity.x.toFixed(2)},${body.velocity.y.toFixed(2)})`
            container.style.backgroundColor = body.color + "80";
            container.style.borderRadius = "5px";
            // container.style.background
            container.className = "p-2 m-1"
            listContainer.appendChild(container);
        })
    }

    setUpTemplateList() {
        const container = document.getElementById("template-list-container") as HTMLDivElement;
        listOfTemplates.forEach(template => {
            // this.buildTemplateThumbnail(template);
            const btn = document.createElement("button")
            btn.className = "btn btn-success m-1";
            btn.innerHTML = template.name;
            btn.addEventListener("click", () => {
                this.gControl.value = template.gravitationalConstant.toString();
                this.simulation.replaceUniverse(template);
            })
            container.append(btn)
        });
    }

    private buildTemplateThumbnail(template: UniverseTemplate) {
        const container = document.getElementById("template-list-container") as HTMLDivElement;
        const canvas = document.createElement("canvas");
            container.appendChild(canvas);
            canvas.className="thumbnail-canvas";
            canvas.addEventListener("click", () => {
                this.gControl.value = template.gravitationalConstant.toString();
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
    }
}

