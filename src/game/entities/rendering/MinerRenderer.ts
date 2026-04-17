// src/rendering/MinerRenderer

import { pushMatrix, translate, scale, popMatrix } from "../../../engine/lib/transformation";
import { noStroke, fill } from "../../../engine/lib/colors";
import { image, rect } from "../../../engine/lib/shapes";
import { map } from "../../../engine/lib/math";

import { ImageManager } from "../../../engine/helpers/ImageManager";
import { MinerStates } from "../../config/MinerStates";

import { MinerState } from "../state/MinerState";
import { Renderer } from "../../../engine/core/ECS/components/Renderer";

export class MinerRenderer extends Renderer {
    state!: MinerState;

    initialize(state: MinerState) {
        this.state = state;
    }

    render() {
        const m = this.state;

        pushMatrix();

        translate(m.x + m.w / 2, m.y);
        scale((m.w / 50) * m.s, m.h / 75);

        image(ImageManager.Instance.get("miner"), -25, 0, 50, 75);

        if (m.action === MinerStates.Digging) {
            noStroke();
            fill(255);
            rect(-100 / 3, -25 / 2, 200 / 3, 15 / 2);

            fill(255, 214, 89);
            rect(
                -100 / 3,
                -25 / 2,
                map(m.has, 0, m.maxLoad, 0, 200 / 3),
                15 / 2
            );
        }

        popMatrix();
    }
}
