// src/engine/MineState.ts
import { ShaftState } from "./ShaftState.js";
import { ElevatorState } from "./ElevatorState.js";
import { StorehouseState } from "./StorehouseState.js";
import { WarehouseState } from "./WarehouseState.js";
import { CarrierState } from "./CarrierState.js";
export class MineState {
    constructor() {
        this.y = 0;
        this.numShafts = 0;
        this.shaftOffset = 0;
        this.shafts = [];
        this.displayElevator = false;
        this.numCarriers = 1;
        this.carriers = [];
        this.storehouse = new StorehouseState(85, 275, 130, 275);
        this.warehouse = new WarehouseState(485, 275, 130, 275);
        this.elevator = new ElevatorState(95, this.storehouse.y + this.storehouse.h + 31, 110, 170, this.shafts.map(s => s.crate), this.storehouse);
        this.recruitCarrier();
    }
    buildShaft() {
        if (this.numShafts < 30) {
            const shaft = new ShaftState(215, 740 + this.shaftOffset, 500, 100, this.numShafts + 1);
            this.shafts.push(shaft);
            this.elevator.crates = this.shafts.map(s => s.crate);
            if (this.numShafts === 0) {
                this.displayElevator = true;
            }
            this.numShafts++;
            this.shaftOffset += 175;
        }
    }
    recruitCarrier() {
        if (this.numCarriers < 5) {
            const carrier = new CarrierState(450, 375, 52.15, 75, this.storehouse, this.warehouse);
            this.carriers.push(carrier);
            this.numCarriers++;
        }
    }
    update(delta) {
        this.shafts.forEach(s => s.update(delta));
        if (this.displayElevator) {
            this.elevator.update(delta);
        }
        this.carriers.forEach(c => c.update(delta));
    }
    toJSON() {
        return {
            y: this.y,
            numShafts: this.numShafts,
            shaftOffset: this.shaftOffset,
            shafts: this.shafts.map(s => s.toJSON()),
            storehouse: this.storehouse.toJSON(),
            warehouse: this.warehouse.toJSON(),
            displayElevator: this.displayElevator,
            elevator: this.elevator.toJSON(),
            numCarriers: this.numCarriers,
            carriers: this.carriers.map(c => c.toJSON())
        };
    }
    static fromJSON(data) {
        const mine = new MineState();
        mine.y = data.y;
        mine.numShafts = data.numShafts;
        mine.shaftOffset = data.shaftOffset;
        mine.storehouse = StorehouseState.fromJSON(data.storehouse);
        mine.warehouse = WarehouseState.fromJSON(data.warehouse);
        mine.shafts = data.shafts.map(s => ShaftState.fromJSON(s));
        mine.displayElevator = data.displayElevator;
        mine.elevator = ElevatorState.fromJSON(data.elevator, mine.shafts.map(s => s.crate), mine.storehouse);
        mine.numCarriers = data.numCarriers;
        mine.carriers = data.carriers.map(c => CarrierState.fromJSON(c, mine.storehouse, mine.warehouse));
        return mine;
    }
}
