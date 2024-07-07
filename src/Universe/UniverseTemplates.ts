import { Point } from '../Geometry/Vector';

export type UniverseTemplate = {
    readonly name: string;
    readonly gravitationalConstant: number;
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
    const n = 6//Math.random()*10;
    for(let i = 0; i< n; i++) { 
        bodies.push(randomBodyTemplate())
    }
    const template = {
        name: "Random",
        gravitationalConstant: 0.0001,
        bodies
    }
    return template;
}

function randomBodyTemplate() {
    const ret =  {
        mass: 20000,
        position: {x: Math.random()*4000, y: Math.random()*4000},
        velocity: {x: Math.random()*0.2 - 0.1, y: Math.random()*0.2 - 0.1}, 
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
        gravitationalConstant: 0.0001,
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
        gravitationalConstant: 0.0001,
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
        gravitationalConstant: 0.0001,
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
        "name": "Lagrange Orbit 2",
        "gravitationalConstant": 0.000003,
        "bodies": [
            {
                "mass": 2000,
                "color": "#265C0B",
                "position": {
                    "x": 5.0095811230865985,
                    "y": -766.3223983994834
                },
                "velocity": {
                    "x": 0.002233957335606779,
                    "y": 0.00003930380087324277
                }
            },
            {
                "mass": 2000,
                "color": "#2EF7C8",
                "position": {
                    "x": 661.1498742393701,
                    "y": 387.4996236287127
                },
                "velocity": {
                    "x": -0.0011510167563485803,
                    "y": 0.0019150119027436525
                }
            },
            {
                "mass": 2000,
                "color": "#128866",
                "position": {
                    "x": -666.1594553624413,
                    "y": 378.82277477076616
                },
                "velocity": {
                    "x": -0.001082940579258209,
                    "y": -0.0019543157036168595
                }
            }
        ]
    },{
        "name": "Lagrange Orbit 1",
        "gravitationalConstant": 0.000165,
        "bodies": [
            {
                "mass": 200,
                "color": "#265C0B",
                "position": {
                    "x": 0,
                    "y": p
                },
                "velocity": {
                    "x": -w,
                    "y": 0,
                },
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
                "color": "#128866",
                "position": {
                    "x": p*Math.cos(Math.PI/6),
                    "y": -p*Math.sin(Math.PI/6)
                },
                "velocity": {
                    "x": w*Math.sin(Math.PI/6),
                    "y": w*Math.cos(Math.PI/6)
                },
            }
        ]
    }
    ,{
        "name": "Lagrange Orbit triangle",
        "gravitationalConstant": 0.00010,
        "bodies": [
            {
                "mass": 200,
                "color": "#265C0B",
                "position": {
                    "x": 0,
                    "y": p
                },
                "velocity": {
                    "x": -w,
                    "y": 0,
                },
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
                "color": "#128866",
                "position": {
                    "x": p*Math.cos(Math.PI/6),
                    "y": -p*Math.sin(Math.PI/6)
                },
                "velocity": {
                    "x": w*Math.sin(Math.PI/6),
                    "y": w*Math.cos(Math.PI/6)
                },
            }
        ]
    },
    {
        "name": "Three body book",
        gravitationalConstant: 0.0001,
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
        "name": "3 body longest",
        "gravitationalConstant": 0.0001,
        "bodies": [
            {
                "mass": 40000,
                "color": "#9B13F0",
                "position": {
                    "x": 4321.964522020793,
                    "y": 10314.690864069222
                },
                "velocity": {
                    "x": 0.010294655063058544,
                    "y": 0.013885887471951335
                }
            },
            {
                "mass": 40000,
                "color": "#3542BB",
                "position": {
                    "x": 9897.776878006804,
                    "y": 3450.176362272381
                },
                "velocity": {
                    "x": 0.008629010225863085,
                    "y": -0.028778179088534934
                }
            },
            {
                "mass": 20000,
                "color": "#CD3468",
                "position": {
                    "x": 10944.569715312535,
                    "y": 4215.389512701704
                },
                "velocity": {
                    "x": -0.02990386697520259,
                    "y": 0.03515883234569152
                }
            }
        ]
    }, {
        "name": "asda",
        "gravitationalConstant": 0.0001,
        "bodies": [
            {
                "mass": 200000,
                "position": {
                    "x": 5000,
                    "y": 1500
                },
                "velocity": {
                    "x": 0,
                    "y": -0.03
                },
                "color": "#91684B"
            },
            {
                "mass": 200000,
                "position": {
                    "x": 0,
                    "y": -1500
                },
                "velocity": {
                    "x": 0,
                    "y": 0.03
                },
                "color": "#7B9A86"
            },
            {
                "mass": 200000,
                "position": {
                    "x": -20000,
                    "y": 0
                },
                "velocity": {
                    "x": 0,
                    "y": 0.05
                },
                "color": "#7B9A86"
            }
        ]}, {
            "name": "lasdk",
            "gravitationalConstant": 0.0001,
            "bodies":
            [
            // {
            //     "mass": 20000,
            //     "color": "#820F9D",
            //     "position": {
            //         "x": -244251.43220865514,
            //         "y": 583150.5871192231
            //     },
            //     "velocity": {
            //         "x": -0.018076752411690065,
            //         "y": 0.04202445029562495
            //     }
            // },
            {
                "mass": 20000,
                "color": "#9DF4E9",
                "position": {
                    "x": -95125.2561162027,
                    "y": 31258.781276085414
                },
                "velocity": {
                    "x": 0.026352303868642464,
                    "y": 0.012583756282917882
                }
            },
            {
                "mass": 60000,
                "color": "#F4E99D",
                "position": {
                    "x": -96076.18375132357,
                    "y": 28674.737715670824
                },
                "velocity": {
                    "x": -0.020515623373137854,
                    "y": 0.002880014046207525
                }
            },
            {
                "mass": 20000,
                "color": "#D904D3",
                "position": {
                    "x": -76285.13116543651,
                    "y": 35682.30440263128
                },
                "velocity": {
                    "x": 0.001191081207078517,
                    "y": -0.010540778595408404
                }
            }
        ]}
        
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