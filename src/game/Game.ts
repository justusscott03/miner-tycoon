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
    screen: ScreenManager = ScreenManager.Instance;
    images: ImageManager;
    db: Database;

    money: MoneyState = MoneyState.Instance;

    mineState: MineState;
    mineRenderer: MineRenderer;

    buttons: Button[] = [];

    constructor() {
        // Internal resolution
        CanvasManager.resize(this.screen.originalWidth, this.screen.originalHeight, this.screen.width, this.screen.height);
        this.screen.onResize(() => {
            CanvasManager.resize(this.screen.originalWidth, this.screen.originalHeight, this.screen.width, this.screen.height);
        });
        
        this.images = ImageManager.Instance;
        this.db = new Database("KhanMinerDB", 1);

        this.mineState = new MineState();
        this.mineRenderer = new MineRenderer(this.mineState);

        this.setupButtons();
        this.setupScroll();
        this.setupAutoSave();
    }

    setupButtons() {
        this.buttons.push(
            new Button(100, 100, 100, 100, "Shaft", 40, () => {
                this.mineState.buildShaft();
            })
        );

        this.buttons.push(
            new Button(500, 0, 50, 50, "", 20, () => {
                document.getElementById("savePage")!.style.display = "block";
            })
        );
    }

    setupScroll() {
        CanvasManager.canvas.addEventListener("wheel", (e) => {
            e.preventDefault();
            const targetY = this.mineState.y - e.deltaY * 2;
            this.mineState.y = Math.max(Math.min(targetY, 0), -4950);
        });
    }

    setupAutoSave() {
        setInterval(() => this.saveGame(), 60000);
        window.addEventListener("beforeunload", () => this.saveGame());
    }

    async saveGame() {
        const state = {
            money: this.money.toJSON(),
            mine: this.mineState.toJSON()
        };

        await this.db.save("main", state);
    }

    async loadGame() {
        const save = await this.db.load("main");
        if (!save) return;

        this.money = MoneyState.fromJSON(save.data.money);
        this.mineState = MineState.fromJSON(save.data.mine);
        this.mineRenderer = new MineRenderer(this.mineState);
    }

    update() {
        if (!this.images.loaded) {
            this.images.loadNext();
            return;
        }

        this.mineState.update();
    }

    render() {
        if (!this.images.loaded) {
            // Optional: draw a loading screen
            background(200);
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
