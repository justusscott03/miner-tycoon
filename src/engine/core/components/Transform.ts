import { Component } from "../Component.js";
import { Vector2 } from "../math/Vector2.js";

export class Transform extends Component{
    position: Vector2 = new Vector2(0, 0);
    //rotation: Vector2; roation implemented later
    scale: Vector2 = new Vector2(1, 1);

    constructor(position: Vector2, /*rotation: Vector2,*/ scale: Vector2){
        super();

        this.position = position;
        this.scale = scale;
    }
}