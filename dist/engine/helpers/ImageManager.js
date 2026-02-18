// src/engine/helpers/ImageManager.ts
export class ImageManager {
    static init(canvas) {
        if (!this._instance) {
            this._instance = new ImageManager(canvas);
        }
        return this._instance;
    }
    static get Instance() {
        if (!this._instance) {
            throw new Error("ImageManager not initialized. Call ImageManager.init(canvas) first.");
        }
        return this._instance;
    }
    // ─────────────────────────────────────────────
    // Constructor
    // ─────────────────────────────────────────────
    constructor(canvas) {
        this.canvas = canvas;
        /** Map of image name → generator function */
        this.generators = {};
        /** Map of image name → cached image data */
        this.cache = {};
        /** Loading progress */
        this.curLoad = 0;
        this.loaded = false;
        this.ctx = canvas.getContext("2d");
    }
    // ─────────────────────────────────────────────
    // Engine API
    // ─────────────────────────────────────────────
    /** Clears the offscreen canvas before generating an image */
    resetCanvas() {
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
    register(name, generator) {
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
    get(name) {
        return this.cache[name];
    }
}
// ─────────────────────────────────────────────
// Singleton
// ─────────────────────────────────────────────
ImageManager._instance = null;
