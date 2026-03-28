import { color } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { SpriteRenderer } from "../../engine/core/ECS/components/SpriteRenderer.js";
import { TextUI } from "../../engine/core/ECS/components/ui/TextUI.js";
import { Vector2 } from "../../engine/core/math/Vector2.js";
import { CrateBehavior } from "../entities/CrateBehavior.js";
import { Prefab } from "../../engine/core/ECS/Prefab.js";
export class CratePrefab extends Prefab {
    constructor() {
        super();
        const spriteRenderer = this.AddComponent(SpriteRenderer);
        spriteRenderer.initialize("crate", 70, 40);
        const moneyText = this.AddComponent(TextUI);
        moneyText.initialize("0", 30, color(0, 0, 0), "CENTER", false, new Vector2(35, -10));
        this.AddComponent(CrateBehavior);
    }
}
