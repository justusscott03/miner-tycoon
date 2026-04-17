import { Component } from "../main/Component";
import { Vector2 } from "../../math/Vector2";

export class UIComponent extends Component {
    screenSpace: boolean = true; // default: UI is screen-space
    relativePosition: Vector2 = Vector2.zero;
    hidden: boolean = false;

    RenderUI(): void {}
}
