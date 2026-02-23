import { Engine } from "./engine/Engine.js";
import { CanvasManager } from "./engine/helpers/CanvasManager.js";
import { ImageManager } from "./engine/helpers/ImageManager.js";
import { ScreenManager } from "./engine/helpers/ScreenManager.js";
import { UserInput } from "./engine/ui/UserInput.js";
import { ImageManifest } from "./game/content/ImageManifest.js";
import { Game } from "./game/Game.js";

CanvasManager.init("canvas");
ScreenManager.init(716, 962);
UserInput.init();
ImageManager.init(CanvasManager.canvas);
ImageManifest.registerImages();

window.onload = () => {
    const game = new Game();
    Engine.start(game);
};

