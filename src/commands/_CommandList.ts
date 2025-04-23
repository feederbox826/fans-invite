// imports
import { CommandInt } from "../types/CommandInt";
// commands
import { maninvite } from "./maninvite";
import { autoinvite } from "./autoinvite";
import { testinvite } from "./testinvite";

// command list
// prettier-ignore
export const CommandList: CommandInt[] = [
  autoinvite, maninvite, testinvite
];
