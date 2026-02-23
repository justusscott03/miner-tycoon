export class ScreenManager {
    private static _instance: ScreenManager | null = null;

    static init(originalWidth: number, originalHeight: number): ScreenManager {
        if (!this._instance) {
            this._instance = new ScreenManager(originalWidth, originalHeight);
        }
        return this._instance;
    }

    static get Instance(): ScreenManager {
        if (!this._instance) {
            throw new Error("ScreenManager not initialized. Call ScreenManager.init() first.");
        }
        return this._instance;
    }

    originalWidth: number;
    originalHeight: number;

    scaledWidth = 0;
    scaledHeight = 0;

    private aspectRatio: number;
    private onResizeCallback: (() => void) | null = null;

    private constructor(originalWidth: number, originalHeight: number) {
        this.originalWidth = originalWidth;
        this.originalHeight = originalHeight;
        this.aspectRatio = originalWidth / originalHeight;

        this.updateSize();
        this.attachResizeListener();
    }

    onResize(callback: () => void) {
        this.onResizeCallback = callback;
    }

    private updateSize() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        if (screenWidth / screenHeight > this.aspectRatio) {
            this.scaledHeight = screenHeight;
            this.scaledWidth = this.scaledHeight * this.aspectRatio;
        } else {
            this.scaledWidth = screenWidth;
            this.scaledHeight = this.scaledWidth / this.aspectRatio;
        }

        if (this.onResizeCallback) {
            this.onResizeCallback();
        }
    }

    private debounce(func: Function, delay: number) {
        let timer: number | undefined;
        return (...args: any[]) => {
            clearTimeout(timer);
            timer = window.setTimeout(() => func.apply(this, args), delay);
        };
    }

    private attachResizeListener() {
        window.addEventListener(
            "resize",
            this.debounce(() => this.updateSize(), 100)
        );
    }

    get width() {
        return this.scaledWidth;
    }

    get height() {
        return this.scaledHeight;
    }
}
