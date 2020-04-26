import { Schema, type, ArraySchema } from "@colyseus/schema";
import { Role } from "../game-logic/roles";
import { CardState } from "./CardState";
import { Client } from "colyseus";

export class Player extends Schema {
  @type("string")
  name: string;

  @type([CardState])
  currentCards = new ArraySchema<CardState>();

  // Role should not be sent automatically as it must be hidden
  role: Role;

  client: Client;

  constructor(client: Client) {
    super();
    this.client = client;
  }
}
