import { Point, Vector } from "../Geometry/Vector";
import { Camera } from "./Camera";
import { Canvas } from "./Canvas";

type DragState = {
    isDragging: boolean,
    stagePoint: Point | null,
}
export abstract class InteractionHandler {
    static setUpHandlers(camera: Camera, canvas: Canvas) {
        const dragState: DragState = {
            isDragging: false,
            stagePoint: null
        }

        canvas.onScroll((point, deltaY) => camera.zoomAroundPoint(point, deltaY))

        canvas.onMouseLeftDown(point => {
            dragState.isDragging = true;
            dragState.stagePoint = point;
        })

        canvas.onMouseLeftUp(point => {
            dragState.isDragging = false;
            dragState.stagePoint = null;
        })

        canvas.onMouseMove(point => {
            if(dragState.isDragging && dragState.stagePoint != null) {
                console.log("qqq dragging")
                camera.translate(Vector.diffBetweenPoints(dragState.stagePoint, point))
                dragState.stagePoint = point;
            }
        })
    }
}