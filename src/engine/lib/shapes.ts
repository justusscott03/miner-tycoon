import { EllipseMode, pjsSettings, RectMode } from "./pjsSettings";
import { CanvasManager } from "../helpers/CanvasManager";

const ctx = CanvasManager.ctx;

function roundRect (x: number, y: number, width: number, height: number, radius: number) {
    ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.arcTo(x + width, y, x + width, y + radius, radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
        ctx.lineTo(x + radius, y + height);
        ctx.arcTo(x, y + height, x, y + height - radius, radius);
        ctx.lineTo(x, y + radius);
        ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function rect (x: number, y: number, w: number, h: number, radius: number) {
    let xPos = 0, yPos = 0, width = 0, height = 0;

    if (pjsSettings.curRectMode === "CORNER") {
        xPos = x;
        yPos = y;
        width = w;
        height = h;
    }
    else if (pjsSettings.curRectMode === "CORNERS") {
        xPos = x;
        yPos = y;
        width = w - x;
        height = h - y;
    }
    else if (pjsSettings.curRectMode === "CENTER") {
        xPos = x - w / 2;
        yPos = y - h / 2;
        width = w;
        height = h;
    }
    else if (pjsSettings.curRectMode === "RADIUS") {
        xPos = x - w;
        yPos = y - h;
        width = w * 2;
        height = h * 2;
    }

    if (arguments.length === 4) {
        ctx.fillRect(xPos, yPos, width, height);
        ctx.strokeRect(xPos, yPos, width, height);
    }
    else if (arguments.length > 4) {
        roundRect(xPos, yPos, width, height, radius);
    }
}

function arc (x: number, y: number, w: number, h: number, start: number, stop: number) {
    if (stop < start) {
        return;
    }

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1, h / w);

    ctx.beginPath();
    ctx.arc(0, 0, w / 2, start * Math.PI / 180, stop * Math.PI / 180);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
}

function ellipse (x: number, y: number, w: number, h: number) {
    let xPos = 0, yPos = 0, width = 0, height = 0;
    
    if (pjsSettings.curEllipseMode === "CENTER") {
        xPos = x;
        yPos = y;
        width = w;
        height = h;
    }
    else if (pjsSettings.curEllipseMode === "RADIUS") {
        xPos = x;
        yPos = y;
        width = w * 2;
        height = h * 2;
    }
    else if (pjsSettings.curEllipseMode === "CORNER") {
        xPos = x + w / 2;
        yPos = y + h / 2;
        width = w;
        height = h;
    }
    else if (pjsSettings.curEllipseMode === "CORNERS") {
        xPos = (x + w) / 2;
        yPos = (y + h) / 2;
        width = w - x;
        height = h - y;
    }

    arc(xPos, yPos, width, height, 0, 360);
}

function triangle (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
    ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();
}

function quad (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) {
    ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x4, y4);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();
}

function image (image: HTMLCanvasElement, x: number, y: number, w: number = image.width, h: number = image.height) {

    ctx.drawImage(image, x, y, w, h);

    if (arguments.length !== 3 && arguments.length !== 5) {
        console.error(`image() requires 3 or 5 parameters, not ${arguments.length}`)
    }
}

function line (x1: number, y1: number, x2: number, y2: number) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.stroke();
}

function point (x: number, y: number) {
    ctx.fillRect(x, y, 1, 1);
}

function bezier (x1: number, y1: number, cx1: number, cy1: number, cx2: number, cy2: number, x2: number, y2: number) {
    ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();
}

function ellipseMode (MODE: EllipseMode) {
    pjsSettings.curEllipseMode = MODE;
}

function rectMode (MODE: RectMode) {
    pjsSettings.curRectMode = MODE;
}

function strokeCap (MODE: CanvasLineCap) {
    ctx.lineCap = MODE;
}

export { roundRect, rect, arc, ellipse, triangle, quad, image, line, point, bezier, ellipseMode, rectMode, strokeCap };
