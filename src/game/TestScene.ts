import { Scene } from "../engine/core/scene/Scene";
import { MinerPrefab } from "./prefabs/MinerPrefab";

export class TestScene extends Scene {
    constructor() {
        super();

        const miner = MinerPrefab.instantiate();
        miner.transform.position.set(200, 200);
        this.addGameObject(miner);
    }
}
