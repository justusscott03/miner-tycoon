import { Component } from "../Component.js";
import { Vector2 } from "../math/Vector2.js";
export class Transform extends Component {
    constructor(position, /*rotation: Vector2,*/ scale) {
        super();
        this.position = new Vector2(0, 0);
        //rotation: Vector2; roation implemented later
        this.scale = new Vector2(1, 1);
        this.position = position;
        this.scale = scale;
    }
}
