import { ColorUI } from "./TypeUIBindings/ColorUI";
import { NumberUI } from "./TypeUIBindings/NumberUI";
import { ParamUI } from "./ParamUI";
import { Bounds } from "../../tools/Shape Editor/Layers/BaseLayer";

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
    name: string;

    constructor() {
        this.name = this.constructor.name.replace("UIBindings", "");
    }

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
    abstract getBounds(): Bounds;
    abstract scaleFromBounds(oldB: Bounds, newB: Bounds, frozen: any): void;

    freezeLocalGeometry(): any {}
}


