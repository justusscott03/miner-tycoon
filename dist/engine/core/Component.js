import { EngineObject } from "./EngineObject.js";
export class Component extends EngineObject {
    constructor() {
        super();
    }
    GetComponent(type) {
        return this.gameObject.GetComponent(type);
    }
    AddComponent(type) {
        return this.gameObject.AddComponent(type);
    }
    RemoveComponent(type) {
        return this.gameObject.RemoveComponent(type);
    }
}
