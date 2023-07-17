import { WebSocket } from 'ws';
import { roomsDB } from '../db/rooms/room';
import { IRoomPlayers, TAttack } from '../db/rooms/roomModel';
import finish from '../response/finishGame';
import attack from '../response/attack';
import turn from '../response/turn';

export default function singlePlayAttack(
  currentUser: IRoomPlayers,
  pos: string,
  indexPlayer: number,
  attackResult: TAttack,
  room: IRoomPlayers[],
  gameId: number,
  ws: WebSocket,
): void {
  const isReAttack = !!currentUser.attackMap?.has(pos);
  if (!isReAttack) {
    attack(pos, indexPlayer, attackResult, ws);
  }

  if (attackResult === 'miss' || isReAttack) {
    const bot = room.find((e) => !e.index) as IRoomPlayers;
    const variationsBot = [...(bot.attackVariations as Set<string>)];
    let botAttack: TAttack = 'empty';
    while (botAttack !== 'miss') {
      turn(0, ws);
      const itemBot = Math.floor(Math.random() * variationsBot.length);
      const botPos = variationsBot.splice(itemBot, 1)[0] as string;
      botAttack = roomsDB.setAttack(gameId, indexPlayer, botPos);
      if (botAttack === 'win') {
        finish(0, ws);
        return;
      }
      attack(botPos, 0, botAttack, ws);
    }
  }

  turn(indexPlayer, ws);
  roomsDB.setAttackMap(gameId, indexPlayer, pos);
}
