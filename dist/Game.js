var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TimeManager } from "./helpers/TimeManager.js";
import { ScreenManager } from "./helpers/ScreenManager.js";
import { UserInput } from "./helpers/UserInput.js";
import { ImageManager } from "./helpers/ImageManager.js";
import { Database } from "./helpers/Database.js";
import { MoneyState } from "./engine/MoneyState.js";
import { MineState } from "./engine/MineState.js";
import { MineRenderer } from "./rendering/MineRenderer.js";
import { Button } from "./ui/Button.js";
import { background } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { pushMatrix, popMatrix, scale, resetMatrix } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/transformation.js";
export class Game {
    constructor() {
        this.money = MoneyState.Instance;
        this.buttons = [];
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.screen = new ScreenManager(716, 962);
        this.canvas.width = this.screen.originalWidth;
        this.canvas.height = this.screen.originalHeight;
        this.time = new TimeManager();
        this.input = new UserInput(this.canvas, this.screen);
        this.images = ImageManager.init(this.canvas);
        this.db = new Database("KhanMinerDB", 1);
        this.mineState = new MineState();
        this.mineRenderer = new MineRenderer(this.mineState);
        this.setupButtons();
        this.setupScroll();
        this.setupAutoSave();
        requestAnimationFrame(() => this.loop());
    }
    setupButtons() {
        this.buttons.push(new Button(100, 100, 100, 100, "Shaft", 40, () => {
            this.mineState.buildShaft();
        }, this.input));
        this.buttons.push(new Button(500, 0, 50, 50, "", 20, () => {
            document.getElementById("savePage").style.display = "block";
        }, this.input));
    }
    setupScroll() {
        this.canvas.addEventListener("wheel", (e) => {
            e.preventDefault();
            const targetY = this.mineState.y + e.deltaY * 2;
            this.mineState.y = Math.max(Math.min(targetY, 0), -4950);
        });
    }
    setupAutoSave() {
        setInterval(() => this.saveGame(), 60000);
        window.addEventListener("beforeunload", () => this.saveGame());
    }
    saveGame() {
        return __awaiter(this, void 0, void 0, function* () {
            const state = {
                money: this.money.toJSON(),
                mine: this.mineState.toJSON()
            };
            yield this.db.save("main", state);
        });
    }
    loadGame() {
        return __awaiter(this, void 0, void 0, function* () {
            const save = yield this.db.load("main");
            if (!save)
                return;
            this.money = MoneyState.fromJSON(save.data.money);
            this.mineState = MineState.fromJSON(save.data.mine);
            this.mineRenderer = new MineRenderer(this.mineState);
        });
    }
    loop() {
        this.time.update();
        if (!this.images.loaded) {
            this.images.loadNext();
            requestAnimationFrame(() => this.loop());
            return;
        }
        this.mineState.update(this.time.delta);
        resetMatrix();
        background(255);
        pushMatrix();
        scale(this.screen.scaledWidth / this.screen.originalWidth, this.screen.scaledHeight / this.screen.originalHeight);
        this.mineRenderer.display(this.time.delta);
        for (const btn of this.buttons) {
            btn.display();
        }
        popMatrix();
        this.input.update();
        requestAnimationFrame(() => this.loop());
    }
}
