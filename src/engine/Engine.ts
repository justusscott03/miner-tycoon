import { ImageManifest } from "../game/content/ImageManifest";
import { SceneManager } from "./core/scene/SceneManager";
import { CanvasManager } from "./helpers/CanvasManager";
import { ImageManager } from "./helpers/ImageManager";
import { ScreenManager } from "./helpers/ScreenManager";
import { Time } from "./helpers/TimeManager";
import { UserInput } from "./ui/UserInput";

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
