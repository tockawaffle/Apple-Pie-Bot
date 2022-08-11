import { Partials, GatewayIntentBits } from "discord.js";
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
    commandsDir: path.join(__dirname, "../../commands"),
    featuresDir: path.join(__dirname, "../../features"),
    messagesPath: path.join(__dirname, "../languages/messages.json"),
    defaultLanguage: "english",
    testServers: process.env.TEST_SERVERS,
    ignoreBots: true,
    debug: true,
    typeScript: true,
    showWarns: true,
    ephemeral: true,
    botOwners: [process.env.OWNER_ID as string],
    mongoUri: process.env.MONGO_URI,
    disabledDefaultCommands: [
        "help",
        "command",
        "language",
        "prefix",
        "requiredrole",
        "channelonly",
        "slash",
    ],
};
