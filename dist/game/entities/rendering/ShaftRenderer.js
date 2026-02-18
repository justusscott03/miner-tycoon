// src/rendering/ShaftRenderer.js
import { fill, stroke } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { rect } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/shapes.js";
import { textAlign, text } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/text.js";
import { MinerRenderer } from "./MinerRenderer.js";
import { CrateRenderer } from "./CrateRenderer.js";
import { UpgradeableRenderer } from "./UpgradeableRenderer.js";
import { CanvasManager } from "../../../engine/helpers/CanvasManager.js";
export class ShaftRenderer {
    constructor(state, input) {
        this.state = state;
        this.upgradeRenderer = new UpgradeableRenderer(state, input);
        this.crateRenderer = new CrateRenderer(state.crate);
        this.minerRenderers = state.miners.map(miner => new MinerRenderer(miner));
    }
    draw(delta) {
        const s = this.state;
        fill(150);
        rect(s.x, s.y, s.w, s.h);
        stroke(0);
        fill(100, 100, 100);
        rect(127, s.y + 25, 46, 46, 10);
        rect(131, s.y + 29, 38, 38, 8);
        fill(0);
        rect(s.x, s.y + s.h, s.w, 13);
        fill(255);
        CanvasManager.ctx.font = "bold 30px Arial";
        textAlign("CENTER", "CENTER");
        text(s.id.toString(), 150, s.y + 50);
        for (const minerRenderer of this.minerRenderers) {
            minerRenderer.display(delta);
        }
        this.crateRenderer.display();
        if (s.pageOutButton) {
            s.pageOutButton.draw();
        }
        this.upgradeRenderer.display();
    }
    display(delta) {
        this.state.update(delta);
        this.draw(delta);
    }
}
