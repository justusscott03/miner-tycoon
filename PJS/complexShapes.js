import { pjsSettings } from "../config/pjsSettings.js";

const ctx = document.getElementById('canvas').getContext('2d');

function beginShape () {
    pjsSettings.requiresFirstVertex = true;
    ctx.beginPath();
}

function endShape () {
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

/**
 * Adds a vertex to the current shape.
 * @param { number } x - The x-coordinate of the vertex.
 * @param { number } y - The y-coordinate of the vertex.
 */
function vertex (x, y) {
    if (pjsSettings.requiresFirstVertex) {
        ctx.moveTo(x, y);
        pjsSettings.requiresFirstVertex = false;
    }
    else {
        ctx.lineTo(x, y);
    }
}

function bezierVertex (cx1, cy1, cx2, cy2, x, y) {
    if (pjsSettings.requiresFirstVertex) {
        throw new Error("vertex() must be used at least once before calling bezierVertex()")
    }
    else {
        ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x, y);
    }
}

function strokeJoin (MODE) {
    if (!["MITER", "BEVEL", "ROUND"].includes(MODE)) {
        console.error("Invalid strokeJoin MODE:", MODE);
    }

    ctx.lineJoin = MODE;
}

export { beginShape, endShape, vertex, bezierVertex, strokeJoin };
