import { IRoomPlayers } from "../rooms/roomModel";

export interface IUser extends IRoomPlayers {
  name: string;
  password: string;
  currentID: number;
}
