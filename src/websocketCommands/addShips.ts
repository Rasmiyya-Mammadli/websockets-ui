import { roomsDB } from "../db/rooms/room";
import { IRoom, IShip, IShipPos } from "../db/rooms/roomModel";


export const addShips = (
  roomId: number,
  userId: number,
  ships: IShip[],
  indexPlayer: number
): { roomData: IRoom; currentPlayerIndex: number } | undefined => {
  const room = roomsDB.rooms.get(roomId);
  if (!room) return undefined;

  const user = room.find((user) => user.index === userId);
  if (!user) return undefined;

  user.ships = ships;
  user.shipsCells = [];

  for (const ship of ships) {
    const { position, direction, length, type } = ship;
    const shipCells: IShipPos[] = [];

    if (direction) {
      for (let i = 0; i < length; i++) {
        shipCells.push({ x: position.x + i, y: position.y });
      }
    } else {
      for (let i = 0; i < length; i++) {
        shipCells.push({ x: position.x, y: position.y + i });
      }
    }

    user.shipsCells.push(new Set(shipCells.map((cell) => JSON.stringify(cell))));
  }

  const allShipsPlaced = room.every((user) => user.ships);
  if (allShipsPlaced) {
    const currentPlayerIndex = indexPlayer;
    const roomData: IRoom = {
      roomId,
      roomUsers: room,
    };

    return { roomData, currentPlayerIndex };
  }

  return undefined;
};
