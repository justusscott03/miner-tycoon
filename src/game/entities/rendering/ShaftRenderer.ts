// src/rendering/ShaftRenderer

import { fill, stroke } from "../../../engine/lib/colors";
import { rect } from "../../../engine/lib/shapes";
import { textAlign, text } from "../../../engine/lib/text";

import { MinerRenderer } from "./MinerRenderer";
//import { CrateRenderer } from "./CrateRenderer";
import { UpgradeableRenderer } from "./UpgradeableRenderer";

import { ShaftState } from "../state/ShaftState";
import { CanvasManager } from "../../../engine/helpers/CanvasManager";

export class ShaftRenderer extends UpgradeableRenderer {
    protected state: ShaftState;

    //private crateRenderer!: CrateRenderer;
    private minerRenderers: MinerRenderer[];

    constructor(state: ShaftState) {
        super();
        this.state = state;

        //this.crateRenderer = new CrateRenderer(state.crate);
        this.minerRenderers = state.miners.map(m => new MinerRenderer());
    }

    render() {
        const s = this.state;

        // Draw shaft
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

        // Draw miners
        for (const minerRenderer of this.minerRenderers) {
            minerRenderer.render();
        }

        // Draw crate
        //this.crateRenderer.Render();

        // Draw upgrade UI (from base class)
        super.Render();
    }
}
