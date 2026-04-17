import { color } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { SpriteRenderer } from "../../engine/core/ECS/components/SpriteRenderer";
import { ProgressBarUI } from "../../engine/core/ECS/components/ui/ProgressBarUI";
import { Vector2 } from "../../engine/core/math/Vector2";
import { Prefab } from "../../engine/core/ECS/Prefab";
import { MinerBehavior } from "../entities/MinerBehavior";

export class MinerPrefab extends Prefab {
    constructor() {
        super();

        const spriteRenderer = this.AddComponent(SpriteRenderer);
        spriteRenderer.initialize("miner", 50, 75, new Vector2(0, 0));

        const progressBar = this.AddComponent(ProgressBarUI);
        progressBar.initialize(color(255, 214, 89), color(255), 0, 200 / 3, 15 / 2, new Vector2(-25 / 3, -25 / 2));

        this.AddComponent(MinerBehavior);
    }
}