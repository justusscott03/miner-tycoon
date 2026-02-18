import { CanvasManager } from "./engine/helpers/CanvasManager.js";
import { ImageManager } from "./engine/helpers/ImageManager.js";
import { ImageManifest } from "./game/content/ImageManifest.js";
import { Game } from "./game/Game.js";
CanvasManager.init("canvas");
ImageManager.init(CanvasManager.canvas);
ImageManifest.registerImages();
window.onload = () => {
    new Game();
};
