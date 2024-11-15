import { Dot } from "./dot.model";
// import { Wall } from "./wall.model"; // TODO: First focus on standard squares with no obstacles

export interface GameContext {
    width: number;      // width of the board
    height: number;     // height of the board
    lines: number;      // number of lines (lines = dots / 2)
    dots: Dot[];        // all the points on board
    // holes: number[];    // indices of the holes on the board - empty fields - one-dimensional array
    // walls: Wall[];      // all walls on the board
    // TODO: maybe add optional teleports
    // TODO: add configuration for squares or hexes or N-wall shapes
};