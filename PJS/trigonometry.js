function radians (angle) {
    return angle * Math.PI / 180;
}

function degrees (angle) {
    return angle * 180 / Math.PI;
}

function sin (degrees) {
    return Math.sin(radians(degrees));
}

function cos (degrees) {
    return Math.cos(radians(degrees));
}

function tan (degrees) {
    return Math.tan(radians(degrees));
}

function asin (degrees) {
    return degrees(Math.asin(degrees));
}

function acos (degrees) {
    return degrees(Math.acos(degrees));
}

function atan (degrees) {
    return degrees(Math.atan(degrees));
}

function atan2 (y, x) {
    return degrees(Math.atan2(y, x));
}

export { radians, degrees, sin, cos, tan, asin, acos, atan, atan2 };
