import { Room, Client } from "colyseus";
import { GameState } from "../schema/GameState";
import { Dispatcher } from "@colyseus/command";
import { StartGameCommand } from "../game-logic/game-command";
import { GAME_STARTING, GAME_ERROR } from "../../common/messages";
import { GameError } from "../../common/GameError";

export class TimeBombRoom extends Room<GameState> {
  maxClients = 8; // max players in the game
  dispatcher = new Dispatcher(this);

  onCreate(options: any) {
    this.setState(new GameState());

    this.onMessage("start", (client, message) => {
      console.log("Starting game...");
      this.broadcast(GAME_STARTING, {});
      try {
        this.dispatcher.dispatch(new StartGameCommand());
      } catch (e) {
        if (e instanceof GameError) {
          this.broadcast(GAME_ERROR, e.message);
        }
        console.error(e);
      }
      console.log("Game started");
    });

    this.onMessage("*", (client, type, message) => {});
  }

  onJoin(client: Client, options: any) {
    this.state.createPlayer(client);
  }

  onLeave(client: Client, consented: boolean) {
    this.state.removePlayer(client.sessionId);
  }

  onDispose() {
    this.dispatcher.stop();
  }
}
