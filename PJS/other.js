const ctx = document.getElementById("canvas").getContext("2d");

function get (x = 0, y = 0, w = canvas.width, h = canvas.height) {
    if (arguments.length === 0 || arguments.length === 4) {
        let imgData = ctx.getImageData(x, y, w, h);

        let offCanvas = document.createElement("canvas");
        offCanvas.width = imgData.width;
        offCanvas.height = imgData.height;
        let offCtx = offCanvas.getContext("2d");

        offCtx.putImageData(imgData, 0, 0);

        return offCanvas;
    }
    else if (arguments.length === 2) {
        let imageData = ctx.getImageData(x, y, 1, 1);
        let [r, g, b, a] = imageData.data;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    else {
        console.error(`get() requires 0, 2, or, 4 parameters, not ${arguments.length}`)
    }
}

function cursor (cursor) {
    document.body.style.cursor = cursor;
}

export { get, cursor };
