// src/engine/CanvasManager.ts

export class CanvasManager {
    static canvas: HTMLCanvasElement;
    static ctx: CanvasRenderingContext2D;
    static width: number;
    static height: number;

    static init(canvasId: string) {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!canvas) throw new Error(`Canvas #${canvasId} not found`);

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("2D context not supported");

        this.canvas = canvas;
        this.ctx = ctx;
        this.width = canvas.width;
        this.height = canvas.height;
    }

    static resize(originalWidth: number, originalHeight: number, newWidth: number, newHeight: number) {
        // Set the internal resolution (actual drawing buffer)
        this.canvas.width = originalWidth;
        this.canvas.height = originalHeight;

        // Update CanvasManager's stored values
        this.width = originalWidth;
        this.height = originalHeight;

        // Apply CSS scaling for display size
        this.canvas.style.width = `${newWidth}px`;
        this.canvas.style.height = `${newHeight}px`;
    }
}
