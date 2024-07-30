import { SimulationOptions, SimulationRunner } from '../Simulation/Runner';
import { listOfTemplates, randomUniverseTemplate, UniverseTemplate, BodyTemplate } from '../Universe/UniverseTemplates';
import * as Utils from "../Utils/Utils"

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

        const template = listOfTemplates[Math.floor(Math.random()*listOfTemplates.length)];
        this.gControl.value = template.gravitationalConstant.toString();
        this.simulation = new SimulationRunner(DEFAULT_SIMULATION_OPTIONS, htmlCanvas, template, true);

        this.setUpTemplateList();
        this.setupAddBody();
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
            const template = this.simulation.getTemplateDataFromCurrUniverseState();
            console.log("Template:", template);
            listOfTemplates.push(template);
            this.setUpTemplateList();
        });

        this.updateUiComponentsWithOptions(DEFAULT_SIMULATION_OPTIONS);
    }

    setupAddBody() {
        const listContainer = document.getElementById("add-bodies-container") as HTMLDivElement;
        const container = document.createElement("div");
        container.className = "m-1"
        const placeholderMass = 20000;
        const placeholderX = 1000;
        const placeholderY = 1000;
        const placeholderVx = -0.01;
        const placeholderVy = 0.02;

        container.innerHTML = `<div class="input-group mb-1">
                                    <span class="input-group-text">Mass</span>
                                    <input type="text" class="form-control" placeholder="${placeholderMass}" id="mass-input">
                                </div>
                                <div class="input-group mb-1">
                                    <span class="input-group-text">X</span>
                                    <input type="text" class="form-control" placeholder="${placeholderX}" id="x-input">
                                    <span class="input-group-text">Y</span>
                                    <input type="text" class="form-control" placeholder="${placeholderY}" id="y-input">
                                </div>
                                <div class="input-group mb-1">
                                    <span class="input-group-text">Vx</span>
                                    <input type="text" class="form-control" placeholder="${placeholderVx}" id="vx-input">
                                    <span class="input-group-text">Vy</span>
                                    <input type="text" class="form-control" placeholder="${placeholderVy}" id="vy-input">
                                </div>`
        const addButton = document.createElement("button");
        addButton.innerHTML = "Add Body";
        addButton.className = "btn btn-success";
        addButton.onclick = () => {
            const mass = Number.parseFloat((document.getElementById("mass-input") as HTMLInputElement).value);
            const px = Number.parseFloat((document.getElementById("x-input") as HTMLInputElement).value);
            const py = Number.parseFloat((document.getElementById("y-input") as HTMLInputElement).value);
            const vx = Number.parseFloat((document.getElementById("vx-input") as HTMLInputElement).value);
            const vy = Number.parseFloat((document.getElementById("vy-input") as HTMLInputElement).value);
            const parameters: BodyTemplate = {
                mass: !isNaN(mass) ? mass : placeholderMass,
                position: {
                    x: !isNaN(px) ? px : placeholderX,
                    y: !isNaN(py) ? py : placeholderY
                },
                velocity: {
                    x: !isNaN(vx) ? vx : placeholderVx,
                    y: !isNaN(vy) ? vy : placeholderVy
                },
                color: Utils.getRandomColor(),
            }
            this.simulation.addBody(parameters)
        }
        container.appendChild(addButton)

        listContainer.append(container)
    }

    updateUiComponentsWithOptions(simulationOptions: SimulationOptions) {
        this.speedController.value = simulationOptions.speed.toString();
        this.gridController.checked = simulationOptions.showGrid;
        this.trailController.checked = simulationOptions.showTrails;
        this.trackBodiesControl.checked = simulationOptions.trackBodies;
    }

    setupListOfBodies(universe: UniverseTemplate) {
        const listContainer = document.getElementById("bodies-list-container") as HTMLDivElement;
        const activeIds: string[] = [];
        universe.bodies.forEach((body, idx) => {
            let container = document.getElementById(`body-container-${idx}`) as HTMLDivElement
            activeIds.push(`body-container-${idx}`);
            if (container == null) {
                container = document.createElement("div")
                container.setAttribute("id", `body-container-${idx}`)
                listContainer.appendChild(container);
                container.className = "p-2 m-1 body-info-container";
                const textContainer = document.createElement("div");
                textContainer.setAttribute("id", `body-text-container-${idx}`)
                container.appendChild(textContainer);
                let deleteBtn = document.createElement("button")
                deleteBtn.setAttribute("id", `button-delete-${idx}`)
                deleteBtn.innerHTML = `<i class="bi bi-trash"></i>`;
                deleteBtn.className = "btn btn-outline-danger delete-btn"
                deleteBtn.onclick = () => {
                    this.simulation.deleteBody(idx)
                }
                container.appendChild(deleteBtn);
            }
            let deleteBtn = document.getElementById(`button-delete-${idx}`) as HTMLButtonElement
            if(universe.bodies.length <= 1) {
                deleteBtn.classList.add("disabled")
            } else {
                deleteBtn.classList.remove("disabled")
            }
            let textContainer = document.getElementById(`body-text-container-${idx}`) as HTMLDivElement
            textContainer.innerHTML = `Mass: ${body.mass.toFixed(2)}<br>P: (${body.position.x.toFixed(2)},${body.position.y.toFixed(2)})<br>V: (${body.velocity.x.toFixed(2)},${body.velocity.y.toFixed(2)})`
            container.style.backgroundColor = body.color + "80";
        })
        Array.from(listContainer.children).filter(child => activeIds.indexOf(child.id) === -1).forEach(child => listContainer.removeChild(child))
    }

    setUpTemplateList() {
        const container = document.getElementById("template-list-container") as HTMLDivElement;
        container.innerHTML = '';
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

