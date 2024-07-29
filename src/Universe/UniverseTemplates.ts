import { Point } from '../Geometry/Vector';
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
    const n = Math.ceil(Math.random()*5);
    for(let i = 0; i< n; i++) { 
        const body = randomBodyTemplate()
        bodies.push(body)
        // bodies.push({
        //     mass: body.mass,
        //     position: {x: -body.position.x, y: -body.position.y},
        //     velocity: {x: -body.velocity.x, y: -body.velocity.y}, 
        //     color: Utils.getRandomColor(),
        // })
    }
    // let centerMass = new Vector(0,0);
    // let centerMassVelocity = new Vector(0,0);
    // bodies.forEach(b => 
    //     centerMassVelocity = centerMassVelocity.add(Vector.fromPoint(b.velocity).scalarMultiplication(b.mass))
    // )
    // bodies.forEach(b => 
    //     centerMass = centerMass.add(Vector.fromPoint(b.position).scalarMultiplication(b.mass))
    // )
    // const oneOverTotalMass = 1/bodies.reduce((mass, b) => mass + b.mass, 0)
    // centerMassVelocity = centerMassVelocity.scalarMultiplication(oneOverTotalMass)
    // centerMass = centerMass.scalarMultiplication(oneOverTotalMass)
    // const bodiesNormalized = bodies.map(
    //     b => ({
    //             ...b, 
    //             velocity: {
    //                 x: Vector.fromPoint(b.velocity).diff(centerMassVelocity).x, 
    //                 y: Vector.fromPoint(b.velocity).diff(centerMassVelocity).y
    //             },
    //             position: {
    //                 x: Vector.fromPoint(b.position).diff(centerMass).x, 
    //                 y: Vector.fromPoint(b.position).diff(centerMass).y
    //             },
    //         })
    //     )
    // centerMassVelocity = new Vector(0,0);
    // bodiesNormalized.forEach(b => centerMassVelocity.add(Vector.fromPoint(b.velocity)))
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
    }, 
    {
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
    }, 
        {
            "name": "3B-6",
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
            "name": "3B-7",
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
            "name": "3B-8",
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
            "name": "3B-9",
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
            "name": "3B-10",
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
            "name": "3B-11",
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
        {
            "name": "4B-1",
            "gravitationalConstant": 0.0001,
            "bodies": [
                {
                    "mass": 20000,
                    "position": {
                        "x": 891.6632883291022,
                        "y": 3980.8909705535775
                    },
                    "velocity": {
                        "x": 0.025608051118972117,
                        "y": 0.02092652967455874
                    },
                    "color": "#E1223A"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -891.6632883291022,
                        "y": -3980.8909705535775
                    },
                    "velocity": {
                        "x": -0.025608051118972117,
                        "y": -0.02092652967455874
                    },
                    "color": "#1931ED"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 3361.214583576066,
                        "y": 3088.9576879366523
                    },
                    "velocity": {
                        "x": -0.020390732894171395,
                        "y": -0.019498124699711974
                    },
                    "color": "#1DB0B1"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -3361.214583576066,
                        "y": -3088.9576879366523
                    },
                    "velocity": {
                        "x": 0.020390732894171395,
                        "y": 0.019498124699711974
                    },
                    "color": "#EF9178"
                }
            ]
        },
        {
            "name": "4B-2",
            "gravitationalConstant": 0.0001,
            "bodies": [
                {
                    "mass": 20000,
                    "position": {
                        "x": 3640.904711127118,
                        "y": 3058.0582003733234
                    },
                    "velocity": {
                        "x": -0.01190611965893322,
                        "y": -0.012492397324484969
                    },
                    "color": "#62B865"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -3640.904711127118,
                        "y": -3058.0582003733234
                    },
                    "velocity": {
                        "x": 0.01190611965893322,
                        "y": 0.012492397324484969
                    },
                    "color": "#9E8378"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 2155.770998668889,
                        "y": 3614.7675061186233
                    },
                    "velocity": {
                        "x": -0.008264839441149086,
                        "y": 0.03886094609997155
                    },
                    "color": "#A0CC0C"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -2155.770998668889,
                        "y": -3614.7675061186233
                    },
                    "velocity": {
                        "x": 0.008264839441149086,
                        "y": -0.03886094609997155
                    },
                    "color": "#8C1964"
                }
            ]
        },
        {
            "name": "4B-3",
            "gravitationalConstant": 0.0001,
            "bodies": [
                {
                    "mass": 20000,
                    "position": {
                        "x": 177.28051060481232,
                        "y": 88.28272293028672
                    },
                    "velocity": {
                        "x": -0.03407034695968323,
                        "y": 0.044596289065394396
                    },
                    "color": "#71543B"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -177.28051060481232,
                        "y": -88.28272293028672
                    },
                    "velocity": {
                        "x": 0.03407034695968323,
                        "y": -0.044596289065394396
                    },
                    "color": "#AFE422"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 2724.7565452152094,
                        "y": 2457.5577081927077
                    },
                    "velocity": {
                        "x": -0.017568393043495646,
                        "y": 0.03971501793221642
                    },
                    "color": "#A73559"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -2724.7565452152094,
                        "y": -2457.5577081927077
                    },
                    "velocity": {
                        "x": 0.017568393043495646,
                        "y": -0.03971501793221642
                    },
                    "color": "#9F2A06"
                }
            ]
        },
        {
            "name": "4B-4",
            "gravitationalConstant": 0.0001,
            "bodies": [
                {
                    "mass": 20000,
                    "position": {
                        "x": 1268.1602868526136,
                        "y": 3707.007903459789
                    },
                    "velocity": {
                        "x": 0.007341327465382873,
                        "y": -0.04985718132646795
                    },
                    "color": "#BFB4F2"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -1268.1602868526136,
                        "y": -3707.007903459789
                    },
                    "velocity": {
                        "x": -0.007341327465382873,
                        "y": 0.04985718132646795
                    },
                    "color": "#3B7FA1"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 610.9612444243533,
                        "y": 3680.970603719609
                    },
                    "velocity": {
                        "x": 0.013027255881220973,
                        "y": 0.019930553146882232
                    },
                    "color": "#5CE3D1"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -610.9612444243533,
                        "y": -3680.970603719609
                    },
                    "velocity": {
                        "x": -0.013027255881220973,
                        "y": -0.019930553146882232
                    },
                    "color": "#891891"
                }
            ]
        },
        
        {
            "name": "4B-5",
            "gravitationalConstant": 0.0001,
            "bodies": [
                {
                    "mass": 20000,
                    "position": {
                        "x": 3785.1216141302,
                        "y": 3520.0880527034
                    },
                    "velocity": {
                        "x": 0.02642036456757209,
                        "y": 0.00950902377881202
                    },
                    "color": "#01CB2A"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -3785.1216141302,
                        "y": -3520.0880527034
                    },
                    "velocity": {
                        "x": -0.02642036456757209,
                        "y": -0.00950902377881202
                    },
                    "color": "#B03E1F"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 2463.5855933124626,
                        "y": 45.91722896882189
                    },
                    "velocity": {
                        "x": -0.007464504812483286,
                        "y": 0.0256803355954016
                    },
                    "color": "#7F7C11"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -2463.5855933124626,
                        "y": -45.91722896882189
                    },
                    "velocity": {
                        "x": 0.007464504812483286,
                        "y": -0.0256803355954016
                    },
                    "color": "#C019D1"
                }
            ]
        },
        
        {
            "name": "6B-1",
            "gravitationalConstant": 0.0001,
            "bodies": [
                {
                    "mass": 20000,
                    "position": {
                        "x": 1804.7096517630105,
                        "y": 2604.0071729241845
                    },
                    "velocity": {
                        "x": -0.04564907708930808,
                        "y": -0.02201886278734897
                    },
                    "color": "#9C97F8"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -1804.7096517630105,
                        "y": -2604.0071729241845
                    },
                    "velocity": {
                        "x": 0.04564907708930808,
                        "y": 0.02201886278734897
                    },
                    "color": "#D9408D"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 3121.8178666603453,
                        "y": 516.3251017207626
                    },
                    "velocity": {
                        "x": -0.026405932258366606,
                        "y": 0.04316101013975142
                    },
                    "color": "#BA632E"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -3121.8178666603453,
                        "y": -516.3251017207626
                    },
                    "velocity": {
                        "x": 0.026405932258366606,
                        "y": -0.04316101013975142
                    },
                    "color": "#2ADBD9"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 3950.655338470112,
                        "y": 3920.2630832550235
                    },
                    "velocity": {
                        "x": 0.006811780820537419,
                        "y": -0.004463587746573808
                    },
                    "color": "#A3073A"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -3950.655338470112,
                        "y": -3920.2630832550235
                    },
                    "velocity": {
                        "x": -0.006811780820537419,
                        "y": 0.004463587746573808
                    },
                    "color": "#E00ABC"
                }
            ]
        },
        {
            "name": "6B-2",
            "gravitationalConstant": 0.0001,
            "bodies": [
                {
                    "mass": 20000,
                    "position": {
                        "x": 3287.038259311016,
                        "y": 1994.123702490529
                    },
                    "velocity": {
                        "x": 0.0459991376848428,
                        "y": 0.022458376881025366
                    },
                    "color": "#D29725"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -3287.038259311016,
                        "y": -1994.123702490529
                    },
                    "velocity": {
                        "x": -0.0459991376848428,
                        "y": -0.022458376881025366
                    },
                    "color": "#4A4DE6"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 1.1608051045577383,
                        "y": 3579.2306613697324
                    },
                    "velocity": {
                        "x": 0.005501013020022906,
                        "y": -0.03656172410666969
                    },
                    "color": "#00836F"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -1.1608051045577383,
                        "y": -3579.2306613697324
                    },
                    "velocity": {
                        "x": -0.005501013020022906,
                        "y": 0.03656172410666969
                    },
                    "color": "#0FEC53"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 584.7708210099088,
                        "y": 2355.5758056355166
                    },
                    "velocity": {
                        "x": 0.03968739911014352,
                        "y": -0.0030475730347815783
                    },
                    "color": "#1BCAFB"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -584.7708210099088,
                        "y": -2355.5758056355166
                    },
                    "velocity": {
                        "x": -0.03968739911014352,
                        "y": 0.0030475730347815783
                    },
                    "color": "#0AF7A7"
                }
            ]
        },
        {
            "name": "6B-3",
            "gravitationalConstant": 0.0001,
            "bodies": [
                {
                    "mass": 20000,
                    "position": {
                        "x": 3848.0919341586405,
                        "y": 3557.178468282305
                    },
                    "velocity": {
                        "x": 0.034829292296194456,
                        "y": -0.028446423370734622
                    },
                    "color": "#C4FDEB"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -3848.0919341586405,
                        "y": -3557.178468282305
                    },
                    "velocity": {
                        "x": -0.034829292296194456,
                        "y": 0.028446423370734622
                    },
                    "color": "#F6CBCC"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 3204.3360578086294,
                        "y": 2904.7759569279438
                    },
                    "velocity": {
                        "x": -0.04523143206004914,
                        "y": 0.04694024687494357
                    },
                    "color": "#5320E5"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -3204.3360578086294,
                        "y": -2904.7759569279438
                    },
                    "velocity": {
                        "x": 0.04523143206004914,
                        "y": -0.04694024687494357
                    },
                    "color": "#9F8DFD"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 1051.5324563646561,
                        "y": 1400.9927792901049
                    },
                    "velocity": {
                        "x": 0.005359299078892189,
                        "y": 0.036136162680441355
                    },
                    "color": "#C5E57F"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -1051.5324563646561,
                        "y": -1400.9927792901049
                    },
                    "velocity": {
                        "x": -0.005359299078892189,
                        "y": -0.036136162680441355
                    },
                    "color": "#7CF86A"
                }
            ]
        },
        {
            "name": "6B-4",
            "gravitationalConstant": 0.0001,
            "bodies": [
                {
                    "mass": 20000,
                    "position": {
                        "x": 409.98812096503025,
                        "y": 3380.651299806729
                    },
                    "velocity": {
                        "x": -0.025145065889019658,
                        "y": -0.026772190791488317
                    },
                    "color": "#04794F"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -409.98812096503025,
                        "y": -3380.651299806729
                    },
                    "velocity": {
                        "x": 0.025145065889019658,
                        "y": 0.026772190791488317
                    },
                    "color": "#8A35D2"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 3356.0234007783533,
                        "y": 3664.9914272510173
                    },
                    "velocity": {
                        "x": -0.038797830002428535,
                        "y": 0.026882543552262203
                    },
                    "color": "#D4D29E"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -3356.0234007783533,
                        "y": -3664.9914272510173
                    },
                    "velocity": {
                        "x": 0.038797830002428535,
                        "y": -0.026882543552262203
                    },
                    "color": "#815E06"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 3780.8866952046465,
                        "y": 2542.861492029577
                    },
                    "velocity": {
                        "x": 0.04554149693904663,
                        "y": -0.002810917100975918
                    },
                    "color": "#285EAD"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -3780.8866952046465,
                        "y": -2542.861492029577
                    },
                    "velocity": {
                        "x": -0.04554149693904663,
                        "y": 0.002810917100975918
                    },
                    "color": "#04EEE5"
                }
            ]
        },
        
        {
            "name": "6B-5",
            "gravitationalConstant": 0.0001,
            "bodies": [
                {
                    "mass": 20000,
                    "position": {
                        "x": 1097.0024015658835,
                        "y": 3894.773354137394
                    },
                    "velocity": {
                        "x": 0.0055991791719144784,
                        "y": 0.03213526780357223
                    },
                    "color": "#8D9BD7"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -1097.0024015658835,
                        "y": -3894.773354137394
                    },
                    "velocity": {
                        "x": -0.0055991791719144784,
                        "y": -0.03213526780357223
                    },
                    "color": "#43107B"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 1340.788156135167,
                        "y": 654.492259401473
                    },
                    "velocity": {
                        "x": -0.03342622116874874,
                        "y": -0.04123202459944169
                    },
                    "color": "#5AD513"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -1340.788156135167,
                        "y": -654.492259401473
                    },
                    "velocity": {
                        "x": 0.03342622116874874,
                        "y": 0.04123202459944169
                    },
                    "color": "#934E2D"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 3414.1784603327715,
                        "y": 1437.282255577733
                    },
                    "velocity": {
                        "x": 0.029878476867612025,
                        "y": -0.03602825755851265
                    },
                    "color": "#49A815"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -3414.1784603327715,
                        "y": -1437.282255577733
                    },
                    "velocity": {
                        "x": -0.029878476867612025,
                        "y": 0.03602825755851265
                    },
                    "color": "#ADA999"
                }
            ]
        },
        {
            "name": "6B-6",
            "gravitationalConstant": 0.0001,
            "bodies": [
                {
                    "mass": 20000,
                    "position": {
                        "x": 1172.4288022370147,
                        "y": 2523.6202986335725
                    },
                    "velocity": {
                        "x": 0.04205857520575694,
                        "y": -0.04559755020665571
                    },
                    "color": "#393DE2"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -1172.4288022370147,
                        "y": -2523.6202986335725
                    },
                    "velocity": {
                        "x": -0.04205857520575694,
                        "y": 0.04559755020665571
                    },
                    "color": "#9DC10A"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 1180.2334484764021,
                        "y": 3478.458986749497
                    },
                    "velocity": {
                        "x": -0.0492482235198578,
                        "y": 0.003051225502795997
                    },
                    "color": "#91AB31"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -1180.2334484764021,
                        "y": -3478.458986749497
                    },
                    "velocity": {
                        "x": 0.0492482235198578,
                        "y": -0.003051225502795997
                    },
                    "color": "#8A9F10"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": 3683.634254060266,
                        "y": 1205.2267236259374
                    },
                    "velocity": {
                        "x": 0.0047098895033240926,
                        "y": 0.04368784646429161
                    },
                    "color": "#188BA5"
                },
                {
                    "mass": 20000,
                    "position": {
                        "x": -3683.634254060266,
                        "y": -1205.2267236259374
                    },
                    "velocity": {
                        "x": -0.0047098895033240926,
                        "y": -0.04368784646429161
                    },
                    "color": "#7AEA87"
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