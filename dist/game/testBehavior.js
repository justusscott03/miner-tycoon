import { MonoBehavior } from "../engine/core/MonoBehavior.js";
import { Time } from "../engine/helpers/TimeManager.js";
export class TestBehavior extends MonoBehavior {
    Awake() {
        console.log("Awake fired");
    }
    Start() {
        console.log("Start fired");
    }
    Update() {
        this.transform.position.x += 50 * Time.deltaTime;
        console.log(Time.fps);
    }
    LateUpdate() {
        // Just to confirm it runs
        // console.log("LateUpdate fired");
    }
}
