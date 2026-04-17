// src/rendering/ElevatorRenderer

import { pushMatrix, translate, scale, popMatrix } from "../../../engine/lib/transformation";
import { noStroke, fill } from "../../../engine/lib/colors";
import { rect, image } from "../../../engine/lib/shapes";
import { textAlign, text } from "../../../engine/lib/text";
import { map } from "../../../engine/lib/math";

import { ImageManager } from "../../../engine/helpers/ImageManager";

import { ElevatorStates } from "../../config/ElevatorStates";
import { ElevatorState } from "../state/ElevatorState";

export class ElevatorRenderer {
    state: ElevatorState;

    constructor(state: ElevatorState) {
        this.state = state;
    }

    render() {
        const e = this.state;

        pushMatrix();
        translate(e.x, e.y);
        scale(e.w / 110, e.h / 170);

        image(ImageManager.Instance.get("elevator"), 0, 0, 110, 170);

        fill(255);
        textAlign("CENTER", "CENTER");
        text(e.money.toString(), e.w / 2, e.h / 2);

        if (e.action === ElevatorStates.Loading || e.action === ElevatorStates.Unloading) {
            noStroke();
            fill(255);
            rect(35, 8.5, 40, 5, 1);

            fill(255, 214, 89);
            const timer = e.action === ElevatorStates.Loading ? e.loadTimer : e.unloadTimer;
            rect(35, 8.5, map(timer, 0, e.loadBarMax, 0, 40), 5, 1);
        }

        popMatrix();
    }
}
