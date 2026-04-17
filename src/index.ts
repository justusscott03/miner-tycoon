import { SceneManager } from "./engine/core/scene/SceneManager";
import { Engine } from "./engine/Engine";
import { TestScene } from "./game/TestScene";

SceneManager.loadScene(new TestScene());
Engine.start();

