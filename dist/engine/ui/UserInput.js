import { CanvasManager } from "../helpers/CanvasManager.js";
import { ScreenManager } from "../helpers/ScreenManager.js";
export class UserInput {
    static init() {
        if (!this._instance) {
            this._instance = new UserInput();
        }
        return this._instance;
    }
    static get Instance() {
        if (!this._instance) {
            throw new Error("UserInput not initialized. Call UserInput.init() first.");
        }
        return this._instance;
    }
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.mousePressed = false;
        this.mouseClicked = false;
        this.keys = {};
        this.attachMouseListeners();
        this.attachKeyboardListeners();
    }
    attachMouseListeners() {
        const canvas = CanvasManager.canvas;
        canvas.addEventListener("mousedown", () => {
            this.mousePressed = true;
        });
        canvas.addEventListener("mouseup", () => {
            this.mousePressed = false;
            this.mouseClicked = true;
        });
        canvas.addEventListener("mousemove", (e) => {
            const rect = canvas.getBoundingClientRect();
            const screen = ScreenManager.Instance;
            const scaleX = screen.originalWidth / rect.width;
            const scaleY = screen.originalHeight / rect.height;
            this.mouseX = (e.clientX - rect.left) * scaleX;
            this.mouseY = (e.clientY - rect.top) * scaleY;
        });
        canvas.addEventListener("contextmenu", (e) => {
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
UserInput._instance = null;
