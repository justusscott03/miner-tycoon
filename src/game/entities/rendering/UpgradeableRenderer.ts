import { Button } from "../../ui/Button.js";
import { UpgradeableState } from "../state/UpgradeableState.js";

export class UpgradeableRenderer {
    protected state: UpgradeableState;
    protected button: Button;

    constructor(state: UpgradeableState) {
        this.state = state;

        const b = state.buttonData;

        this.button = new Button(
            b.x,
            b.y,
            b.w,
            b.h,
            `Level\n${state.level}`,
            b.fontSize,
            () => {
                state.upgradePage.pageOut = true;
            }
        );
    }

    render() {
        // Update presentation
        this.button.txt = `Level\n${this.state.level}`;

        // Draw
        this.button.display();
    }
}
