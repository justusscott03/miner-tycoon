import { ScreenManager } from "../engine/helpers/ScreenManager.js";
import { ImageManager } from "../engine/helpers/ImageManager.js";
import { Database } from "../engine/helpers/Database.js";
import { MoneySaveData, MoneyState } from "./state/MoneyState.js";

import { MineSaveData, MineState } from "./entities/state/MineState.js";
import { MineRenderer } from "./entities/rendering/MineRenderer.js";

import { Button } from "./ui/Button.js";

import { background } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { CanvasManager } from "../engine/helpers/CanvasManager.js";

type GameSaveData = {
    id: string;
    money: MoneySaveData;
    mineState: MineSaveData;
};


export class Game {
    screen: ScreenManager = ScreenManager.Instance;
    images: ImageManager;
    db: Database<GameSaveData>;

    money: MoneyState = MoneyState.Instance;
    mineState: MineState;
    mineRenderer: MineRenderer;
    buttons: Button[] = [];

    constructor() {
        // Setup canvas and resize listener
        CanvasManager.resize(
            this.screen.originalWidth,
            this.screen.originalHeight,
            this.screen.width,
            this.screen.height
        );

        this.screen.onResize(() => {
            CanvasManager.resize(
                this.screen.originalWidth,
                this.screen.originalHeight,
                this.screen.width,
                this.screen.height
            );
        });

        // Managers
        this.images = ImageManager.Instance;
        this.db = new Database<GameSaveData>("KhanMinerDB", 1);

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
    setupButtons(): void {
        this.buttons.push(
            new Button(100, 100, 100, 100, "Shaft", 40, () => this.mineState.buildShaft())
        );

        this.buttons.push(
            new Button(500, 0, 50, 50, "", 20, () => {
                document.getElementById("savePage")!.style.display = "block";
            })
        );
    }

    // --------------------------
    // SCROLL HANDLING
    // --------------------------
    setupScroll(): void {
        CanvasManager.canvas.addEventListener("wheel", (e) => {
            e.preventDefault();
            const targetY = this.mineState.y - e.deltaY * 2;
            this.mineState.y = Math.max(Math.min(targetY, 0), -4950);
        });
    }

    // --------------------------
    // AUTOSAVE
    // --------------------------
    setupAutoSave(): void {
        setInterval(() => this.saveGame(), 60000);
        window.addEventListener("beforeunload", () => this.saveGame());
    }

    // --------------------------
    // SAVE GAME
    // --------------------------
    async saveGame(): Promise<void> {
        const state: GameSaveData = {
            id: "main",
            money: this.money.toJSON(),
            mineState: this.mineState.toJSON()
        };

        await this.db.save(state);
    }

    // --------------------------
    // LOAD GAME
    // --------------------------
    async loadGame(): Promise<void> {
        const save = await this.db.load("main") as GameSaveData;
        if (!save) return;

        // Restore states
        this.money = MoneyState.fromJSON(save.money);
        this.mineState = MineState.fromJSON(save.mineState);
        this.mineRenderer = new MineRenderer(this.mineState);
    }

    // --------------------------
    // UPDATE
    // --------------------------
    update(): void {
        if (!this.images.loaded) {
            this.images.loadNext();
            return;
        }

        this.mineState.update();
    }

    // --------------------------
    // RENDER
    // --------------------------
    render(): void {
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
