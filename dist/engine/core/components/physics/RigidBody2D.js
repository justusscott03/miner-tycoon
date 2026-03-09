import { Component } from "../../Component.js";
import { Time } from "../../../helpers/TimeManager.js";
import { Physics2D } from "../../../config/Physics2D.js"; // We'll define this next
export class RigidBody2D extends Component {
    constructor() {
        super(...arguments);
        this.linearVelocity = { x: 0, y: 0 };
        this.useGravity = true;
        this.gravityScale = 1;
        this.mass = 1;
    }
    physicsStep() {
        // Apply gravity
        if (this.useGravity) {
            this.linearVelocity.y += Physics2D.gravity.y * this.gravityScale * Time.fixedDeltaTime;
            this.linearVelocity.x += Physics2D.gravity.x * this.gravityScale * Time.fixedDeltaTime;
        }
        // Integrate velocity → position
        this.transform.position.x += this.linearVelocity.x * Time.fixedDeltaTime;
        this.transform.position.y += this.linearVelocity.y * Time.fixedDeltaTime;
    }
}
