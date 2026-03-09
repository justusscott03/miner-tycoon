import { GameObject } from "./GameObject.js";
export class Prefab extends GameObject {
    static instantiate() {
        return new this();
    }
}
