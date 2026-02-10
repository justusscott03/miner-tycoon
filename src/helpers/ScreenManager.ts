// src/helpers/ScreenManager.ts

export class ScreenManager {
    originalWidth: number;
    originalHeight: number;

    scaledWidth: number = 0;
    scaledHeight: number = 0;

    private aspectRatio: number;

    constructor(originalWidth: number, originalHeight: number) {
        this.originalWidth = originalWidth;
        this.originalHeight = originalHeight;
        this.aspectRatio = originalWidth / originalHeight;

        this.updateSize();
        this.attachResizeListener();
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
            this.debounce(() => this.updateSize(), 300)
        );
    }

    get width() {
        return this.scaledWidth!;
    }

    get height() {
        return this.scaledHeight!;
    }
}
