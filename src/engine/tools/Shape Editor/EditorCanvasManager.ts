export class EditorCanvasManager {
    constructor(public canvas: HTMLCanvasElement) {
        this.resize();
        window.addEventListener("resize", () => this.resize());
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    onClick(handler: (mouse: { x: number; y: number }) => void) {
        this.canvas.addEventListener("click", e => {
            const rect = this.canvas.getBoundingClientRect();
            handler({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        });
    }
}
