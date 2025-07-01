const minerStates = {
    toDigging : 0,
    digging : 1,
    toCrate : 2
};

const elevatorStates = {
    movingUp : 0,
    movingDown : 1,
    loading : 2,
    unloading : 3
};

const carrierStates = {
    toStorehouse : 0,
    loading : 1,
    toWarehouse : 2,
    unloading : 3
};

export { minerStates, elevatorStates, carrierStates };