// src/engine/CanvasManager.ts

export class CanvasManager {
    static canvas: HTMLCanvasElement;
    static ctx: CanvasRenderingContext2D;

    static width: number = 0;
    static height: number = 0;

    // Lazy getter for canvas
    static getCanvas(): HTMLCanvasElement {
        if (!this.canvas) {
            const found = document.getElementById("canvas") as HTMLCanvasElement | null;
            if (!found) {
                throw new Error("CanvasManager: Canvas element #canvas not found in DOM");
            }
            this.canvas = found;
            this.width = found.width;
            this.height = found.height;
        }
        return this.canvas;
    }

    // Lazy getter for ctx
    static getCtx(): CanvasRenderingContext2D {
        if (!this.ctx) {
            const context = this.getCanvas().getContext("2d");
            if (!context) {
                throw new Error("CanvasManager: 2D context not supported");
            }
            this.ctx = context;
        }
        return this.ctx;
    }

    // Optional explicit initialization
    static init(canvasId: string) {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
        if (!canvas) {
            throw new Error(`CanvasManager: Canvas #${canvasId} not found`);
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("CanvasManager: 2D context not supported");
        }

        this.canvas = canvas;
        this.ctx = ctx;
        this.width = canvas.width;
        this.height = canvas.height;

        console.log(`Canvas initialized: ${canvasId} (${this.width}x${this.height})`);
    }

    // Resize logic
    static resize(originalWidth: number, originalHeight: number, newWidth: number, newHeight: number) {
        const canvas = this.getCanvas();

        canvas.width = originalWidth;
        canvas.height = originalHeight;

        this.width = originalWidth;
        this.height = originalHeight;

        canvas.style.width = `${newWidth}px`;
        canvas.style.height = `${newHeight}px`;
    }
}
