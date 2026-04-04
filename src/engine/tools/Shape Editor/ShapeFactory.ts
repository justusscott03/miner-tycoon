import { ShapeRegistry, ShapeTypes } from "../ShapeEditor.js";

export class ShapeFactory {
    create(type: ShapeTypes, x: number, y: number) {
        const BindingClass = ShapeRegistry[type];
        const shape = new BindingClass().clone();

        shape.name = `${type}`;

        if (shape.params.x) shape.params.x.value = x;
        if (shape.params.y) shape.params.y.value = y;

        return shape;
    }
}

