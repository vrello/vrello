import VrelloDatabase from "./db";
import { VrelloOptions } from "./db";

export const vrello = (options: VrelloOptions) => new VrelloDatabase(options);
export type vrello = VrelloDatabase;