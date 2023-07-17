import { roomsDB } from "../db/rooms/room";

export const finishGameHandler = (roomId: number): { winPlayer: number } | undefined => {
  const room = roomsDB.rooms.get(roomId);
  if (!room) return undefined;

  const remainingPlayers = room.filter((user) => user.shipsCells && user.shipsCells.length > 0);
  if (remainingPlayers.length > 1) return undefined;

  const winPlayer = remainingPlayers[0]?.index;
  if (winPlayer === undefined) return undefined;

  return { winPlayer };
};
