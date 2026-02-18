// src/engine/CanvasManager.ts
export class CanvasManager {
    static init(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas)
            throw new Error(`Canvas #${canvasId} not found`);
        const ctx = canvas.getContext("2d");
        if (!ctx)
            throw new Error("2D context not supported");
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = canvas.width;
        this.height = canvas.height;
    }
    static resize(originalWidth, originalHeight, newWidth, newHeight) {
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
