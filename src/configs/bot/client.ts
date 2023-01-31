import { Partials, GatewayIntentBits, REST } from "discord.js";
import WOK, { Options, DefaultCommands } from "@wokcommands/";
import { client } from "../../bot";
import path from "path";

const partials = [
    Partials.GuildMember,
    Partials.Channel,
    Partials.Message,
    Partials.Reaction,
    Partials.User,
];

const intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessages,
];

export const clientOptions = {
    partials,
    intents,
};

export const RESTdjs = new REST({ version: "10" }).setToken(
    process.env.DISCORD_TOKEN as string
);

export const wokOptions = {
    client,
    commandsDir: path.join(__dirname, "../../commands"),
    validations: {
        syntax: path.join(__dirname, "./validations/syntax"),
    },
    defaultLanguage: "english",
    testServers: [process.env.TEST_SERVERS],
    botOwners: [process.env.OWNER_ID],
    disabledDefaultCommands: [
        DefaultCommands.ChannelCommand,
        DefaultCommands.CustomCommand,
        DefaultCommands.Prefix,
        DefaultCommands.RequiredPermissions,
        DefaultCommands.RequiredRoles,
        DefaultCommands.ToggleCommand,
    ],
} as Options;