import { CanvasManager } from "../helpers/CanvasManager";
import { constrain } from "./math";

function getCtx(): CanvasRenderingContext2D {
    return CanvasManager.ctx;
}

function toHex(num: number) {
    const chars = "0123456789ABCDEF";
    return chars[(num - (num % 16)) / 16] + chars[num % 16];
}

function color(r: number, g?: number, b?: number, a: number = 255): string {
    if (g === undefined && b === undefined && a === undefined) {
        g = r;
        b = r;
        a = 255;
    }
    if (b === undefined && a === undefined) {
        a = g!;
        g = r;
        b = r;
    }
    if (a === undefined) {
        a = 255;
    }

    getCtx().globalAlpha = constrain(a / 255, 0, 1);
    return "#" + toHex(r) + toHex(g!) + toHex(b!);
}

function fill (r: number | string, g: number = 255, b: number = 255, a: number = 255) {
    if (typeof r === "string") {
        getCtx().fillStyle = r;
    }
    else {
        if (g === undefined && b === undefined && a === undefined) {
            g = r;
            b = r;
            a = 255;
        }
        if (b === undefined && a === undefined) {
            a = g;
            g = r;
            b = r;
        }
        if (a === undefined) {
            a = 255;
        }
        
        getCtx().globalAlpha = constrain(a / 255, 0, 1);
        getCtx().fillStyle = "#" + toHex(r) + toHex(g) + toHex(b);
    }
}

function noFill () {
    getCtx().fillStyle = "rgba(0, 0, 0, 0)";
}

function background (r: number, g?: number, b?: number, a: number = 255) {
    fill(r, g, b, a);
    getCtx().fillRect(0, 0, CanvasManager.width, CanvasManager.height);
}

function noStroke () {
    getCtx().strokeStyle = "rgba(0, 0, 0, 0)";
}

function strokeWeight (thickness: number) {
    getCtx().lineWidth = thickness;
}

function stroke (r: number, g?: number, b?: number, a: number = 255) {
    if (typeof r === "string") {
        getCtx().strokeStyle = r;
    }
    else {
        if (g === undefined && b === undefined && a === undefined) {
            g = r;
            b = r;
            a = 255;
        }
        if (b === undefined && a === undefined) {
            a = g!;
            g = r;
            b = r;
        }
        if (a === undefined) {
            a = 255;
        }
        
        getCtx().globalAlpha = constrain(a / 255, 0, 1);
        getCtx().strokeStyle = "#" + toHex(r) + toHex(g!) + toHex(b!);
    }
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
        const gradient = getCtx().createLinearGradient(x, y, x, y + height);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        getCtx().fillStyle = gradient;
        getCtx().fillRect(x, y, width, height);
        return;
    }
    else if (direction === "horizontal") {
        const gradient = getCtx().createLinearGradient(x, y, x + width, y);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        getCtx().fillStyle = gradient;
        getCtx().fillRect(x, y, width, height);
        return;
    }
}

export { color, fill, noFill, background, noStroke, strokeWeight, stroke, lerpColor, gradient };