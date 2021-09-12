require("dotenv").config(); require('module-alias/register')
const { Client, Intents } = require("discord.js");
const client = new Client({
    allowedMentions: { parse: [ 'users', 'roles' ], repliedUser: true },
    partials: [ "CHANNEL", "GUILD_MEMBER", "MESSAGE", "USER" ],
    intents: [ Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING, Intents.FLAGS.GUILD_PRESENCES ]
})

const { Player } = require("discord-player"); const PlayerClient = new Player(client);
const Coingecko = require("coingecko-api"); const GeckoClient = new Coingecko();
const SteamAPI = require("steamapi"); const SteamClient = new SteamAPI(process.env.STEAM_TOKEN);

const {registerCommands, registerEvents, registerPlayerEvents} = require("./Utils/Registry/registry");
(async() => {
    client.login(process.env.TOKEN);
    client.commands = new Map()
    client.player = PlayerClient;
    client.gecko = GeckoClient;
    client.steam = SteamClient;
    await registerEvents(client, "../../Events/DiscordEvents")
    await registerCommands(client, "../../Commands")
    // await registerPlayerEvents(PlayerClient, "../../Events/PlayerEvents")
})();