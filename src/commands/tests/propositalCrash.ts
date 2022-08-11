import { ICommand } from "../../../modules/wokcommands";

export default {
    category: "Utility - Servers - Bot Owner.",
    description: "Crashes the bot for testing purposes. (Bot Owner Only)",
    slash: true,
    name: "crash",
    hidden: true,
    ownerOnly: true,

    callback: async ({ interaction, client, args }) => {
        throw new Error("Damn, I crashed!");
    },
} as ICommand;
