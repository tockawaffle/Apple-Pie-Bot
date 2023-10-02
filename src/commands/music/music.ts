import { Client, CommandInteraction } from "discord.js";
import musicOptions from "../helpers/music/musicOptions";
import play from "../helpers/music/play";

export default {
    name: "music",
    description: "Music Commands and Options",
    descriptionLocalizations: {
        "pt-BR": "Comandos e opções de música",
    },
    options: musicOptions,
    execute: async ({
        client,
        interaction,
    }: {
        client: Client;
        interaction: CommandInteraction;
    }) => {
        const subCommands = {
            PLAY: "play",
            PAUSE: "pause",
            RESUME: "resume",
            SHUFFLE: "shuffle",
            SKIP: "skip",
            STOP: "stop",
            AUDIO: "audio",
        };

        const subCommandName = interaction.options.data[0]!
            .name as keyof typeof subCommands;
        switch (subCommandName) {
            case subCommands.PLAY: {
                const getUrl = interaction.options.get("url", true)
                    .value as string;

                await play(interaction, client, getUrl);
                break;
            }
            case subCommands.PAUSE: {
            }
            case subCommands.RESUME: {
            }
            case subCommands.SHUFFLE: {
            }
            case subCommands.SKIP: {
            }
            case subCommands.STOP: {
            }
            case subCommands.AUDIO: {
            }
        }
    },
} as Command;
