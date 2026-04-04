export class EditorCanvasManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.resize();
        window.addEventListener("resize", () => this.resize());
    }
    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }
    onClick(handler) {
        this.canvas.addEventListener("click", e => {
            const rect = this.canvas.getBoundingClientRect();
            handler({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        });
    }
}
