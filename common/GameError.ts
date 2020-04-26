export class GameError extends Error {
  errorType: GameErrorType;

  constructor(type: GameErrorType) {
    super(GameErrorMessages[type]);
    this.errorType = type;
  }
}

export type GameErrorType = "TOO_MANY_PLAYERS" | "NOT_ENOUGH_PLAYER";

export const GameErrorMessages = {
  NOT_ENOUGH_PLAYER: "Not enough players: minimum 4 players",
  TOO_MANY_PLAYERS: "Too many players: maximum 8 players",
};
