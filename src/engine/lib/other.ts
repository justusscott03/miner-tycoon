import { CanvasManager } from "../helpers/CanvasManager";

const ctx = CanvasManager.getCtx();

function get(x: number = 0, y: number = 0, w: number = CanvasManager.width, h: number = CanvasManager.height): HTMLCanvasElement {

    //if (arguments.length === 0 || arguments.length === 4) {
        const imgData = ctx.getImageData(x, y, w, h);

        const offCanvas = document.createElement("canvas");
        offCanvas.width = imgData.width;
        offCanvas.height = imgData.height;

        const offCtx = offCanvas.getContext("2d")!;
        offCtx.putImageData(imgData, 0, 0);

        return offCanvas;
    //}

    // if (arguments.length === 2) {
    //     const imageData = ctx.getImageData(x, y, 1, 1);
    //     const [r, g, b, a] = imageData.data;
    //     return `rgba(${r}, ${g}, ${b}, ${a})`;
    // }

    //console.error(`get() requires 0, 2, or 4 parameters, not ${arguments.length}`);
    //eturn undefined;
}


function startMask(shape: () => void) {
    ctx.save();
    shape();
    ctx.clip();
}

function endMask() {
    ctx.restore();
}

function cursor (cursor: string) {
    document.body.style.cursor = cursor;
}

export { get, startMask, endMask, cursor };
