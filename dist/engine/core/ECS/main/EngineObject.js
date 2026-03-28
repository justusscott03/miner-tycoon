export class EngineObject {
    constructor() {
        this.id = EngineObject._nextId++;
    }
}
EngineObject._nextId = 1;
