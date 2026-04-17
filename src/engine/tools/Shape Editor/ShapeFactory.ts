import { ShapeRegistry, ShapeTypes } from "../ShapeEditor";
import { Layer } from "./Layers/Layer";

export class ShapeFactory {
    create(type: ShapeTypes, x: number, y: number): Layer {
        const BindingClass = ShapeRegistry[type];
        const shape = new BindingClass().clone();

        // Give the shape a default name
        shape.name = `${type}`;

        // Initialize position if supported
        if (shape.params.x) shape.params.x.value = x;
        if (shape.params.y) shape.params.y.value = y;

        // Create a proper Layer instance (class-based)
        const layer = new Layer(shape.name, shape);

        return layer;
    }
}
