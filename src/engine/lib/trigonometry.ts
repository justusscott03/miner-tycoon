function radians (angle: number) {
    return angle * Math.PI / 180;
}

function degrees (angle: number): number {
    return angle * 180 / Math.PI;
}

function sin (degrees: number) {
    return Math.sin(radians(degrees));
}

function cos (degrees: number) {
    return Math.cos(radians(degrees));
}

function tan (degrees: number) {
    return Math.tan(radians(degrees));
}

function asin (value: number) {
    return degrees(Math.asin(value));
}

function acos (value: number) {
    return degrees(Math.acos(value));
}

function atan (value: number) {
    return degrees(Math.atan(value));
}

function atan2 (y: number, x: number) {
    return degrees(Math.atan2(y, x));
}

export { radians, degrees, sin, cos, tan, asin, acos, atan, atan2 };
