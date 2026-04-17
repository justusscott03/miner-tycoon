import { CanvasManager } from "../helpers/CanvasManager";

const ctx = CanvasManager.ctx;

function pushMatrix () {
    ctx.save();
}

function translate (x: number, y: number) {
    ctx.translate(x, y);
}

function rotate (angle: number) {
    ctx.rotate(angle * Math.PI / 180);
}

function scale (amountX: number, amountY: number = amountX) {
    ctx.scale(amountX, amountY);
}

function popMatrix () {
    ctx.restore();
}

function resetMatrix () {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

export { pushMatrix, translate, rotate, scale, popMatrix, resetMatrix };
