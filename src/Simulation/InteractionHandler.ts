import { Camera } from "./Camera";
import { Canvas } from "./Canvas";

export abstract class InteractionHandler {
    static setUpHandlers(camera: Camera, canvas: Canvas) {
        canvas.onScroll((stagePoint, deltaY, deltaX) => camera.zoomAroundPoint(stagePoint, deltaY))
    }
}