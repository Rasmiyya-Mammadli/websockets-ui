import { IUser } from './userModel';

const bot: IUser = {
  name: 'ADAM',
  password: '',
  currentID: 0,
  index: 0,
  isTurn: false
};

export const usersDB = {
  users: [bot] as IUser[],
  getPlayerByName(name: string): IUser | false {
    return this.users.find((player: { name: string; }) => player.name === name) || false;
  },
  getPlayerByID(currentID: number): IUser | false {
    return this.users.find((player: { currentID: number; }) => player.currentID === currentID) || false;
  },
  addPlayer(name: string, password: string, currentID: number): void {
    const player = { name, password, currentID };
    this.users.push(player);
  },
  exitPlayer(currentID: number) {
    const user = this.getPlayerByID(currentID);
    if (!user) return;
    user.currentID = -1;
  },
  updateId(name: string, newId: number) {
    const user = this.getPlayerByName(name);
    if (!user) return;
    user.currentID = newId;
  },
};