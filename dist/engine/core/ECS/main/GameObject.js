import { Component } from "./Component.js";
import { Transform } from "../components/Transform.js";
import { EngineObject } from "./EngineObject.js";
export class GameObject extends EngineObject {
    constructor() {
        super();
        this.components = [];
        this.children = [];
        this.transform = new Transform();
        this.transform = this.AddComponent(Transform);
    }
    // -------------------------
    // AddComponent<T>
    // -------------------------
    AddComponent(type) {
        const comp = new type();
        comp.gameObject = this;
        this.components.push(comp);
        return comp;
    }
    GetComponent(type) {
        if (typeof type === "string") {
            return (this.components.find(c => c.constructor.name === type) || null);
        }
        const comp = this.components.find(c => c instanceof type);
        return comp ? comp : null;
    }
    // -------------------------
    // RemoveComponent
    // -------------------------
    RemoveComponent(type) {
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
            const index = this.components.findIndex(c => c.constructor.name === type);
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
    addChild(child) {
        child.transform.parent = this.transform;
        this.children.push(child);
    }
}
