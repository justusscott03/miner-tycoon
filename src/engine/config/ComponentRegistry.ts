import { ComponentDefinition } from "../core/ECS/main/Component";
import { SpriteRenderer, SpriteRendererDef } from "../core/ECS/components/SpriteRenderer";
import { ProgressBarUIDef } from "../core/ECS/components/ui/ProgressBarUI";

type AnyComponentDefinition = ComponentDefinition<any>;

export const ComponentRegistry: Record<string, AnyComponentDefinition> = {
    SpriteRenderer: SpriteRendererDef,
    ProgressBarUI: ProgressBarUIDef
};