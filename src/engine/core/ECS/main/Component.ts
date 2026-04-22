import { ParamUI } from "../../../ui/UIBindings/ParamUI";
import { Transform } from "../components/Transform";
import { EngineObject } from "./EngineObject";
import { GameObject } from "./GameObject";

export type ComponentDefinition<TParams extends Record<string, ParamUI<any>>> = {
    params: TParams;
};

export type InferValues<TDef extends ComponentDefinition<any>> = {
    [K in keyof TDef["params"]]: TDef["params"][K] extends ParamUI<infer V> ? V : never;
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
