import { Schema, type, MapSchema } from "@colyseus/schema";
import { Player } from "./PlayerState";
import { CardDeck } from "../game-logic/cards";
import { getPlayerRoles } from "../game-logic/roles";
import { Client } from "colyseus";

export class GameState extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>();

  @type("number")
  currentTurn = 0;

  maxTurn = 4;

  deck: CardDeck;

  createPlayer(client: Client) {
    this.players[client.sessionId] = new Player(client);
  }

  removePlayer(id: string) {
    delete this.players[id];
  }

  startGame() {
    this.nextTurn();
  }

  nextTurn() {}
}
