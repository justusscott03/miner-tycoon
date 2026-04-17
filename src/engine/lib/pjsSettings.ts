export type RectMode = "CORNER" | "CORNERS" | "CENTER" | "RADIUS";
export type EllipseMode = "CENTER" | "RADIUS" | "CORNER" | "CORNERS";
export type AngleMode = "degrees" | "radians";

export type PJSSettings = {
    curRectMode : RectMode;
    curEllipseMode : EllipseMode;
    requiresFirstVertex : boolean;
    angleMode : AngleMode;
    globalFont : string;
    globalSize : number;
    globalWeight : string;
    globalStyle : string;
};

export const pjsSettings: PJSSettings = {
    curRectMode : "CORNER", 
    curEllipseMode : "CENTER", 
    requiresFirstVertex : true, 
    angleMode : "degrees", 
    globalFont : "serif", 
    globalSize : 10,
    globalWeight : "normal",
    globalStyle : "normal"
};