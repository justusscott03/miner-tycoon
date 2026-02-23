import { Time } from "./helpers/TimeManager.js";
import { UserInput } from "./ui/UserInput.js";
export class Engine {
    static start(game) {
        this._game = game;
        this.loop();
    }
    static loop() {
        Time.update();
        this._game.update();
        this._game.render();
        UserInput.Instance.update();
        requestAnimationFrame(() => this.loop());
    }
}
