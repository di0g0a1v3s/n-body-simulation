import { Point, Vector } from '../Geometry/Vector';
import { Body, Universe } from './Universe';

export type UniverseTemplate = {
    readonly name: string,
    readonly bodies: ReadonlyArray<BodyTemplate>;
}

export type BodyTemplate = {
    readonly position: Point;
    readonly velocity: Point;
    readonly mass: number;
    readonly color: string;
}

export function randomUniverseTemplate() {
    const bodies = [];
    const n = 3//Math.random()*10;
    for(let i = 0; i< n; i++) { 
        bodies.push(randomBodyTemplate())
    }
    // bodies.push({
    //     mass: bodies[0].mass + bodies[1].mass, 
    //     position: {x: -bodies[0].position.x - bodies[1].position.x,y: -bodies[0].position.y - bodies[1].position.y},
    //     velocity: {x: -bodies[0].velocity.x - bodies[1].velocity.x, y: -bodies[0].velocity.y - bodies[1].velocity.y}, 
    //     color: getRandomColor(),
    // })
    const template = {
        name: "Random",
        bodies
    }
    console.log("qqq template", template);
    return template;
}

function randomBodyTemplate() {
    const ret =  {
        mass: 20000,//Math.random()*20000, 
        position: {x: Math.random()*6000 - 3000, y: Math.random()*6000 - 3000},
        velocity: {x: Math.random()*0.1 - 0.05, y: Math.random()*0.1 - 0.05}, 
        color: getRandomColor(),
    }
    return ret;
}

export function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const listOfTemplates: UniverseTemplate[] = [
    {
        name: "Snake",
        bodies: [{
            "mass": 10848.577413945879,
            "position": {
                "x": 134.08023273726462,
                "y": -925.8801764450034
            },
            "velocity": {
                "x": 0.0072864725512328254,
                "y": 0.024995424313972163
            },
            "color": "#936F28"
        },
        {
            "mass": 5145.992937952566,
            "position": {
                "x": -553.217413826721,
                "y": 355.4148278792568
            },
            "velocity": {
                "x": -0.021767750271575428,
                "y": -0.024379570808399677
            },
            "color": "#27355F"
        },
        {
            "mass": 12799.54877418148,
            "position": {
                "x": 682.6855084643726,
                "y": -188.57143500854215
            },
            "velocity": {
                "x": -0.02378615908005484,
                "y": -0.01819441758089965
            },
            "color": "#97C889"
        },
        {
            "mass": 2036.2759719907774,
            "position": {
                "x": -374.73157469180535,
                "y": -629.3834695505548
            },
            "velocity": {
                "x": -0.021961996309499854,
                "y": -0.00447252816771284
            },
            "color": "#828400"
        }]
    },
    {
        "name": "Stairs",
        "bodies": [
            {
                "mass": 17239.93679379871,
                "position": {
                    "x": 138.14405498785527,
                    "y": -947.5499878610765
                },
                "velocity": {
                    "x": 0.0001651054190209937,
                    "y": -0.014348824673816984
                },
                "color": "#7DA09B"
            },
            {
                "mass": 5045.493604216311,
                "position": {
                    "x": -797.0223609507974,
                    "y": 66.88685890426882
                },
                "velocity": {
                    "x": 0.011226458290037544,
                    "y": 0.024386261710477697
                },
                "color": "#9215A0"
            },
            {
                "mass": 1189.827143077582,
                "position": {
                    "x": 889.3432588902476,
                    "y": -678.8566485468799
                },
                "velocity": {
                    "x": 0.02206719015278026,
                    "y": 0.00911628285651668
                },
                "color": "#CF0BED"
            }
        ]
    },
    {
        "name": "Frog",
        "bodies": [
            {
                "mass": 11538.066115904418,
                "position": {
                    "x": 736.506204221294,
                    "y": 178.83440391631166
                },
                "velocity": {
                    "x": 0.020093129162119285,
                    "y": -0.020331654514063727
                },
                "color": "#265C0B"
            },
            {
                "mass": 9613.019897289234,
                "position": {
                    "x": -822.9844969428224,
                    "y": 442.71679691620625
                },
                "velocity": {
                    "x": 0.020499213201985937,
                    "y": -0.0118972237388842
                },
                "color": "#2EF7C8"
            },
            {
                "mass": 21151.08601319365,
                "position": {
                    "x": 86.47829272152842,
                    "y": -621.5512008325179
                },
                "velocity": {
                    "x": -0.04059234236410522,
                    "y": 0.03222887825294793
                },
                "color": "#128866"
            }
        ]
    }
        
]


// this.universe = new Universe(this.options.gravitationalConstant);
// universe.addBody(Body.create(200, new Vector(50, 0), new Vector(0, -0.008)));
// universe.addBody(Body.create(200, new Vector(-50, 0), new Vector(0, 0.008)));

// const x = 0.016
// universe.addBody(Body.create(200, new Vector(50, 0), new Vector(x, x)));
// universe.addBody(Body.create(200, new Vector(-50, 0), new Vector(-x, -x)));
// universe.addBody(Body.create(200, new Vector(0, 50), new Vector(-x, x)));
// universe.addBody(Body.create(200, new Vector(0, -50), new Vector(x, -x)));

// lagrange orbit
// let p = 150
// let w = 0.0113
// universe.addBody(Body.create(200, new Vector(0, p), new Vector(-w, 0)));
// universe.addBody(Body.create(200, new Vector(-p*Math.cos(Math.PI/6), -p*Math.sin(Math.PI/6)), new Vector(w*Math.sin(Math.PI/6), -w*Math.cos(Math.PI/6))));
// universe.addBody(Body.create(200, new Vector(p*Math.cos(Math.PI/6), -p*Math.sin(Math.PI/6)), new Vector(w*Math.sin(Math.PI/6), w*Math.cos(Math.PI/6))));

// lagrange orbit
// let p = 100
// let w = 0.011
// this.universe.addBody(Body.create(200, new Vector(0, p), new Vector(-w, 0)));
// this.universe.addBody(Body.create(200, new Vector(-p*Math.cos(Math.PI/6), -p*Math.sin(Math.PI/6)), new Vector(w*Math.sin(Math.PI/6), -w*Math.cos(Math.PI/6))));
// this.universe.addBody(Body.create(200, new Vector(p*Math.cos(Math.PI/6), -p*Math.sin(Math.PI/6)), new Vector(w*Math.sin(Math.PI/6), w*Math.cos(Math.PI/6))));

// small and big
// universe.addBody(Body.create(400, new Vector(-496.3557156278445, 203.97775132610263), new Vector(-0.0011535626878914993, -0.0004451886338150743)));
// universe.addBody(Body.create(200, new Vector(992.7114312523858, -407.95550264951805), new Vector(0.0023071253757824643, 0.0008903772676305858)));

// solar system
// this.universe.addBody(Body.create(20000, new Vector(0, 0), new Vector(0, 0)));
// this.universe.addBody(Body.create(20, new Vector(500, 0), new Vector(0, -0.06)));
// this.universe.addBody(Body.create(20, new Vector(-500, 0), new Vector(0, 0.06)));
// this.universe.addBody(Body.create(50, new Vector(1000, 0), new Vector(0, -0.044)));