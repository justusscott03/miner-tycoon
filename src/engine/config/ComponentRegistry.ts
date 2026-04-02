import { ComponentDefinition } from "../core/ECS/main/Component.js";
import { SpriteRenderer, SpriteRendererDef } from "../core/ECS/components/SpriteRenderer.js";
import { ProgressBarUIDef } from "../core/ECS/components/ui/ProgressBarUI.js";

type AnyComponentDefinition = ComponentDefinition<any>;

export const ComponentRegistry: Record<string, AnyComponentDefinition> = {
    SpriteRenderer: SpriteRendererDef,
    ProgressBarUI: ProgressBarUIDef
};