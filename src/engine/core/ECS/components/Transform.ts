import { Component } from "../main/Component.js";
import { Vector2 } from "../../math/Vector2.js";

export class Transform extends Component {
    position: Vector2 = new Vector2(0, 0);      // local position
    scale: Vector2 = new Vector2(1, 1);         // local scale
    rotation: number = 0;                       // local rotation (radians)

    parent: Transform | null = null;            // parent transform

    constructor() {
        super();
    }

    // -------------------------
    // World-space getters
    // -------------------------

    get worldPosition(): Vector2 {
        if (!this.parent) return this.position.clone();
        return this.parent.worldPosition.add(this.position);
    }

    get worldScale(): Vector2 {
        if (!this.parent) return this.scale.clone();
        return this.parent.worldScale.multiply(this.scale);
    }

    get worldRotation(): number {
        if (!this.parent) return this.rotation;
        return this.parent.worldRotation + this.rotation;
    }

    // -------------------------
    // Apply to Canvas context
    // -------------------------

    applyToContext(ctx: CanvasRenderingContext2D) {
        const pos = this.worldPosition;
        const scale = this.worldScale;
        const rot = this.worldRotation;

        ctx.translate(pos.x, pos.y);
        ctx.rotate(rot);
        ctx.scale(scale.x, scale.y);
    }
}
