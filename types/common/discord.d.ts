import "discord.js"
import { REST } from "discord.js";

declare module "discord.js" {
    export interface Client {
        rest: REST;
    }
}