import { color } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { SpriteRenderer } from "../../engine/core/components/SpriteRenderer.js";
import { TextUI } from "../../engine/core/components/ui/TextUI.js";
import { GameObject } from "../../engine/core/GameObject.js";
import { Vector2 } from "../../engine/core/math/Vector2.js";
import { CrateBehavior } from "../entities/CrateBehavior.js";
export class CratePrefab extends GameObject {
    constructor() {
        super();
        const spriteRenderer = this.AddComponent(SpriteRenderer);
        spriteRenderer.initialize("crate", 70, 40);
        const moneyText = this.AddComponent(TextUI);
        moneyText.initialize("0", 30, color(0, 0, 0), "CENTER", false, new Vector2(35, -10));
        this.AddComponent(CrateBehavior);
        //return crateGO;
    }
    static instantiate() {
        return new CratePrefab();
    }
}
