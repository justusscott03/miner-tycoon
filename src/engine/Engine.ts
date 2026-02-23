import { Game } from "../game/Game.js";
import { Time } from "./helpers/TimeManager.js";
import { UserInput } from "./ui/UserInput.js";

export class Engine {
    private static _game: Game;

    static start(game: Game) {
        this._game = game;
        this.loop();
    }

    private static loop() {
        Time.update();
        this._game.update();
        this._game.render();
        UserInput.Instance.update();
        requestAnimationFrame(() => this.loop());
    }
}
