import { ImageManifest } from "../game/content/ImageManifest.js";
import { SceneManager } from "./core/scene/SceneManager.js";
import { CanvasManager } from "./helpers/CanvasManager.js";
import { ImageManager } from "./helpers/ImageManager.js";
import { ScreenManager } from "./helpers/ScreenManager.js";
import { Time } from "./helpers/TimeManager.js";
import { UserInput } from "./ui/UserInput.js";
export class Engine {
    static start() {
        CanvasManager.init("canvas");
        ScreenManager.init(716, 962);
        UserInput.init();
        ImageManager.init(CanvasManager.canvas);
        ImageManifest.registerImages();
        const loop = () => {
            if (!ImageManager.Instance.loaded) {
                ImageManager.Instance.loadNext();
            }
            else {
                Time.update();
                Time._fixedAccumulator += Time.deltaTime;
                const scene = SceneManager.activeScene;
                while (Time._fixedAccumulator >= Time.fixedDeltaTime) {
                    scene.fixedUpdate();
                    Time._fixedAccumulator -= Time.fixedDeltaTime;
                }
                scene.update();
                scene.lateUpdate();
                scene.render();
                scene.renderUI();
            }
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }
}
