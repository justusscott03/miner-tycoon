import { EditorBootstrapper } from "./engine/EditorBootstrapper";
import { SceneManager } from "./engine/core/scene/SceneManager";
import { TestScene } from "./game/TestScene";

window.addEventListener("load", () => {
    console.log("Game + Editor initialized!");

    const editor = new EditorBootstrapper();
    editor.start();

    // Optional: load a scene
    // SceneManager.loadScene(new TestScene());
});
