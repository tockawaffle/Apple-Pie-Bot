import WOK, { CommandObject, CommandType } from "wokcommands";
import { Client, CommandInteraction } from "discord.js";

export default {
    description: "Returns a json with all the bot's commands",
    descriptionLocalizations: {
        "en-US": "Returns a json with all the bot's commands",
        "pt-BR": "Envia um JSON com todos os comandos do bot",
    },
    category: "Dev",
    type: CommandType.SLASH,
    guildOnly: true,
    testOnly: true,
    ownerOnly: true,
    callback: async ({
        args,
        interaction,
        instance,
        client
    }: {
        args: string[];
        interaction: CommandInteraction;
        instance: WOK;
        client: Client;
    }) => {
        const c = await instance.commandHandler.commands
        console.log(c)
    },
} as CommandObject;
