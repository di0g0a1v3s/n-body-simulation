import { Transform2d } from "../Geometry/Transform2d";
import { Point, Vector } from "../Geometry/Vector";

export class Camera {

    private transform2d: Transform2d;
    constructor() {
        this.transform2d = Transform2d.translation(new Vector(400, 400));
    }

    zoomAroundPoint(stagePoint: Point, deltaY: number) {
        let scale = 1-deltaY/1000;
        if (scale < 0.1) {
            scale = 0.1
        }
        this.transform2d = this.transform2d.concat(
            Transform2d.scaleAroundPoint(scale, 
                this.transform2d.getInverseTransform().transformPoint(stagePoint))
        );
    }

    getCameraTransform() {
        return this.transform2d;
    }
}