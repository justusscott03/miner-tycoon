import { Prefab } from "../engine/core/Prefab.js";
import { Vector2 } from "../engine/core/math/Vector2.js";
import { SpriteRenderer } from "src/engine/core/components/SpriteRenderer.js";
import { ProgressBarUI } from "src/engine/core/components/SpriteRenderer.js";
export class NewPrefab extends Prefab {
    constructor() {
        super();
        const spriterenderer0 = this.AddComponent(SpriteRenderer);
        spriterenderer0.initialize("", 0, 0, new Vector2(0, 0));
        const progressbarui1 = this.AddComponent(ProgressBarUI);
        progressbarui1.initialize(color(200, 255, 0), color(142, 128, 128), 100, 100, new Vector2(0, 0));
    }
}
