import { CanvasManager } from "../helpers/CanvasManager";
import { constrain } from "./math";

const ctx = CanvasManager.getCtx();

function color(r: number | string, g?: number, b?: number, a: number = 255): string {
    // If user passed a CSS string, just return it
    if (typeof r === "string") return r;

    if (g === undefined && b === undefined) {
        g = r;
        b = r;
    }

    if (b === undefined) {
        b = r;
    }

    r = constrain(r, 0, 255);
    g = constrain(g!, 0, 255);
    b = constrain(b!, 0, 255);
    a = constrain(a, 0, 255);

    return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
}

function fill(r: number | string, g?: number, b?: number, a?: number) {
    ctx.fillStyle = color(r, g, b, a);
}

function noFill() {
    ctx.fillStyle = "rgba(0,0,0,0)";
}

function stroke(r: number | string, g?: number, b?: number, a?: number) {
    ctx.strokeStyle = color(r, g, b, a);
}

function noStroke() {
    ctx.strokeStyle = "rgba(0,0,0,0)";
}

function strokeWeight(w: number) {
    ctx.lineWidth = w;
}

function background(r: number | string, g?: number, b?: number, a?: number) {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    fill(r, g, b, a);
    ctx.fillRect(0, 0, CanvasManager.width, CanvasManager.height);
    ctx.restore();
}

function lerpColor(color1: string, color2: string, amt: number): string {
    function parseColor(color: string): { r: number; g: number; b: number } {
        if (color.startsWith("#")) {
            const bigint = parseInt(color.slice(1), 16);
            return {
                r: (bigint >> 16) & 255,
                g: (bigint >> 8) & 255,
                b: bigint & 255
            };
        }

        if (color.startsWith("rgb")) {
            const match = color.match(/\d+/g);
            if (!match || match.length < 3) {
                throw new Error(`Invalid rgb() color: ${color}`);
            }
            return {
                r: parseInt(match[0]),
                g: parseInt(match[1]),
                b: parseInt(match[2])
            };
        }

        throw new Error(`Unsupported color format: ${color}`);
    }

    const c1 = parseColor(color1);
    const c2 = parseColor(color2);

    const r = Math.round(c1.r + (c2.r - c1.r) * amt);
    const g = Math.round(c1.g + (c2.g - c1.g) * amt);
    const b = Math.round(c1.b + (c2.b - c1.b) * amt);

    return `rgb(${r}, ${g}, ${b})`;
}

function gradient (x: number, y: number, width: number, height: number, color1: string, color2: string, direction: string = "vertical") {
    if (direction !== "vertical" && direction !== "horizontal") {
        throw new Error("Direction must be 'vertical' or 'horizontal'.");
    }
    if (direction === "vertical") {
        const gradient = ctx.createLinearGradient(x, y, x, y + height);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, width, height);
        return;
    }
    else if (direction === "horizontal") {
        const gradient = ctx.createLinearGradient(x, y, x + width, y);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, width, height);
        return;
    }
}

export { color, fill, noFill, background, noStroke, strokeWeight, stroke, lerpColor, gradient };