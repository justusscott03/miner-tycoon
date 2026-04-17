import { Renderer } from "../../../engine/core/ECS/components/Renderer";
import { Button } from "../../ui/Button";
import { UpgradeableState } from "../state/UpgradeableState";

export class UpgradeableRenderer extends Renderer {
    protected state!: UpgradeableState;
    button!: Button;

    initialize(state: UpgradeableState): void {
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

    Render(): void {
        this.button.txt = `Level\n${this.state.level}`;
        this.button.display();
    }
}
