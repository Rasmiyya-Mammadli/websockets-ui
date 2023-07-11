import { roomsDB } from "../db/rooms/room";
import { IRoomPlayers, TAttack } from "../db/rooms/roomModel";

export const attack = (
  roomId: number,
  userId: number,
  x: number,
  y: number
): { position: { x: number; y: number }; currentPlayer: number; status: TAttack } | undefined => {
  const room = roomsDB.rooms.get(roomId);
  if (!room) return undefined;

  const currentPlayer = room.find((user) => user.index === userId);
  const enemyPlayer = room.find((user) => user.index !== userId);
  if (!currentPlayer || !enemyPlayer) return undefined;

  const position = { x, y };
  const status = performAttack(enemyPlayer, position);
  const feedback = { position, currentPlayer: userId, status };

  return feedback;
};

const performAttack = (player: IRoomPlayers, position: { x: number; y: number }): TAttack => {
  const ships = player.shipsCells;
  if (!ships) return "empty";

  for (let i = 0; i < ships.length; i++) {
    const shipCells = ships[i];
    if (shipCells.has(JSON.stringify(position))) {
      shipCells.delete(JSON.stringify(position));
      if (shipCells.size === 0) {
        ships.splice(i, 1);
        markSurroundingCellsAsMiss(player, shipCells);
        return "killed";
      }
      return "shot";
    }
  }

  return "miss";
};

const markSurroundingCellsAsMiss = (player: IRoomPlayers, shipCells: Set<string>): void => {
  const { x, y } = JSON.parse(Array.from(shipCells)[0]);
  const surroundingCells: string[] = [
    JSON.stringify({ x: x - 1, y: y - 1 }),
    JSON.stringify({ x: x - 1, y }),
    JSON.stringify({ x: x - 1, y: y + 1 }),
    JSON.stringify({ x, y: y - 1 }),
    JSON.stringify({ x, y: y + 1 }),
    JSON.stringify({ x: x + 1, y: y - 1 }),
    JSON.stringify({ x: x + 1, y }),
    JSON.stringify({ x: x + 1, y: y + 1 }),
  ];

  for (const cell of surroundingCells) {
    if (!shipCells.has(cell)) {
      player.attackMap?.add(cell);
    }
  }
};
