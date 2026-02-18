// src/rendering/UpgradeableRenderer.js

import { UserInput } from "../../../engine/ui/UserInput.js";
import { Button } from "../../ui/Button.js";
import { UpgradeableState } from "../state/UpgradeableState.js";

export class UpgradeableRenderer {
    state: UpgradeableState;
    button: Button;

    constructor(state: UpgradeableState, input: UserInput) {
        this.state = state;

        const b = state.buttonData;

        this.button = new Button(
            b.x,
            b.y,
            b.w,
            b.h,
            "Level\n" + state.level,
            b.fontSize,
            () => {
                state.upgradePage.pageOut = true;
            },
            input
        );

        state.pageOutButton = this.button;
    }

    update() {
        this.button.txt = "Level\n" + this.state.level;
    }

    draw() {
        this.button.draw();
    }

    display() {
        this.update();
        this.draw();
    }
}
