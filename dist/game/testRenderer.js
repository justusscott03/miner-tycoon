import { Renderer } from "../engine/core/components/Renderer.js";
import { fill } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { rect } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/shapes.js";
export class TestRenderer extends Renderer {
    Render() {
        const pos = this.transform.position;
        fill(255, 0, 0);
        rect(pos.x, pos.y, 50, 50);
    }
}
