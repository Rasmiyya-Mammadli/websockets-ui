import { roomsDB } from "../db/rooms/room";

export const updateRoomHandler = (): { roomId: number; roomUsers: { name: string; index: number }[] }[] => {
  const rooms = roomsDB.rooms;
  const roomList: { roomId: number; roomUsers: { name: string; index: number }[] }[] = [];

  rooms.forEach((players, roomId) => {
    if (players.length === 1) {
      const roomUsers = players.map((player) => ({ name: player.name, index: player.index }));
      roomList.push({ roomId, roomUsers });
    }
  });

  return roomList;
};
