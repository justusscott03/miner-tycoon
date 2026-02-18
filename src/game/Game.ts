import { TimeManager } from "../engine/helpers/TimeManager.js";
import { ScreenManager } from "../engine/helpers/ScreenManager.js";
import { UserInput } from "../engine/ui/UserInput.js";
import { ImageManager } from "../engine/helpers/ImageManager.js";
import { Database } from "../engine/helpers/Database.js";
import { MoneyState } from "./state/MoneyState.js";

import { MineState } from "./entities/state/MineState.js";
import { MineRenderer } from "./entities/rendering/MineRenderer.js";

import { Button } from "./ui/Button.js";

import { background } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { CanvasManager } from "../engine/helpers/CanvasManager.js";

export class Game {
    time: TimeManager;
    screen: ScreenManager;
    input: UserInput;
    images: ImageManager;
    db: Database;

    money: MoneyState = MoneyState.Instance;

    mineState: MineState;
    mineRenderer: MineRenderer;

    buttons: Button[] = [];

    constructor() {
        // CanvasManager already initialized in index.ts
        const canvas = CanvasManager.canvas;

        this.screen = new ScreenManager(716, 962);

        // Internal resolution
        CanvasManager.resize(this.screen.originalWidth, this.screen.originalHeight, this.screen.width, this.screen.height);
        this.screen.onResize(() => {
            CanvasManager.resize(this.screen.originalWidth, this.screen.originalHeight, this.screen.width, this.screen.height);
        });

        this.time = new TimeManager();
        this.input = new UserInput(canvas, this.screen);
        this.images = ImageManager.init(canvas);
        this.db = new Database("KhanMinerDB", 1);

        this.mineState = new MineState();
        this.mineRenderer = new MineRenderer(this.mineState, this.input);

        this.setupButtons();
        this.setupScroll();
        this.setupAutoSave();

        requestAnimationFrame(() => this.loop());
    }

    setupButtons() {
        this.buttons.push(
            new Button(100, 100, 100, 100, "Shaft", 40, () => {
                this.mineState.buildShaft();
            }, this.input)
        );

        this.buttons.push(
            new Button(500, 0, 50, 50, "", 20, () => {
                document.getElementById("savePage")!.style.display = "block";
            }, this.input)
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
        this.mineRenderer = new MineRenderer(this.mineState, this.input);
    }

    loop() {
        this.time.update();

        if (!this.images.loaded) {
            this.images.loadNext();
            requestAnimationFrame(() => this.loop());
            return;
        }

        this.mineState.update(this.time.delta);

        background(255);

        this.mineRenderer.display(this.time.delta);

        for (const btn of this.buttons) {
            btn.display();
        }

        this.input.update();

        requestAnimationFrame(() => this.loop());
    }
}
