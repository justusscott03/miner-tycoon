export class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    Set(newX: number, newY: number) {
        this.x = newX;
        this.y = newY;
    }

    static Add(a: Vector2, b: Vector2) {
        return new Vector2(a.x + b.x, a.y + b.y);
    }

    Add(add: Vector2){
        this.x += add.x;
        this.y += add.y;
    }

    static Sub(a: Vector2, b: Vector2) {
        return new Vector2(a.x - b.x, a.y - b.y);
    }

    Sub(sub: Vector2){
        this.x -= sub.x;
        this.y -= sub.y;
    }

    static Scale(a: Vector2, b: Vector2){
        return new Vector2(a.x * b.x, a.y * b.y);
    }

    Scale(scale: Vector2){
        this.x *= scale.x;
        this.y *= scale.y;
    }

    static Dist(a: Vector2, b: Vector2) {
        let distX = Math.abs(a.x - b.x);
        let distY = Math.abs(a.y - b.y);

        return new Vector2(Math.sqrt(distX * distX), Math.sqrt(distY * distY));
    }
}