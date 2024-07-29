import { Point, Vector } from '../Geometry/Vector';
import * as Utils from "../Utils/Utils";

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
    const n = 4;
    for(let i = 0; i< n; i++) { 
        bodies.push(randomBodyTemplate())
    }
    let centerMass = new Vector(0,0);
    let centerMassVelocity = new Vector(0,0);
    bodies.forEach(b => 
        centerMassVelocity = centerMassVelocity.add(Vector.fromPoint(b.velocity).scalarMultiplication(b.mass))
    )
    bodies.forEach(b => 
        centerMass = centerMass.add(Vector.fromPoint(b.position).scalarMultiplication(b.mass))
    )
    const oneOverTotalMass = 1/bodies.reduce((mass, b) => mass + b.mass, 0)
    centerMassVelocity = centerMassVelocity.scalarMultiplication(oneOverTotalMass)
    centerMass = centerMass.scalarMultiplication(oneOverTotalMass)
    const bodiesNormalized = bodies.map(
        b => ({
                ...b, 
                velocity: {
                    x: Vector.fromPoint(b.velocity).diff(centerMassVelocity).x, 
                    y: Vector.fromPoint(b.velocity).diff(centerMassVelocity).y
                },
                position: {
                    x: Vector.fromPoint(b.position).diff(centerMass).x, 
                    y: Vector.fromPoint(b.position).diff(centerMass).y
                },
            })
        )
    centerMassVelocity = new Vector(0,0);
    bodiesNormalized.forEach(b => centerMassVelocity.add(Vector.fromPoint(b.velocity)))
    const template = {
        name: "Random",
        gravitationalConstant: 0.0001,
        bodies: bodiesNormalized
    }
    return template;
}

function randomBodyTemplate() {
    const ret =  {
        mass: 20000,
        position: {x: Math.random()*4000, y: Math.random()*4000},
        velocity: {x: Math.random()*0.1 - 0.05, y: Math.random()*0.1 - 0.05}, 
        color: Utils.getRandomColor(),
    }
    return ret;
}

let p = 150
let w = 0.0113

export const listOfTemplates: UniverseTemplate[] = [
    {
        name: "2B-1",
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
        "name": "2B-2",
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
        "name": "2B-3",
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
        "name": "3B-1",
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
        "name": "3B-2",
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
        "name": "3B-3",
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
        "name": "3B-4",
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
        "name": "3B-5",
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
        "name": "3B-6",
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
        ]}, 
        {
            "name": "3B-7",
            "gravitationalConstant": 0.0001,
            "bodies": [
                {
                    "mass": 20000,
                    "position": {
                        "x": 1992.517909869452,
                        "y": 765.3544736411328
                    },
                    "velocity": {
                        "x": -0.018669007751342524,
                        "y": 0.04057466420667173
                    },
                    "color": "#FCEA8D"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 2853.6924861042808,
                        "y": 2691.929724971163
                    },
                    "velocity": {
                        "x": 0.0365166399427725,
                        "y": -0.027706560113965287
                    },
                    "color": "#364918"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 1275.4968518278806,
                        "y": 726.5720121834631
                    },
                    "velocity": {
                        "x": -0.0032823916187227006,
                        "y": -0.026112516026802514
                    },
                    "color": "#E3FBFE"
                }
            ]
        },
        {
            "name": "3B-8",
            "gravitationalConstant": 0.0001,
            "bodies": [
                {
                    "mass": 20000,
                    "position": {
                        "x": 3637.6275015369793,
                        "y": 3367.7548972895142
                    },
                    "velocity": {
                        "x": -0.003874286574997221,
                        "y": -0.036748534420335544
                    },
                    "color": "#FDE511"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 634.2602560931416,
                        "y": 2224.316449832225
                    },
                    "velocity": {
                        "x": 0.02078904006422584,
                        "y": 0.017161507185227243
                    },
                    "color": "#708E33"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 1902.60669847833,
                        "y": 3651.4924410904596
                    },
                    "velocity": {
                        "x": -0.016080966282761587,
                        "y": 0.04671213966543908
                    },
                    "color": "#E43AD2"
                }
            ]
        },
        
        {
            "name": "3B-9",
            "gravitationalConstant": 0.0001,
            "bodies": [
                {
                    "mass": 20000,
                    "position": {
                        "x": 1488.8266080573383,
                        "y": 546.8240369493244
                    },
                    "velocity": {
                        "x": 0.02134657851753026,
                        "y": -0.005789364619851953
                    },
                    "color": "#B569F5"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 2781.9028443827783,
                        "y": 442.90444930943715
                    },
                    "velocity": {
                        "x": 0.034349173015922926,
                        "y": 0.03842383818310868
                    },
                    "color": "#4072D5"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 2075.7470218286585,
                        "y": 2977.9569631742697
                    },
                    "velocity": {
                        "x": -0.029041361067950924,
                        "y": 0.024629583407084363
                    },
                    "color": "#303AAB"
                }
            ]
        },
        {
            "name": "3B-10",
            "gravitationalConstant": 0.0001,
            "bodies": [
                {
                    "mass": 20000,
                    "position": {
                        "x": 2184.6169000635127,
                        "y": 328.7304718310384
                    },
                    "velocity": {
                        "x": 0.03168079032388185,
                        "y": 0.046761693975421736
                    },
                    "color": "#04F671"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 1631.9294097467214,
                        "y": 1087.3523943969722
                    },
                    "velocity": {
                        "x": -0.011116763277786365,
                        "y": 0.009703549686475223
                    },
                    "color": "#AA9A2D"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 3907.0573043412837,
                        "y": 2689.9860177331575
                    },
                    "velocity": {
                        "x": 0.03331519977306896,
                        "y": -0.02694066453662025
                    },
                    "color": "#0B6D4B"
                }
            ]
        },
        
        {
            "name": "3B-11",
            "gravitationalConstant": 0.0001,
            "bodies": [
                {
                    "mass": 20000,
                    "position": {
                        "x": 3568.436124622484,
                        "y": 3736.1214367582106
                    },
                    "velocity": {
                        "x": 0.04784930874654705,
                        "y": -0.044701610834039035
                    },
                    "color": "#DC3E43"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 1618.750149190494,
                        "y": 2769.3113922719226
                    },
                    "velocity": {
                        "x": -0.04073688084841287,
                        "y": -0.023889912461690123
                    },
                    "color": "#8D7E54"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 593.4687612424741,
                        "y": 809.4135829385598
                    },
                    "velocity": {
                        "x": 0.04831122074305941,
                        "y": -0.00609830953119541
                    },
                    "color": "#BDD2A0"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 2477.8967866874177,
                        "y": 2440.9375209442537
                    },
                    "velocity": {
                        "x": -0.00033808361915681207,
                        "y": 0.033871688957955115
                    },
                    "color": "#727D05"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 733.054860406651,
                        "y": 3101.3887913421117
                    },
                    "velocity": {
                        "x": -0.04080988173048468,
                        "y": 0.014911812163882487
                    },
                    "color": "#0CC57E"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 1632.3141922318082,
                        "y": 737.682173534381
                    },
                    "velocity": {
                        "x": 0.03426213939525283,
                        "y": 0.016911367503657515
                    },
                    "color": "#14E36D"
                }
            ]
        },
        
        {
            "name": "3B-12",
            "gravitationalConstant": 0.0001,
            "bodies": [
                {
                    "mass": 20000,
                    "position": {
                        "x": 40.175617257619706,
                        "y": -1294.9410563831154
                    },
                    "velocity": {
                        "x": 0.005578056824648955,
                        "y": -0.012515788777820919
                    },
                    "color": "#1838B5"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 566.8910729324637,
                        "y": -548.6401838829297
                    },
                    "velocity": {
                        "x": -0.04136208719974804,
                        "y": 0.009655134527497208
                    },
                    "color": "#5A28E5"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -607.0666901900843,
                        "y": 1843.5812402660451
                    },
                    "velocity": {
                        "x": 0.035784030375099085,
                        "y": 0.0028606542503237242
                    },
                    "color": "#092D22"
                }
            ]
        },
        
        {
            "name": "3B-13",
            "gravitationalConstant": 0.0001,
            "bodies": [
                {
                    "mass": 20000,
                    "position": {
                        "x": -412.77178719363746,
                        "y": 570.6878991140634
                    },
                    "velocity": {
                        "x": -0.04043017312467032,
                        "y": 0.015943162344808186
                    },
                    "color": "#AA90BC"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 264.18547677860124,
                        "y": 1453.9454906613532
                    },
                    "velocity": {
                        "x": 0.010598952836933509,
                        "y": -0.010034532394683557
                    },
                    "color": "#29C6F8"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 148.58631041503622,
                        "y": -2024.633389775417
                    },
                    "velocity": {
                        "x": 0.02983122028773682,
                        "y": -0.005908629950124625
                    },
                    "color": "#D3FB91"
                }
            ]
        },
        
        {
            "name": "3B-14",
            "gravitationalConstant": 0.0001,
            "bodies": [
                {
                    "mass": 20000,
                    "position": {
                        "x": -252.43409883226764,
                        "y": -818.209220506754
                    },
                    "velocity": {
                        "x": 0.0069946336351759675,
                        "y": 0.028578808019364205
                    },
                    "color": "#BDE635"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -1753.8477952192754,
                        "y": 2112.2276603522396
                    },
                    "velocity": {
                        "x": -0.009738184849924503,
                        "y": 0.005623317954961352
                    },
                    "color": "#ECD923"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 2006.2818940515438,
                        "y": -1294.018439845487
                    },
                    "velocity": {
                        "x": 0.0027435512147485214,
                        "y": -0.034202125974325565
                    },
                    "color": "#E8BBD9"
                }
            ]
        },
        
        {
            "name": "3B-15",
            "gravitationalConstant": 0.0001,
            "bodies": [
                {
                    "mass": 20000,
                    "position": {
                        "x": -2086.3164394439154,
                        "y": 575.9530906420823
                    },
                    "velocity": {
                        "x": -0.020228033244370603,
                        "y": -0.021093754681191127
                    },
                    "color": "#F8BCB9"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 1001.596740640452,
                        "y": 206.99314851023337
                    },
                    "velocity": {
                        "x": 0.03571722283069195,
                        "y": 0.02198651345217038
                    },
                    "color": "#19BF5F"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 1084.719698803462,
                        "y": -782.9462391523157
                    },
                    "velocity": {
                        "x": -0.015489189586321343,
                        "y": -0.0008927587709792496
                    },
                    "color": "#CEFCCD"
                }
            ]
        },
        
        {
            "name": "3B-16",
            "gravitationalConstant": 0.0001,
            "bodies": [
                {
                    "mass": 20000,
                    "position": {
                        "x": -801.1883438388347,
                        "y": 188.49414932380705
                    },
                    "velocity": {
                        "x": 0.041421693198502495,
                        "y": -0.01712407680679156
                    },
                    "color": "#1E50B1"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -963.2815382284045,
                        "y": -671.0307560889665
                    },
                    "velocity": {
                        "x": -0.01908447586789718,
                        "y": -0.009003640577133855
                    },
                    "color": "#2BBF47"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 1764.4698820672388,
                        "y": 482.5366067651594
                    },
                    "velocity": {
                        "x": -0.022337217330605307,
                        "y": 0.026127717383925414
                    },
                    "color": "#809C84"
                }
            ]
        },
        
        {
            "name": "3B-17",
            "gravitationalConstant": 0.0001,
            "bodies": [
                {
                    "mass": 20000,
                    "position": {
                        "x": -709.8941590380969,
                        "y": -131.52054041923407
                    },
                    "velocity": {
                        "x": 0.049055559152956896,
                        "y": 0.004767909558990395
                    },
                    "color": "#B8D345"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 895.231098647861,
                        "y": 831.2258014635245
                    },
                    "velocity": {
                        "x": -0.04458095917289878,
                        "y": 0.022662953973981118
                    },
                    "color": "#BBCA1C"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -185.3369396097646,
                        "y": -699.7052610442911
                    },
                    "velocity": {
                        "x": -0.004474599980058112,
                        "y": -0.027430863532971514
                    },
                    "color": "#3A7CB8"
                }
            ]
        },
        
        {
            "name": "3B-18",
            "gravitationalConstant": 0.0001,
            "bodies": [
                {
                    "mass": 20000,
                    "position": {
                        "x": 470.567897044132,
                        "y": -195.792616752271
                    },
                    "velocity": {
                        "x": -0.048462828313590126,
                        "y": -0.01174487708437861
                    },
                    "color": "#4B86D3"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -801.2821556308938,
                        "y": 1100.81859076039
                    },
                    "velocity": {
                        "x": 0.02445510316931583,
                        "y": 0.04045921276102687
                    },
                    "color": "#39B758"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 330.71425858676184,
                        "y": -905.0259740081192
                    },
                    "velocity": {
                        "x": 0.024007725144274294,
                        "y": -0.028714335676648252
                    },
                    "color": "#B3D1FE"
                }
            ]
        },
        
        {
            "name": "3B-19",
            "gravitationalConstant": 0.0001,
            "bodies": [
                {
                    "mass": 20000,
                    "position": {
                        "x": -292.997350718887,
                        "y": -667.337729918775
                    },
                    "velocity": {
                        "x": 0.013573329709639738,
                        "y": 0.03556391560529919
                    },
                    "color": "#BB8364"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 1881.1851543994912,
                        "y": 109.53382390884144
                    },
                    "velocity": {
                        "x": -0.0012157453632813744,
                        "y": 0.0028811872046161525
                    },
                    "color": "#39E570"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -1588.1878036806047,
                        "y": 557.8039060099327
                    },
                    "velocity": {
                        "x": -0.012357584346358363,
                        "y": -0.03844510280991534
                    },
                    "color": "#B86C53"
                }
            ]
        },
        
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