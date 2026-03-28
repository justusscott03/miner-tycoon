export class EngineObject {
    private static _nextId = 1;
    readonly id: number;

    constructor() {
        this.id = EngineObject._nextId++;
    }
}
