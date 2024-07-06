import { Transform2d } from "../Geometry/Transform2d";
import { Point, Vector } from "../Geometry/Vector";

export class Camera {

    private transform2d: Transform2d;
    private inverseTransform2d: Transform2d;
    constructor() {
        this.transform2d = Transform2d.translation(new Vector(400, 400));
        this.inverseTransform2d = this.transform2d.getInverseTransform();
    }

    zoomAroundPoint(stagePoint: Point, deltaY: number) {
        let scale = 1-deltaY/1000;
        if (scale < 0.1) {
            scale = 0.1
        }
        this.updateTransform(this.transform2d.concat(
            Transform2d.scaleAroundPoint(scale, 
                this.transform2d.getInverseTransform().transformPoint(stagePoint))
        ));
    }

    translate(vector: Vector) {
        this.updateTransform(this.transform2d.concat(
            Transform2d.translation(
                this.transform2d.getInverseTransform().transformVector(vector)
            )
        ));
    }

    updateTransform(newTransform: Transform2d) {
        this.transform2d = newTransform;
        this.inverseTransform2d = this.transform2d.getInverseTransform();
    }

    getCameraTransform() {
        return this.transform2d;
    }

    getCameraInverseTransform() {
        return this.inverseTransform2d;
    }
}