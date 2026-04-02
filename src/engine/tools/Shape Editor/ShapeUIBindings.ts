import { ParamUI } from "../Prefab Generator System/ParamUI.js";

export abstract class ShapeUIBindings<TParams extends Record<string, ParamUI<any>>> {
    params!: TParams;

    clone(): this {
        const cloned = Object.create(this.constructor.prototype) as this;

        const newParams: any = {};
        for (const key in this.params) {
            newParams[key] = this.params[key].clone();
        }

        cloned.params = newParams;
        return cloned;
    }

    abstract toCode(): string;
    abstract render(ctx: CanvasRenderingContext2D): void;
}


