import { Command } from "@colyseus/command";
import { MapSchema } from "@colyseus/schema";
import { GameState } from "../schema/GameState";
import { Player } from "../schema/PlayerState";
import { CardDeck } from "./cards";
import { getPlayerRoles } from "./roles";
import { Client } from "colyseus";
import { ROLE_SET } from "../../common/messages";
import { GameError, GameErrorType } from "../../common/GameError";

export class StartGameCommand extends Command<
  GameState,
  StartGameCommandPayload
> {
  numberOfPlayers: number;
  playerIds: string[];

  validate() {
    this.playerIds = Object.keys(this.state.players);
    this.numberOfPlayers = this.playerIds.length;
    if (this.numberOfPlayers < 4) throw new GameError("NOT_ENOUGH_PLAYER");
    if (this.numberOfPlayers > 8) throw new GameError("TOO_MANY_PLAYERS");
    return true;
  }

  execute() {
    this.room.lock(); // Locking the room

    // Creating a deck of cards based on the number of players
    this.state.deck = CardDeck.createDeck(this.numberOfPlayers);

    // Distribute Terrorist / CounterTerrorist roles randomly
    const roleDistribution = getPlayerRoles(this.playerIds);

    // Sending roles to their respective clients
    for (const id in this.state.players) {
      this.state.players[id].client.send(ROLE_SET, roleDistribution[id]);
    }
  }
}

type StartGameCommandPayload = {};
