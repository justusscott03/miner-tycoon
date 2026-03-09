import { Component } from "../Component.js";
import { Vector2 } from "../math/Vector2.js";
export class UIComponent extends Component {
    constructor() {
        super(...arguments);
        this.screenSpace = true; // default: UI is screen-space
        this.relativePosition = Vector2.zero;
        this.hidden = false;
    }
    RenderUI() { }
}
