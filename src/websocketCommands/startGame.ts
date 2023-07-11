import { roomsDB } from "../db/rooms/room";
import { IShip, IShipPos, TShip } from "../db/rooms/roomModel";


export const startGame = (roomId: number): { ships: IShip[]; currentPlayerIndex: number } | undefined => {
  const room = roomsDB.rooms.get(roomId);
  if (!room) return undefined;

  const allShipsPlaced = room.every((user) => user.ships);
  if (!allShipsPlaced) return undefined;

  const currentPlayerIndex = room.findIndex((user) => user.isTurn);
  const currentPlayer = room[currentPlayerIndex];
  const ships: IShip[] = [];

  for (const shipCells of currentPlayer.shipsCells) {
    const shipPositions: IShipPos[] = [];

    for (const cell of shipCells) {
      shipPositions.push(JSON.parse(cell) as IShipPos);
    }

    const { x, y } = shipPositions[0];
    const direction = shipPositions[1].x === x + 1;
    const length = shipPositions.length;
    const type = getShipType(length);

    ships.push({
      position: { x, y },
      direction,
      length,
      type,
    });
  }

  return { ships, currentPlayerIndex };
};

const getShipType = (length: number): TShip => {
  if (length === 1) {
    return 'small';
  } else if (length === 2) {
    return 'medium';
  } else if (length === 3) {
    return 'large';
  } else {
    return 'huge';
  }
};
