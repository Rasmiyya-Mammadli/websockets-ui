import { roomsDB } from '../db/rooms/room';
import { IRoomPlayers } from '../db/rooms/roomModel';
import { usersDB } from '../db/users/user';
import { IUser } from '../db/users/userModel';

export const addUserToRoom = (
  roomId: number,
  userId: number
): { success: boolean; roomData?: IRoomPlayers[] } => {
  const room = roomsDB.rooms.get(roomId);
  if (room) {
    const userName = (usersDB.getPlayerByID(userId) as IUser).name;
    const isAdded = room.find((user) => user.index === userId);
    if (isAdded || room.length >= 2) {
      return { success: false };
    }
    room.push({
      name: userName,
      index: userId,
      isTurn: false,
    });
    return { success: true, roomData: room };
  }
  return { success: false };
};
