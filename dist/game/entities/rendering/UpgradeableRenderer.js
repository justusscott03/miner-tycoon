import { Renderer } from "../../../engine/core/ECS/components/Renderer.js";
import { Button } from "../../ui/Button.js";
export class UpgradeableRenderer extends Renderer {
    initialize(state) {
        this.state = state;
        const b = state.buttonData;
        this.button = new Button(b.x, b.y, b.w, b.h, `Level\n${state.level}`, b.fontSize, () => {
            state.upgradePage.pageOut = true;
        });
    }
    Render() {
        this.button.txt = `Level\n${this.state.level}`;
        this.button.display();
    }
}
