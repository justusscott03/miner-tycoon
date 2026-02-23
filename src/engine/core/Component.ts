import { EngineObject } from "./EngineObject.js";
import { GameObject } from "./GameObject.js";
import { Transform } from "./components/Transform.js";

export class Component extends EngineObject {
    gameObject!: GameObject;
    transform!: Transform;

    constructor() {
        super();
    }

    GetComponent<T extends Component>(type: (new (...args: any[]) => T) | string): T | Component | null {
        return this.gameObject.GetComponent(type);
    }

    AddComponent<T extends Component>(type: new (...args: any[]) => T): T {
        return this.gameObject.AddComponent(type);
    }

    RemoveComponent<T extends Component>(type: (new (...args: any[]) => T) | string | T): boolean {
        return this.gameObject.RemoveComponent(type);
    }
}
