import WOK, { CommandObject, CommandType } from "wokcommands";
import { Client, CommandInteraction } from "discord.js";
import { checkCommands } from "../../configs/bot/checkCommands";

export default {
    description: "Enable the bot to check it's own commands and sync them",
    descriptionLocalizations: {
        "en-US": "Enable the bot to check it's own commands and sync them.",
        "pt-BR": "Habilite o bot para verificar seus próprios comandos e sincronizá-los.",
    },
    nameLocalizations: {
        "en-US": "check-commands",
        "pt-BR": "verificar-comandos",
    },
    category: "Dev",
    type: CommandType.SLASH,
    guildOnly: true,
    testOnly: true,
    options: [
        {
            name: "option",
            description: "The option to use.",
            descriptionLocalizations: {
                "en-US": "True to enable, false to disable and, in a more severe case, 'all' to delete every single command.",
                "pt-BR": "True para ativar, false para desativar, em um caso mais grave, 'all' para excluir todos os comandos.",
            },
            type: 3,
            required: true,
            choices: [
                {
                    name: "True",
                    value: "true",
                },
                {
                    name: "False",
                    value: "false",
                },
                {
                    name: "All",
                    value: "all",
                    nameLocalizations: {
                        "en-US": "All",
                        "pt-BR": "Todos",
                    }
                }
            ],
        },
    ],
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
        const c = await checkCommands({ client, instance })
        console.log(c)
    },
} as CommandObject;
