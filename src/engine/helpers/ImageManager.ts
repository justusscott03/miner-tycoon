// src/engine/helpers/ImageManager.ts

import {
    background, fill, strokeWeight, stroke, noStroke, gradient, color
} from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { get } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/other.js";
import { rect, ellipse, quad } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/shapes.js";
import { beginShape, vertex, endShape } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/complexShapes.js";

export class ImageManager {
    // ─────────────────────────────────────────────
    // Singleton
    // ─────────────────────────────────────────────
    private static _instance: ImageManager | null = null;

    static init(canvas: HTMLCanvasElement): ImageManager {
        if (!this._instance) {
            this._instance = new ImageManager(canvas);
        }
        return this._instance;
    }

    static get Instance(): ImageManager {
        if (!this._instance) {
            throw new Error("ImageManager not initialized. Call ImageManager.init(canvas) first.");
        }
        return this._instance;
    }

    // ─────────────────────────────────────────────
    // Instance fields
    // ─────────────────────────────────────────────
    private ctx: CanvasRenderingContext2D;

    /** Map of image name → generator function */
    private generators: Record<string, () => any> = {};

    /** Map of image name → cached image data */
    private cache: Record<string, any> = {};

    /** Loading progress */
    curLoad = 0;
    loaded = false;

    // ─────────────────────────────────────────────
    // Constructor
    // ─────────────────────────────────────────────
    private constructor(private canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext("2d")!;
    }

    // ─────────────────────────────────────────────
    // Engine API
    // ─────────────────────────────────────────────

    /** Clears the offscreen canvas before generating an image */
    private resetCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.globalAlpha = 1.0;
        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.lineWidth = 1.0;
        this.ctx.lineCap = "butt";
        this.ctx.lineJoin = "miter";
        this.ctx.miterLimit = 10;
        this.ctx.strokeStyle = "#000000";
        this.ctx.fillStyle = "#000000";
        this.ctx.font = "10px sans-serif";
        this.ctx.textAlign = "start";
        this.ctx.textBaseline = "alphabetic";
    }

    /** Register a new image generator (game layer calls this) */
    register(name: string, generator: () => any) {
        this.generators[name] = generator;
    }

    /** Incrementally generate the next image */
    loadNext() {
        const keys = Object.keys(this.generators);

        this.resetCanvas();

        const key = keys[this.curLoad];
        this.cache[key] = this.generators[key]();

        this.curLoad++;

        if (this.curLoad >= keys.length) {
            this.loaded = true;
        }
    }

    /** Retrieve a generated image */
    get(name: string) {
        return this.cache[name];
    }
}
