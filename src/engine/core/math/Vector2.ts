export class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    set(newX: number, newY: number) {
        this.x = newX;
        this.y = newY;
    }

    static add(a: Vector2, b: Vector2) {
        return new Vector2(a.x + b.x, a.y + b.y);
    }

    add(add: Vector2): Vector2 {
        this.x += add.x;
        this.y += add.y;
        return this;
    }

    static sub(a: Vector2, b: Vector2) {
        return new Vector2(a.x - b.x, a.y - b.y);
    }

    sub(sub: Vector2): Vector2 {
        this.x -= sub.x;
        this.y -= sub.y;
        return this;
    }

    static multiply(a: Vector2, b: Vector2){
        return new Vector2(a.x * b.x, a.y * b.y);
    }

    multiply(scale: Vector2): Vector2 {
        this.x *= scale.x;
        this.y *= scale.y;
        return this;
    }

    static dist(a: Vector2, b: Vector2) {
        let distX = Math.abs(a.x - b.x);
        let distY = Math.abs(a.y - b.y);

        return new Vector2(Math.sqrt(distX * distX), Math.sqrt(distY * distY));
    }

    clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    static get zero(): Vector2 {
        return new Vector2(0, 0);
    }

    static get right(): Vector2 {
        return new Vector2(1, 0);
    }

    static get left(): Vector2 {
        return new Vector2(-1, 0);
    }

    static get up(): Vector2 {
        return new Vector2(0, 1);
    }

    static get down(): Vector2 {
        return new Vector2(0, -1);
    }
}