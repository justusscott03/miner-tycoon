import { GameObject } from "../../engine/core/GameObject.js";
export class Prefab extends GameObject {
    static instantiate() {
        return new this();
    }
}
