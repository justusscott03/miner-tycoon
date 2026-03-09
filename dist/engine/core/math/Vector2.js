export class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    set(newX, newY) {
        this.x = newX;
        this.y = newY;
    }
    static add(a, b) {
        return new Vector2(a.x + b.x, a.y + b.y);
    }
    add(add) {
        this.x += add.x;
        this.y += add.y;
        return this;
    }
    static sub(a, b) {
        return new Vector2(a.x - b.x, a.y - b.y);
    }
    sub(sub) {
        this.x -= sub.x;
        this.y -= sub.y;
        return this;
    }
    static multiply(a, b) {
        return new Vector2(a.x * b.x, a.y * b.y);
    }
    multiply(scale) {
        this.x *= scale.x;
        this.y *= scale.y;
        return this;
    }
    static dist(a, b) {
        let distX = Math.abs(a.x - b.x);
        let distY = Math.abs(a.y - b.y);
        return new Vector2(Math.sqrt(distX * distX), Math.sqrt(distY * distY));
    }
    clone() {
        return new Vector2(this.x, this.y);
    }
    static get zero() {
        return new Vector2(0, 0);
    }
    static get right() {
        return new Vector2(1, 0);
    }
    static get left() {
        return new Vector2(-1, 0);
    }
    static get up() {
        return new Vector2(0, 1);
    }
    static get down() {
        return new Vector2(0, -1);
    }
}
