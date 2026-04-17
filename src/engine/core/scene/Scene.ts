import { background } from "../../lib/colors";
import { CanvasManager } from "../../helpers/CanvasManager";
import { RigidBody2D } from "../ECS/components/physics/RigidBody2D";
import { Renderer } from "../ECS/components/Renderer";
import { UIComponent } from "../ECS/components/UIComponent";
import { GameObject } from "../ECS/main/GameObject";
import { MonoBehavior } from "../ECS/main/MonoBehavior";

export class Scene {
    private gameObjects: GameObject[] = [];
    private started: boolean = false;
    private destroyQueue: GameObject[] = [];

    addGameObject(go: GameObject): GameObject {
        this.gameObjects.push(go);

        if (this.started) {
            // Run Awake immediately
            for (const comp of go.components) {
                if (comp instanceof MonoBehavior) {
                    comp.Awake?.();
                }
            }

            // Run Start immediately
            for (const comp of go.components) {
                if (comp instanceof MonoBehavior && comp.enabled) {
                    comp.Start?.();
                }
            }
        }

        return go;
    }

    removeGameObject(go: GameObject) {
        this.destroyQueue.push(go);
    }

    private awake() {
        for (const go of this.gameObjects) {
            for (const comp of go.components) {
                if (comp instanceof MonoBehavior) {
                    comp.Awake?.();
                }
            }
        }
    }

    /** Called once before the first update */
    private start() {
        this.awake();

        for (const go of this.gameObjects) {
            for (const comp of go.components) {
                if (comp instanceof MonoBehavior && comp.enabled) {
                    comp.Start?.();
                }
            }
        }
        this.started = true;
    }

    fixedUpdate() {
        // Call MonoBehavior.FixedUpdate()
        for (const go of this.gameObjects) {
            for (const comp of go.components) {
                if (comp instanceof MonoBehavior && comp.enabled) {
                    comp.FixedUpdate?.();
                }
            }
        }

        // Physics step
        for (const go of this.gameObjects) {
            const rb = go.GetComponent(RigidBody2D);
            if (rb) rb.physicsStep();
        }
    }


    /** Called every frame */
    update() {
        if (!this.started) this.start();

        for (const go of this.gameObjects) {
            for (const comp of go.components) {
                if (comp instanceof MonoBehavior && comp.enabled) {
                    comp.Update?.();
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
        for (const go of this.gameObjects) {
            for (const comp of go.components) {
                if (comp instanceof MonoBehavior && comp.enabled) {
                    comp.LateUpdate?.();
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

    private renderGameObject(go: GameObject, ctx: CanvasRenderingContext2D) {
        ctx.save();

        go.transform.applyToContext(ctx);

        for (const comp of go.components) {
            if (comp instanceof Renderer) comp.Render();
        }

        for (const child of go.children) {
            this.renderGameObject(child, ctx);
        }

        ctx.restore();
    }

    renderUI() {
        for (const go of this.gameObjects) {
            for (const comp of go.components) {
                if (comp instanceof UIComponent) {
                    if (!comp.hidden) {
                        comp.RenderUI?.();
                    }
                }
            }
        }
    }

}
