import { color } from "../../engine/lib/colors";
import { SpriteRenderer } from "../../engine/core/ECS/components/SpriteRenderer";
import { TextUI } from "../../engine/core/ECS/components/ui/TextUI";
import { Vector2 } from "../../engine/core/math/Vector2";
import { CrateBehavior } from "../components/entities/CrateBehavior";
import { Prefab } from "../../engine/core/ECS/Prefab";

export class CratePrefab extends Prefab {
    constructor() {
        super();

        const spriteRenderer = this.AddComponent(SpriteRenderer);
        spriteRenderer.initialize("crate", 70, 40);

        const moneyText = this.AddComponent(TextUI);
        //moneyText.initialize("0", 30, color(0, 0, 0), "CENTER", false, new Vector2(35, -10));

        this.AddComponent(CrateBehavior);
    }
}