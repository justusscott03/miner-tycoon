import { Scene } from "./Scene.js";

export class SceneManager {
    private static _activeScene: Scene | null = null;

    static get activeScene(): Scene {
        if (!this._activeScene) {
            throw new Error("No active scene loaded.");
        }
        return this._activeScene;
    }

    static loadScene(scene: Scene) {
        // Optional: call OnDestroy on old scene
        this._activeScene = scene;
    }

    static unloadScene() {
        this._activeScene = null;
    }
}
