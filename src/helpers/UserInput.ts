import { ScreenManager } from "./ScreenManager";

export class UserInput {
    mouseX = 0;
    mouseY = 0;
    mousePressed = false;
    mouseClicked = false;

    keys: Record<string, boolean> = {};

    private canvas: HTMLCanvasElement;
    private screen: ScreenManager;

    constructor(canvas: HTMLCanvasElement, screen: ScreenManager) {
        this.canvas = canvas;
        this.screen = screen;

        this.attachMouseListeners();
        this.attachKeyboardListeners();
    }

    private attachMouseListeners() {
        this.canvas.addEventListener("mousedown", () => {
            this.mousePressed = true;
        });

        this.canvas.addEventListener("mouseup", () => {
            this.mousePressed = false;
            this.mouseClicked = true;
        });

        this.canvas.addEventListener("mousemove", (e) => {
            const scaleX = this.screen.originalWidth / window.innerWidth;
            const scaleY = this.screen.originalHeight / window.innerHeight;

            this.mouseX = e.x * scaleX;
            this.mouseY = e.y * scaleY;
        });

        this.canvas.addEventListener("contextmenu", (e) => {
            // e.preventDefault(); // optional
        });
    }

    private attachKeyboardListeners() {
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
