import { roomsDB } from "../db/rooms/room";

export const turn = (roomId: number): { currentPlayer: number } | undefined => {
  const room = roomsDB.rooms.get(roomId);
  if (!room) return undefined;

  const currentPlayerIndex = room.findIndex((user) => user.isTurn);
  const currentPlayer = room[currentPlayerIndex]?.index;
  if (currentPlayer === undefined) return undefined;

  return { currentPlayer };
};
