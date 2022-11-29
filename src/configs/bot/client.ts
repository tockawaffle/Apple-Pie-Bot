import { Partials, GatewayIntentBits } from "discord.js";
import { Options, DefaultCommands } from "wokcommands";
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

export const wokOptions = {
    client,
    commandsDir: path.join(__dirname, "../../commands"),
    defaultLanguage: "english",
    testServers: process.env.SERVER_ID,
    ignoreBots: true,
    debug: true,
    typeScript: true,
    showWarns: true,
    ephemeral: true,
    botOwners: [process.env.OWNER_ID as string],
    disabledDefaultCommands: [
        DefaultCommands.ChannelCommand,
        DefaultCommands.CustomCommand,
        DefaultCommands.Prefix,
        DefaultCommands.RequiredPermissions,
        DefaultCommands.RequiredRoles,
        DefaultCommands.ToggleCommand,
    ],
} as Options;