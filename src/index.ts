import { EditorBootstrapper } from "./engine/EditorBootstrapper";
import { SceneManager } from "./engine/core/scene/SceneManager";
import { Debug } from "./engine/diagnostics/Debug";
import { TestScene } from "./game/TestScene";

window.addEventListener("load", () => {
    const editor = new EditorBootstrapper();
    editor.start();

    Debug.log("Game + Editor initialized!");
    Debug.error("Test error");
    Debug.warn("Test warning");
    Debug.log("Test log");

    // Optional: load a scene
    // SceneManager.loadScene(new TestScene());
});
