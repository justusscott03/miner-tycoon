import { pjsSettings } from "./pjsSettings";
import { CanvasManager } from "../helpers/CanvasManager";
import { Debug } from "../diagnostics/Debug";

const ctx: CanvasRenderingContext2D = CanvasManager.getCtx();

function beginShape () {
    pjsSettings.requiresFirstVertex = true;
    ctx.beginPath();
}

function endShape () {
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function vertex (x: number, y: number) {
    if (pjsSettings.requiresFirstVertex) {
        ctx.moveTo(x, y);
        pjsSettings.requiresFirstVertex = false;
    }
    else {
        ctx.lineTo(x, y);
    }
}

function bezierVertex (cx1: number, cy1: number, cx2: number, cy2: number, x: number, y: number) {
    if (pjsSettings.requiresFirstVertex) {
        throw new Error("vertex() must be used at least once before calling bezierVertex()")
    }
    else {
        ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x, y);
    }
}

function strokeJoin (MODE: CanvasLineJoin) {
    if (!["MITER", "BEVEL", "ROUND"].includes(MODE)) {
        Debug.error(`Invalid strokeJoin MODE: ${MODE}`);
    }

    ctx.lineJoin = MODE;
}

export { beginShape, endShape, vertex, bezierVertex, strokeJoin };
