import { Behavior } from "./Behavior";

export class MonoBehavior extends Behavior {
    Awake(): void {}
    Start(): void {}
    FixedUpdate(): void {}
    Update(): void {}
    LateUpdate(): void {}
    OnDestroy(): void {}
}