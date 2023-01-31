"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wokOptions = exports.RESTdjs = exports.clientOptions = void 0;
const discord_js_1 = require("discord.js");
const _wokcommands_1 = require("@wokcommands/");
const bot_1 = require("../../bot");
const path_1 = __importDefault(require("path"));
const partials = [
    discord_js_1.Partials.GuildMember,
    discord_js_1.Partials.Channel,
    discord_js_1.Partials.Message,
    discord_js_1.Partials.Reaction,
    discord_js_1.Partials.User,
];
const intents = [
    discord_js_1.GatewayIntentBits.Guilds,
    discord_js_1.GatewayIntentBits.GuildMessages,
    discord_js_1.GatewayIntentBits.GuildBans,
    discord_js_1.GatewayIntentBits.GuildPresences,
    discord_js_1.GatewayIntentBits.GuildEmojisAndStickers,
    discord_js_1.GatewayIntentBits.GuildMembers,
    discord_js_1.GatewayIntentBits.GuildMessageReactions,
    discord_js_1.GatewayIntentBits.GuildWebhooks,
    discord_js_1.GatewayIntentBits.DirectMessageReactions,
    discord_js_1.GatewayIntentBits.DirectMessages,
];
exports.clientOptions = {
    partials,
    intents,
};
exports.RESTdjs = new discord_js_1.REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
exports.wokOptions = {
    client: bot_1.client,
    commandsDir: path_1.default.join(__dirname, "../../commands"),
    validations: {
        syntax: path_1.default.join(__dirname, "./validations/syntax"),
    },
    defaultLanguage: "english",
    testServers: [process.env.TEST_SERVERS],
    botOwners: [process.env.OWNER_ID],
    disabledDefaultCommands: [
        _wokcommands_1.DefaultCommands.ChannelCommand,
        _wokcommands_1.DefaultCommands.CustomCommand,
        _wokcommands_1.DefaultCommands.Prefix,
        _wokcommands_1.DefaultCommands.RequiredPermissions,
        _wokcommands_1.DefaultCommands.RequiredRoles,
        _wokcommands_1.DefaultCommands.ToggleCommand,
    ],
};
