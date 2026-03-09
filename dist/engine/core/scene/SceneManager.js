export class SceneManager {
    static get activeScene() {
        if (!this._activeScene) {
            throw new Error("No active scene loaded.");
        }
        return this._activeScene;
    }
    static loadScene(scene) {
        // Optional: call OnDestroy on old scene
        this._activeScene = scene;
    }
    static unloadScene() {
        this._activeScene = null;
    }
}
SceneManager._activeScene = null;
