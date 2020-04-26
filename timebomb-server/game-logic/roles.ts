import { Player } from "../schema/PlayerState";
import shuffle from "shuffle-array";
export type Role = "Terrorist" | "CounterTerrorist";

/**
 *  Role distribution based on the total number of players
 * |---------------------------------------------|
 * | # of players | CounterTerrorist | Terrorist |
 * |---------------------------------------------|
 * |    4 - 5     |        3         |     2     |
 * |---------------------------------------------|
 * |      6       |        4         |     2     |
 * |---------------------------------------------|
 * |    7 - 8     |        5         |     3     |
 * |---------------------------------------------|
 */
export function getNumberOfPlayersByRole(totalPlayer: number): any {
  return {
    Terrorist: getNumberOfPlayersTerrorist(totalPlayer),
    CounterTerrorist: getNumberOfPlayersCounterTerrorist(totalPlayer),
  };
}

export function getNumberOfPlayersCounterTerrorist(totalPlayer: number) {
  if (totalPlayer <= 5) return 3;
  else if (totalPlayer === 6) return 4;
  else return 6;
}
export function getNumberOfPlayersTerrorist(totalPlayer: number) {
  if (totalPlayer <= 6) return 2;
  else return 3;
}

export function getPlayerRoles(players: string[]) {
  const numberOfPlayers = players.length;
  const { Terrorist, CounterTerrorist } = getNumberOfPlayersByRole(
    numberOfPlayers
  );

  const shuffledPlayers = shuffle(players);
  let terroristLeft = Terrorist,
    ctLeft = CounterTerrorist;

  const toReturn: any = {};
  for (const id in shuffledPlayers) {
    const rnd = Math.random();
    if (rnd > 0.5) {
      if (terroristLeft > 0) {
        toReturn[shuffledPlayers[id]] = "Terrorist";
        terroristLeft--;
      } else {
        toReturn[shuffledPlayers[id]] = "CounterTerrorist";
      }
    } else {
      if (ctLeft > 0) {
        toReturn[shuffledPlayers[id]] = "CounterTerrorist";
        ctLeft--;
      } else {
        toReturn[shuffledPlayers[id]] = "Terrorist";
      }
    }
  }
  return toReturn;
}
