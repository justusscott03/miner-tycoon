import { SceneManager } from "./engine/core/scene/SceneManager.js";
import { Engine } from "./engine/Engine.js";
import { TestScene } from "./game/TestScene.js";

SceneManager.loadScene(new TestScene());
Engine.start();

