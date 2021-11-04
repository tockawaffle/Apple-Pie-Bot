require("dotenv").config(); require('module-alias/register')
const 
    { Client, Intents } = require("discord.js"),
    client = new Client({
        allowedMentions: { parse: [ 'users', 'roles' ], repliedUser: true },
        partials: [ "CHANNEL", "GUILD_MEMBER", "MESSAGE", "USER" ],
        intents: [ Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING, Intents.FLAGS.GUILD_PRESENCES ]
    }),
    { Player } = require("discord-player"); const PlayerClient = new Player(client),
    Coingecko = require("coingecko-api"); const GeckoClient = new Coingecko(),
    SteamAPI = require("steamapi"); const SteamClient = new SteamAPI(process.env.STEAM_TOKEN),
    {registerCommands, registerEvents, registerPlayerEvents} = require("./Utils/Registry/registry.js");

(async() => {
    client.login(process.env.TOKEN);
    client.commands = new Map()
    client.player = PlayerClient;
    client.gecko = GeckoClient;
    client.steam = SteamClient;
    await registerEvents(client, "../../events/discordEvents")
    await registerCommands(client, "../../Commands")
    // await registerPlayerEvents(PlayerClient, "../../Events/PlayerEvents")
})();