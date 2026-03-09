import { GameObject } from "./GameObject.js";

export class Prefab extends GameObject {
    static instantiate<T extends Prefab>(this: new () => T): T {
        return new this();
    }
}
