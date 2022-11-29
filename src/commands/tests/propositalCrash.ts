import { Client, CommandInteraction } from "discord.js";
import { CommandObject, CommandType } from "../../../modules/wokcommands";

export default {
    category: "Utility - Servers - Bot Owner.",
    description: "Crashes the bot for testing purposes. (Bot Owner Only)",
    type: CommandType.SLASH,
    name: "crash",
    hidden: true,
    ownerOnly: true,

    callback: async ({ interaction, client, args }: {interaction: CommandInteraction, client: Client, args: string[]}) => {
        throw new Error("Damn, I crashed!");
    },
} as CommandObject;
