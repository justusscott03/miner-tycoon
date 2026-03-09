import { Component } from "./Component.js";
export class Behavior extends Component {
    constructor() {
        super(...arguments);
        this.enabled = true;
    }
}
