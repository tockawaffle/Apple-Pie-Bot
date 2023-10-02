import { ApplicationCommandOptionType } from "discord.js";
import audioFilters from "./audio/audioFilters";

export default [
    {
        name: "play",
        description: "Plays a song from an URL.",
        descriptionLocalizations: {
            "pt-BR": "Toca uma música através de uma URL.",
        },
        type: ApplicationCommandOptionType.Subcommand,
        options: [
            {
                name: "url",
                description:
                    "The url to play the song from, can be a playlist too.",
                descriptionLocalizations: {
                    "pt-BR":
                        "A url para tocar a música, pode ser uma playlist também.",
                },
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
    {
        name: "pause",
        nameLocalizations: {
            "pt-BR": "pausar",
        },
        description: "Pauses the current song.",
        descriptionLocalizations: {
            "pt-BR": "Pausa a música atual.",
        },
        type: ApplicationCommandOptionType.Subcommand,
    },
    {
        name: "resume",
        nameLocalizations: {
            "pt-BR": "continuar",
        },
        description: "Resumes the current song.",
        descriptionLocalizations: {
            "pt-BR": "Continua a música atual.",
        },
        type: ApplicationCommandOptionType.Subcommand,
    },
    {
        name: "shuffle",
        nameLocalizations: {
            "pt-BR": "embaralhar",
        },
        description: "Shuffles the queue.",
        descriptionLocalizations: {
            "pt-BR": "Embaralha a fila.",
        },
        type: ApplicationCommandOptionType.Subcommand,
    },
    {
        name: "skip",
        nameLocalizations: {
            "pt-BR": "pular",
        },
        description: "Skips the current song.",
        descriptionLocalizations: {
            "pt-BR": "Pula a música atual.",
        },
        type: ApplicationCommandOptionType.Subcommand,
    },
    {
        name: "stop",
        nameLocalizations: {
            "pt-BR": "parar",
        },
        description: "Stops the current song.",
        descriptionLocalizations: {
            "pt-BR": "Para a música atual.",
        },
        type: ApplicationCommandOptionType.Subcommand,
    },
    {
        name: "audio",
        description: "Audio options.",
        descriptionLocalizations: {
            "pt-BR": "Opções de áudio.",
        },
        type: ApplicationCommandOptionType.Subcommand,
        options: [
            {
                name: "volume",
                description: "Changes the volume.",
                descriptionLocalizations: {
                    "pt-BR": "Altera o volume.",
                },
                type: ApplicationCommandOptionType.Integer,
            },
            {
                name: "filter",
                description: "Changes the music filter.",
                descriptionLocalizations: {
                    "pt-BR": "Altera o filtro da música.",
                },
                type: ApplicationCommandOptionType.String,
                choices: audioFilters,
            },
        ],
    },
];
