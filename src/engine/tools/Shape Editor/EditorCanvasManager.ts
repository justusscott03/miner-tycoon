export class EditorCanvasManager {
    ctx: CanvasRenderingContext2D;

    constructor(public canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext("2d")!;
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
    getMousePos(e: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    onClick(handler: (mouse: { x: number; y: number }) => void) {
        this.canvas.addEventListener("click", e => {
            handler(this.getMousePos(e));
        });
    }

    onMouseDown(handler: (mouse: { x: number; y: number }) => void) {
        this.canvas.addEventListener("mousedown", e => {
            handler(this.getMousePos(e));
        });
    }

    onMouseMove(handler: (mouse: { x: number; y: number }) => void) {
        this.canvas.addEventListener("mousemove", e => {
            handler(this.getMousePos(e));
        });
    }

    onMouseUp(handler: () => void) {
        window.addEventListener("mouseup", handler);
    }
}
