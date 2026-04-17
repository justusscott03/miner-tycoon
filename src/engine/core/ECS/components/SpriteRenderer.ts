import { ImageManager } from "../../../helpers/ImageManager";
import { image } from "../../../lib/shapes";
import { Renderer } from "./Renderer";
import { Vector2 } from "../../math/Vector2";
import { ComponentDefinition } from "../main/Component";
import { NumberUI } from "../../../ui/UIBindings/TypeUIBindings/NumberUI";
import { Vector2UI } from "../../../ui/UIBindings/TypeUIBindings/Vector2UI";
import { StringUI } from "../../../ui/UIBindings/TypeUIBindings/StringUI";

type SpriteRendererValues = {
    sprite: string;
    width: number;
    height: number;
    position: { x: number; y: number };
};

export const SpriteRendererDef: ComponentDefinition<SpriteRendererValues> = {
    import: "src/engine/core/ECS/components/SpriteRenderer.js",

    params: {
        sprite: new StringUI("Sprite Name"),
        width: new NumberUI(0),
        height: new NumberUI(0),
        position: new Vector2UI({ x: 0, y: 0 })
    }

};

export class SpriteRenderer extends Renderer {
    spriteName: string = "";
    width: number = 0;
    height: number = 0;
    spriteOffset: Vector2 = Vector2.zero;

    initialize(spriteName: string, width: number, height: number, spriteOffset: Vector2 = Vector2.zero) {
        this.spriteName = spriteName;
        this.width = width;
        this.height = height;
        this.spriteOffset = spriteOffset;
    }

    Render() {
        if (!this.spriteName) return;

        const img = ImageManager.Instance.get(this.spriteName);
        const scale = this.transform.scale;
        const offset = this.spriteOffset;

        image(img, offset.x, offset.y, this.width * scale.x, this.height * scale.y);
    }
}
