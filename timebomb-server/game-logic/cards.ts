import { Command } from "@colyseus/command";

export type Card = "Bomb" | "Cable" | "Neutral";

export class CardDeck {
  numberOfCards: number;

  constructor(n: number) {
    this.numberOfCards = n;
  }

  static createDeck(totalPlayer: number): CardDeck {
    const { Bomb, Cable, Neutral } = getCardDistribution(totalPlayer);
    const numberOfCards = Bomb + Cable + Neutral;

    const deck = new CardDeck(numberOfCards);
    return deck;
  }
}

function getCardDistribution(totalPlayer: number) {
  switch (totalPlayer) {
    case 4:
      return { Bomb: 1, Cable: 4, Neutral: 15 };
    case 5:
      return { Bomb: 1, Cable: 5, Neutral: 19 };
    case 6:
      return { Bomb: 1, Cable: 6, Neutral: 23 };
    case 7:
      return { Bomb: 1, Cable: 7, Neutral: 27 };
    case 8:
      return { Bomb: 1, Cable: 8, Neutral: 31 };
    default:
      throw new Error(
        "Game can't start if total number of players is not between 4 and 8"
      );
  }
}
