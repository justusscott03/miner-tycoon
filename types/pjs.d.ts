declare module "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js" {
    export function fill(r: number, g?: number, b?: number, a?: number): void;
    export function stroke(r: number, g?: number, b?: number, a?: number): void;
    export function strokeWeight(...args: any[]): void;
    export function noStroke(): void;
    export function background(...args: any[]): void;
    export function gradient(...args: any[]): void;
    export function color(...args: any[]): string;
}

declare module "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/other.js" {
    export function get(...args: any[]): any;
}

declare module "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/shapes.js" {
    export function rect(...args: any[]): void;
    export function ellipse(...args: any[]): void;
    export function quad(...args: any[]): void;
    export function image(...args: any[]): void;
}

declare module "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/complexShapes.js" {
    export function beginShape(): void;
    export function vertex(...args: any[]): void;
    export function endShape(...args: any[]): void;
}

declare module "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/initPJS.js" {
    export function initPJS(): void;
}

declare module "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/transformation.js" {
    export function pushMatrix(): void;
    export function popMatrix(): void;
    export function scale(...args: any[]): void;
    export function resetMatrix(): void;
}

declare module "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/text.js" {
    export function text(...args: any[]): void;
    export function textSize(...args: any[]): void;
    export function textAlign(...args: any[]): void;
    export function textFont(...args: any[]): void;
    export function outlinedText(...args: any[]): void;
}

declare module "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/math.js" {
    export function map(...args: any[]): number;
    export function lerp(...args: any[]): number;
    export function random(...args: any[]): number;
}