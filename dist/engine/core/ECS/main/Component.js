import { EngineObject } from "./EngineObject.js";
export class Component extends EngineObject {
    get transform() {
        return this.gameObject.transform;
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
