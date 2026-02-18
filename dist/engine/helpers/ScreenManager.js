export class ScreenManager {
    constructor(originalWidth, originalHeight) {
        this.scaledWidth = 0;
        this.scaledHeight = 0;
        this.onResizeCallback = null;
        this.originalWidth = originalWidth;
        this.originalHeight = originalHeight;
        this.aspectRatio = originalWidth / originalHeight;
        this.updateSize();
        this.attachResizeListener();
    }
    onResize(callback) {
        this.onResizeCallback = callback;
    }
    updateSize() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        if (screenWidth / screenHeight > this.aspectRatio) {
            this.scaledHeight = screenHeight;
            this.scaledWidth = this.scaledHeight * this.aspectRatio;
        }
        else {
            this.scaledWidth = screenWidth;
            this.scaledHeight = this.scaledWidth / this.aspectRatio;
        }
        if (this.onResizeCallback) {
            this.onResizeCallback();
        }
    }
    debounce(func, delay) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = window.setTimeout(() => func.apply(this, args), delay);
        };
    }
    attachResizeListener() {
        window.addEventListener("resize", this.debounce(() => this.updateSize(), 100));
    }
    get width() {
        return this.scaledWidth;
    }
    get height() {
        return this.scaledHeight;
    }
}
