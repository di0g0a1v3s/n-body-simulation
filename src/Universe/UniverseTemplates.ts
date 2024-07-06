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
    const n = 100//Math.random()*10;
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
        position: {x: Math.random()*20000 - 10000, y: Math.random()*20000 - 10000},
        velocity: {x: Math.random()*0.3 - 0.15, y: Math.random()*0.3 - 0.15}, 
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
let p = 150
let w = 0.0113
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
    },
    {
        "name": "Lagrange Orbit 1",
        "bodies": [
            {
                "mass": 200,
                "position": {
                    "x": 0,
                    "y": p
                },
                "velocity": {
                    "x": -w,
                    "y": 0,
                },
                "color": "#265C0B"
            },
            {
                "mass": 200,
                "position": {
                    "x": -p*Math.cos(Math.PI/6),
                    "y": -p*Math.sin(Math.PI/6)
                },
                "velocity": {
                    "x": w*Math.sin(Math.PI/6),
                    "y": -w*Math.cos(Math.PI/6)
                },
                "color": "#2EF7C8"
            },
            {
                "mass": 200,
                "position": {
                    "x": p*Math.cos(Math.PI/6),
                    "y": -p*Math.sin(Math.PI/6)
                },
                "velocity": {
                    "x": w*Math.sin(Math.PI/6),
                    "y": w*Math.cos(Math.PI/6)
                },
                "color": "#128866"
            }
        ]
    },
    {
        "name": "Three body book",
        "bodies": [
            {
                "mass": 20000,
                "position": {
                    "x": 2285.697884882039,
                    "y": -2165.3378701675547
                },
                "velocity": {
                    "x": -0.023198967868412315,
                    "y": -0.038271135416564975
                },
                "color": "#C601FE"
            },
            {
                "mass": 20000,
                "position": {
                    "x": -2203.488887004943,
                    "y": -1844.364885525506
                },
                "velocity": {
                    "x": 0.01524765154938501,
                    "y": -0.0418760238895142
                },
                "color": "#D201C7"
            },
            {
                "mass": 20000,
                "position": {
                    "x": -1925.0875046931167,
                    "y": -654.1305214909098
                },
                "velocity": {
                    "x": 0.04573197052105571,
                    "y": 0.009737909301543127
                },
                "color": "#1AB31C"
            },
            {
                "mass": 20000,
                "position": {
                    "x": -583.0516230413746,
                    "y": -2296.470371429489
                },
                "velocity": {
                    "x": 0.019802198357185594,
                    "y": -0.025779872261537908
                },
                "color": "#7C20AA"
            },
            {
                "mass": 20000,
                "position": {
                    "x": 2997.9414607130275,
                    "y": 237.71726042868067
                },
                "velocity": {
                    "x": 0.004982685719059153,
                    "y": 0.030130062055826953
                },
                "color": "#94E237"
            }
        ]
    }, {
        "name": "3 body ephemeral",
        "bodies": [
            {
                "mass": 20000,
                "position": {
                    "x": 1976.556214881366,
                    "y": -968.5023309690464
                },
                "velocity": {
                    "x": -0.03222196477083887,
                    "y": -0.037978525184731486
                },
                "color": "#91684B"
            },
            {
                "mass": 20000,
                "position": {
                    "x": -377.03376490471874,
                    "y": 2366.36510123079
                },
                "velocity": {
                    "x": -0.02516578787220738,
                    "y": 0.016647368016529884
                },
                "color": "#7B9A86"
            },
            {
                "mass": 20000,
                "position": {
                    "x": -2749.7106248157543,
                    "y": -832.923730689401
                },
                "velocity": {
                    "x": -0.017747199335546207,
                    "y": 0.022207018278801935
                },
                "color": "#253FD3"
            },
            {
                "mass": 20000,
                "position": {
                    "x": -508.9298345199895,
                    "y": 1736.0519955555455
                },
                "velocity": {
                    "x": 0.03684268584658583,
                    "y": 0.033410129033434766
                },
                "color": "#BEEA6E"
            },
            {
                "mass": 20000,
                "position": {
                    "x": -1251.8014275325847,
                    "y": 828.9435306161595
                },
                "velocity": {
                    "x": 0.04623572973464676,
                    "y": -0.028911741031511198
                },
                "color": "#CD3468"
            }
        ]
    }
        
]


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