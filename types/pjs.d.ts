declare module "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js" {
    export function fill(r: number, g?: number, b?: number, a?: number): void;
    export function stroke(r: number, g?: number, b?: number, a?: number): void;
    export function strokeWeight(thickness: number): void;
    export function noStroke(): void;
    export function background(r: number, g?: number, b?: number, a?: number): void;
    export function gradient(x: number, y: number, width: number, height: number, color1: string, color2: string, direction?: string): void;
    export function color(r: number, g?: number, b?: number, a?: number): string;
}

declare module "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/other.js" {
    export function get(x?: number, y?: number, w?: number, h?: number): HTMLCanvasElement;
}

declare module "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/shapes.js" {
    export function rect(x: number, y: number, w: number, h: number, radius?: number): void;
    export function ellipse(x: number, y: number, w: number, h: number): void;
    export function quad(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): void;
    export function image(image: HTMLCanvasElement, x: number, y: number, w?: number, h?: number): void;
}

declare module "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/complexShapes.js" {
    export function beginShape(): void;
    export function vertex(x: number, y: number): void;
    export function endShape(): void;
}

declare module "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/initPJS.js" {
    export function initPJS(): void;
}

declare module "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/transformation.js" {
    export function pushMatrix(): void;
    export function popMatrix(): void;
    export function scale(amountX: number, amountY?: number): void;
    export function translate(x: number, y: number): void;
    export function resetMatrix(): void;
}

declare module "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/text.js" {
    export function text(message: string, x: number, y: number): void;
    export function textSize(size: number): void;
    export function textAlign(ALIGN: string, YALIGN?: string): void;
    export function textFont(font: string): void;
    export function outlinedText(message: string, x: number, y: number, weight: number, main: string, outline: string, inc?: number): void;
}

declare module "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/math.js" {
    export function map(value: number, start1: number, stop1: number, start2: number, stop2: number): number;
    export function lerp(a: number, b: number, t: number): number;
    export function random(low: number, high: number): number;
    export function round(num: number): number;
}