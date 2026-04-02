import { Prefab } from "../../engine/core/Prefab.js";
import { SpriteRenderer } from "../../engine/core/components/SpriteRenderer.js";
import { Vector2 } from "../../engine/core/math/Vector2.js";
export class HelloPrefab extends Prefab {
    constructor() {
        super();
        const spriterenderer0 = this.AddComponent(SpriteRenderer);
        spriterenderer0.initialize("me", 0, 10, new Vector2(0, 0));
    }
}
