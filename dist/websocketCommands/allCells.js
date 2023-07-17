"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allCells = void 0;
exports.allCells = new Array(10)
    .fill(0)
    .map((_, i) => new Array(10).fill(0).map((_, j) => JSON.stringify({ x: i, y: j })))
    .flat(1);
