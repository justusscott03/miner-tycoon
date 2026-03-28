import { GameObject } from "./main/GameObject.js";
export class Prefab extends GameObject {
    static instantiate() {
        return new this();
    }
}
