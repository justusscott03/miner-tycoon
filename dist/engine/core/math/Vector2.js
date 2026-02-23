export class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    Set(newX, newY) {
        this.x = newX;
        this.y = newY;
    }
    static Add(a, b) {
        return new Vector2(a.x + b.x, a.y + b.y);
    }
    Add(add) {
        this.x += add.x;
        this.y += add.y;
    }
    static Sub(a, b) {
        return new Vector2(a.x - b.x, a.y - b.y);
    }
    Sub(sub) {
        this.x -= sub.x;
        this.y -= sub.y;
    }
    static Scale(a, b) {
        return new Vector2(a.x * b.x, a.y * b.y);
    }
    Scale(scale) {
        this.x *= scale.x;
        this.y *= scale.y;
    }
    static Dist(a, b) {
        let distX = Math.abs(a.x - b.x);
        let distY = Math.abs(a.y - b.y);
        return new Vector2(Math.sqrt(distX * distX), Math.sqrt(distY * distY));
    }
}
