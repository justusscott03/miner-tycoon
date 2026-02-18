export class UserInput {
    constructor(canvas, screen) {
        this.mouseX = 0;
        this.mouseY = 0;
        this.mousePressed = false;
        this.mouseClicked = false;
        this.keys = {};
        this.canvas = canvas;
        this.screen = screen;
        this.attachMouseListeners();
        this.attachKeyboardListeners();
    }
    attachMouseListeners() {
        this.canvas.addEventListener("mousedown", () => {
            this.mousePressed = true;
        });
        this.canvas.addEventListener("mouseup", () => {
            this.mousePressed = false;
            this.mouseClicked = true;
        });
        this.canvas.addEventListener("mousemove", (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.screen.originalWidth / rect.width;
            const scaleY = this.screen.originalHeight / rect.height;
            this.mouseX = (e.clientX - rect.left) * scaleX;
            this.mouseY = (e.clientY - rect.top) * scaleY;
        });
        this.canvas.addEventListener("contextmenu", (e) => {
            // e.preventDefault(); // optional
        });
    }
    attachKeyboardListeners() {
        document.addEventListener("keydown", (e) => {
            this.keys[e.key.toLowerCase()] = true;
        });
        document.addEventListener("keyup", (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
    }
    update() {
        this.mouseClicked = false;
    }
}
