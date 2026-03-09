import { Component } from "../Component.js";
import { Vector2 } from "../math/Vector2.js";
export class Transform extends Component {
    constructor() {
        super();
        this.position = new Vector2(0, 0); // local position
        this.scale = new Vector2(1, 1); // local scale
        this.rotation = 0; // local rotation (radians)
        this.parent = null; // parent transform
    }
    // -------------------------
    // World-space getters
    // -------------------------
    get worldPosition() {
        if (!this.parent)
            return this.position.clone();
        return this.parent.worldPosition.add(this.position);
    }
    get worldScale() {
        if (!this.parent)
            return this.scale.clone();
        return this.parent.worldScale.multiply(this.scale);
    }
    get worldRotation() {
        if (!this.parent)
            return this.rotation;
        return this.parent.worldRotation + this.rotation;
    }
    // -------------------------
    // Apply to Canvas context
    // -------------------------
    applyToContext(ctx) {
        const pos = this.worldPosition;
        const scale = this.worldScale;
        const rot = this.worldRotation;
        ctx.translate(pos.x, pos.y);
        ctx.rotate(rot);
        ctx.scale(scale.x, scale.y);
    }
}
