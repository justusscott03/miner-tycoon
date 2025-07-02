import { images } from "../lib/imageLibrary.js";

function resetCanvas (canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = "source-over";
    ctx.lineWidth = 1.0;
    ctx.lineCap = "butt";
    ctx.lineJoin = "miter";
    ctx.miterLimit = 10;
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "start";
    ctx.textBaseline = "alphabetic";
}

const canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d");

export const imageLoad = {
    curLoad : 0,
    loaded : false,
    load : function () {
        let obj = Object.keys(images);

        resetCanvas(canvas, ctx);
        
        images[obj[this.curLoad]] = images[obj[this.curLoad]]();
        
        this.curLoad++;
        
        if (this.curLoad >= Object.keys(images).length) {
            this.loaded = true;
        }
    }
};
