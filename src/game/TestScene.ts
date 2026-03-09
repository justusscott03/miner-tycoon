import { Scene } from "../engine/core/scene/Scene.js";
import { MinerPrefab } from "./prefabs/MinerPrefab.js";

export class TestScene extends Scene {
    constructor() {
        super();

        const miner = MinerPrefab.instantiate();
        miner.transform.position.set(200, 200);
        this.addGameObject(miner);
    }
}
