import { Component } from "../../Component.js";
export class Collider2D extends Component {
    constructor() {
        super(...arguments);
        this.isTrigger = false;
    }
    // Override in specific collider types
    get bounds() {
        return {
            x: this.transform.position.x,
            y: this.transform.position.y,
            width: 0,
            height: 0
        };
    }
}
