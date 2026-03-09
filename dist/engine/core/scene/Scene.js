import { background } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { CanvasManager } from "../../helpers/CanvasManager.js";
import { RigidBody2D } from "../components/physics/RigidBody2D.js";
import { Renderer } from "../components/Renderer.js";
import { UIComponent } from "../components/UIComponent.js";
import { MonoBehavior } from "../MonoBehavior.js";
export class Scene {
    constructor() {
        this.gameObjects = [];
        this.started = false;
        this.destroyQueue = [];
    }
    addGameObject(go) {
        var _a, _b;
        this.gameObjects.push(go);
        if (this.started) {
            // Run Awake immediately
            for (const comp of go.components) {
                if (comp instanceof MonoBehavior) {
                    (_a = comp.Awake) === null || _a === void 0 ? void 0 : _a.call(comp);
                }
            }
            // Run Start immediately
            for (const comp of go.components) {
                if (comp instanceof MonoBehavior && comp.enabled) {
                    (_b = comp.Start) === null || _b === void 0 ? void 0 : _b.call(comp);
                }
            }
        }
        return go;
    }
    removeGameObject(go) {
        this.destroyQueue.push(go);
    }
    awake() {
        var _a;
        for (const go of this.gameObjects) {
            for (const comp of go.components) {
                if (comp instanceof MonoBehavior) {
                    (_a = comp.Awake) === null || _a === void 0 ? void 0 : _a.call(comp);
                }
            }
        }
    }
    /** Called once before the first update */
    start() {
        var _a;
        this.awake();
        for (const go of this.gameObjects) {
            for (const comp of go.components) {
                if (comp instanceof MonoBehavior && comp.enabled) {
                    (_a = comp.Start) === null || _a === void 0 ? void 0 : _a.call(comp);
                }
            }
        }
        this.started = true;
    }
    fixedUpdate() {
        var _a;
        // Call MonoBehavior.FixedUpdate()
        for (const go of this.gameObjects) {
            for (const comp of go.components) {
                if (comp instanceof MonoBehavior && comp.enabled) {
                    (_a = comp.FixedUpdate) === null || _a === void 0 ? void 0 : _a.call(comp);
                }
            }
        }
        // Physics step
        for (const go of this.gameObjects) {
            const rb = go.GetComponent(RigidBody2D);
            if (rb)
                rb.physicsStep();
        }
    }
    /** Called every frame */
    update() {
        var _a;
        if (!this.started)
            this.start();
        for (const go of this.gameObjects) {
            for (const comp of go.components) {
                if (comp instanceof MonoBehavior && comp.enabled) {
                    (_a = comp.Update) === null || _a === void 0 ? void 0 : _a.call(comp);
                }
            }
        }
        // Process destruction safely
        if (this.destroyQueue.length > 0) {
            for (const go of this.destroyQueue) {
                const index = this.gameObjects.indexOf(go);
                if (index !== -1) {
                    this.gameObjects.splice(index, 1);
                }
            }
            this.destroyQueue.length = 0;
        }
    }
    /** Called every frame after update */
    lateUpdate() {
        var _a;
        for (const go of this.gameObjects) {
            for (const comp of go.components) {
                if (comp instanceof MonoBehavior && comp.enabled) {
                    (_a = comp.LateUpdate) === null || _a === void 0 ? void 0 : _a.call(comp);
                }
            }
        }
    }
    /** Called every frame to draw */
    render() {
        const ctx = CanvasManager.ctx;
        background(150, 150, 150);
        for (const go of this.gameObjects) {
            this.renderGameObject(go, ctx);
        }
    }
    renderGameObject(go, ctx) {
        ctx.save();
        go.transform.applyToContext(ctx);
        for (const comp of go.components) {
            if (comp instanceof Renderer)
                comp.Render();
        }
        for (const child of go.children) {
            this.renderGameObject(child, ctx);
        }
        ctx.restore();
    }
    renderUI() {
        var _a;
        for (const go of this.gameObjects) {
            for (const comp of go.components) {
                if (comp instanceof UIComponent) {
                    if (!comp.hidden) {
                        (_a = comp.RenderUI) === null || _a === void 0 ? void 0 : _a.call(comp);
                    }
                }
            }
        }
    }
}
