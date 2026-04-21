import { SceneManager } from "./engine/core/scene/SceneManager";
import { Engine } from "./engine/Engine";
import { TestScene } from "./game/TestScene";

window.addEventListener("load", () => {
    console.log("Game initialized!");
    Engine.start();
    SceneManager.loadScene(new TestScene());
});

