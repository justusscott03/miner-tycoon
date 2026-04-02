import { ParamUI } from "../../../tools/Prefab Generator System/ParamUI.js";
import { Transform } from "../components/Transform.js";
import { EngineObject } from "./EngineObject.js";
import { GameObject } from "./GameObject.js";

export type ComponentDefinition<TValues> = {
    import: string;
    params: { [K in keyof TValues]: ParamUI<TValues[K]> };
};

export class Component extends EngineObject {
    gameObject!: GameObject;

    get transform(): Transform {
        return this.gameObject.transform;
    }

    GetComponent<T extends Component>(type: new (...args: any[]) => T): T | null;
    GetComponent(type: string): Component | null;

    GetComponent<T extends Component>(
        type: (new (...args: any[]) => T) | string
    ): T | Component | null {
        return this.gameObject.GetComponent(type as any);
    }


    AddComponent<T extends Component>(type: new (...args: any[]) => T): T {
        return this.gameObject.AddComponent(type);
    }

    RemoveComponent<T extends Component>(type: (new (...args: any[]) => T) | string | T): boolean {
        return this.gameObject.RemoveComponent(type);
    }
}
