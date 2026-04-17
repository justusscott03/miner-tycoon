import { Component } from "./Component";
import { Transform } from "../components/Transform";
import { EngineObject } from "./EngineObject";

export class GameObject extends EngineObject {
    components: Component[] = [];
    children: GameObject[] = [];
    transform: Transform = new Transform();

    constructor() {
        super();
        this.transform = this.AddComponent(Transform);
    }

    // -------------------------
    // AddComponent<T>
    // -------------------------
    AddComponent<T extends Component>(type: new (...args: any[]) => T): T {
        const comp = new type();
        comp.gameObject = this;
        this.components.push(comp);
        return comp;
    }

    // -------------------------
    // GetComponent<T> overloads
    // -------------------------
    GetComponent<T extends Component>(type: new (...args: any[]) => T): T | null;
    GetComponent(type: string): Component | null;

    GetComponent<T extends Component>(
        type: (new (...args: any[]) => T) | string
    ): T | Component | null 
    {
        if (typeof type === "string") {
            return (
                this.components.find(c => c.constructor.name === type) || null
            );
        }

        const comp = this.components.find(c => c instanceof type);
        return comp ? (comp as T) : null;
    }

    // -------------------------
    // RemoveComponent
    // -------------------------
    RemoveComponent<T extends Component>(
        type: (new (...args: any[]) => T) | string | T
    ): boolean 
    {
        // Remove by instance
        if (type instanceof Component) {
            const index = this.components.indexOf(type);
            if (index !== -1) {
                this.components.splice(index, 1);
                return true;
            }
            return false;
        }

        // Remove by string name
        if (typeof type === "string") {
            const index = this.components.findIndex(
                c => c.constructor.name === type
            );
            if (index !== -1) {
                this.components.splice(index, 1);
                return true;
            }
            return false;
        }

        // Remove by constructor
        const index = this.components.findIndex(c => c instanceof type);
        if (index !== -1) {
            this.components.splice(index, 1);
            return true;
        }

        return false;
    }

    addChild(child: GameObject): void {
        child.transform.parent = this.transform;
        this.children.push(child);
    }
}
