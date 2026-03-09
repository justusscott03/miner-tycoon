import { Component } from "../engine/core/Component.js";
import { GameObject } from "../engine/core/GameObject.js";
class A extends Component {
    constructor() {
        super();
        //this.transform = new Transform(new Vector2(0, 10), new Vector2(20, 20));
    }
}
const go = new GameObject();
go.transform.position.x = 100;
go.AddComponent(A);
const t = go.GetComponent(A);
console.log(t === null || t === void 0 ? void 0 : t.transform.position);
