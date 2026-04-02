import { Prefab } from "../../engine/core/ECS/Prefab.js";
import { SpriteRenderer } from "../../engine/core/ECS/components/SpriteRenderer.js";
import { Vector2 } from "../../engine/core/math/Vector2.js";
export class NewPrefab extends Prefab {
    constructor() {
        super();
        const spriterenderer0 = this.AddComponent(SpriteRenderer);
        spriterenderer0.initialize("", 0, 0, new Vector2(0, 0));
    }
}
