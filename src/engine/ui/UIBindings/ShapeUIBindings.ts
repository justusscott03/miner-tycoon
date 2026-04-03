import { ColorUI } from "./TypeUIBindings/ColorUI.js";
import { NumberUI } from "./TypeUIBindings/NumberUI.js";
import { ParamUI } from "./ParamUI.js";

export interface BaseParams {
    x: NumberUI;
    y: NumberUI;
    color: ColorUI;
    stroke: ColorUI;
    strokeWeight: NumberUI;

    [key: string]: ParamUI<any>;
}


export abstract class ShapeUIBindings<TParams extends BaseParams> {
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
    abstract hitTest(point: { x: number; y: number }): boolean;
}


