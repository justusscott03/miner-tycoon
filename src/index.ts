import { CanvasManager } from "./engine/helpers/CanvasManager.js";
import { Game } from "./game/Game.js";

CanvasManager.init("canvas");

window.onload = () => {
    new Game();
};