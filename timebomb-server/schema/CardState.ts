import { Schema, type } from "@colyseus/schema";
import { Card } from "../game-logic/cards";

export class CardState extends Schema {
  @type("string")
  id: string;

  @type("boolean")
  isShown = false;

  @type("string")
  value: Card = null;

  privateValue: Card;

  showCard() {
    if (this.isShown) return;
    this.isShown = true;
    this.value = this.privateValue;
  }
}
