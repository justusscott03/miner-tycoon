import { ImageManager } from "../../../helpers/ImageManager.js";
import { image } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/shapes.js";
import { Renderer } from "./Renderer.js";
import { Vector2 } from "../../math/Vector2.js";
import { NumberUI } from "../../../utils/Prefab Generator System/ParamUI Types/NumberUI.js";
import { Vector2UI } from "../../../utils/Prefab Generator System/ParamUI Types/Vector2UI.js";
import { StringUI } from "../../../utils/Prefab Generator System/ParamUI Types/StringUI.js";
export const SpriteRendererDef = {
    import: "src/engine/core/components/SpriteRenderer.js",
    params: {
        sprite: new StringUI(""),
        width: new NumberUI(0),
        height: new NumberUI(0),
        position: new Vector2UI({ x: 0, y: 0 })
    }
};
export class SpriteRenderer extends Renderer {
    constructor(spriteName, width, height, spriteOffset = Vector2.zero) {
        super();
        this.spriteName = "";
        this.width = 0;
        this.height = 0;
        this.spriteOffset = Vector2.zero;
        this.spriteName = spriteName;
        this.width = width;
        this.height = height;
        this.spriteOffset = spriteOffset;
    }
    initialize(spriteName, width, height, spriteOffset = Vector2.zero) {
        this.spriteName = spriteName;
        this.width = width;
        this.height = height;
        this.spriteOffset = spriteOffset;
    }
    Render() {
        if (!this.spriteName)
            return;
        const img = ImageManager.Instance.get(this.spriteName);
        const scale = this.transform.scale;
        const offset = this.spriteOffset;
        image(img, offset.x, offset.y, this.width * scale.x, this.height * scale.y);
    }
}
