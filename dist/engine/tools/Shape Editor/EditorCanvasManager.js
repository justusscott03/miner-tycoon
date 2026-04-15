export class EditorCanvasManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.isMouseDown = false;
        this.ctx = canvas.getContext("2d");
        requestAnimationFrame(() => this.resize());
        window.addEventListener("resize", () => this.resize());
    }
    resize() {
        const rect = this.canvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0)
            return;
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }
    getMousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
    onClick(handler) {
        this.canvas.addEventListener("click", e => {
            e.preventDefault();
            handler(this.getMousePos(e), e);
        });
    }
    onRightClick(handler) {
        this.canvas.addEventListener("contextmenu", e => {
            e.preventDefault();
            handler(this.getMousePos(e));
        });
    }
    onMouseDown(handler) {
        this.canvas.addEventListener("mousedown", e => {
            e.preventDefault();
            this.isMouseDown = true;
            handler(this.getMousePos(e));
        });
    }
    onMouseMove(handler) {
        this.canvas.addEventListener("mousemove", e => {
            e.preventDefault();
            handler(this.getMousePos(e));
        });
    }
    onMouseUp(handler) {
        window.addEventListener("mouseup", e => {
            e.preventDefault();
            this.isMouseDown = false;
            handler();
        });
    }
}
