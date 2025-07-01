const ctx = document.getElementById("canvas").getContext("2d");

function pushMatrix () {
    ctx.save();
}

function translate (x, y) {
    ctx.translate(x, y);
}

function rotate (angle) {
    ctx.rotate(angle * Math.PI / 180);
}

function scale (amountX, amountY) {
    if (amountY === undefined) {
        amountY = amountX;
    }

    ctx.scale(amountX, amountY);
}

function popMatrix () {
    ctx.restore();
}

function resetMatrix () {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

export { pushMatrix, translate, rotate, scale, popMatrix, resetMatrix };
