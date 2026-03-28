var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ScreenManager } from "../engine/helpers/ScreenManager.js";
import { ImageManager } from "../engine/helpers/ImageManager.js";
import { Database } from "../engine/helpers/Database.js";
import { MoneyState } from "./state/MoneyState.js";
import { MineState } from "./entities/state/MineState.js";
import { MineRenderer } from "./entities/rendering/MineRenderer.js";
import { Button } from "./ui/Button.js";
import { background } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { CanvasManager } from "../engine/helpers/CanvasManager.js";
export class Game {
    constructor() {
        this.screen = ScreenManager.Instance;
        this.money = MoneyState.Instance;
        this.buttons = [];
        // Setup canvas and resize listener
        CanvasManager.resize(this.screen.originalWidth, this.screen.originalHeight, this.screen.width, this.screen.height);
        this.screen.onResize(() => {
            CanvasManager.resize(this.screen.originalWidth, this.screen.originalHeight, this.screen.width, this.screen.height);
        });
        // Managers
        this.images = ImageManager.Instance;
        this.db = new Database("KhanMinerDB", 1);
        // Game state
        this.mineState = new MineState();
        this.mineRenderer = new MineRenderer(this.mineState);
        // UI
        this.setupButtons();
        this.setupScroll();
        this.setupAutoSave();
    }
    // --------------------------
    // BUTTONS
    // --------------------------
    setupButtons() {
        this.buttons.push(new Button(100, 100, 100, 100, "Shaft", 40, () => this.mineState.buildShaft()));
        this.buttons.push(new Button(500, 0, 50, 50, "", 20, () => {
            document.getElementById("savePage").style.display = "block";
        }));
    }
    // --------------------------
    // SCROLL HANDLING
    // --------------------------
    setupScroll() {
        CanvasManager.canvas.addEventListener("wheel", (e) => {
            e.preventDefault();
            const targetY = this.mineState.y - e.deltaY * 2;
            this.mineState.y = Math.max(Math.min(targetY, 0), -4950);
        });
    }
    // --------------------------
    // AUTOSAVE
    // --------------------------
    setupAutoSave() {
        setInterval(() => this.saveGame(), 60000);
        window.addEventListener("beforeunload", () => this.saveGame());
    }
    // --------------------------
    // SAVE GAME
    // --------------------------
    saveGame() {
        return __awaiter(this, void 0, void 0, function* () {
            const state = {
                id: "main",
                money: this.money.toJSON(),
                mineState: this.mineState.toJSON()
            };
            yield this.db.save(state);
        });
    }
    // --------------------------
    // LOAD GAME
    // --------------------------
    loadGame() {
        return __awaiter(this, void 0, void 0, function* () {
            const save = yield this.db.load("main");
            if (!save)
                return;
            // Restore states
            this.money = MoneyState.fromJSON(save.money);
            this.mineState = MineState.fromJSON(save.mineState);
            this.mineRenderer = new MineRenderer(this.mineState);
        });
    }
    // --------------------------
    // UPDATE
    // --------------------------
    update() {
        if (!this.images.loaded) {
            this.images.loadNext();
            return;
        }
        this.mineState.update();
    }
    // --------------------------
    // RENDER
    // --------------------------
    render() {
        if (!this.images.loaded) {
            background(200); // loading screen
            return;
        }
        background(255);
        this.mineState.update();
        this.mineRenderer.render();
        for (const btn of this.buttons) {
            btn.display();
        }
    }
}
