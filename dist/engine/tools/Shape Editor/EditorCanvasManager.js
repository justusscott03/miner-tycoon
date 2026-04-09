export class EditorCanvasManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.resize();
        // Resize when layout changes
        window.addEventListener("resize", () => this.resize());
    }
    resize() {
        // Match canvas internal resolution to its displayed size
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }
    // Utility to convert mouse event → canvas coordinates
    getMousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
    onClick(handler) {
        this.canvas.addEventListener("click", e => {
            handler(this.getMousePos(e));
        });
    }
    onMouseDown(handler) {
        this.canvas.addEventListener("mousedown", e => {
            handler(this.getMousePos(e));
        });
    }
    onMouseMove(handler) {
        this.canvas.addEventListener("mousemove", e => {
            handler(this.getMousePos(e));
        });
    }
    onMouseUp(handler) {
        window.addEventListener("mouseup", handler);
    }
}
