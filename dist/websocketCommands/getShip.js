"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getShipsList(ships) {
    const shipsList = [];
    for (const ship of ships) {
        const { x, y } = ship.position;
        const shipCells = new Set();
        if (ship.direction) {
            for (let i = 0; i < ship.length; i += 1) {
                shipCells.add(JSON.stringify({ x, y: y + i }));
            }
        }
        else {
            for (let i = 0; i < ship.length; i += 1) {
                shipCells.add(JSON.stringify({ x: x + i, y }));
            }
        }
        shipsList.push(shipCells);
    }
    return shipsList;
}
exports.default = getShipsList;
