require('dotenv').config();
const discord = require('discord.js'); const client = new discord.Client({disableMentions: "everyone", partials: ["USER", "REACTION", "GUILD_MEMBER", "CHANNEL"]});
const { Player } = require('discord-player'); const player = new Player(client); const CoinGecko = require('coingecko-api'); const CoinGeckoClient = new CoinGecko(); const steamapi = require('steamapi'); const steamAPI = new steamapi(process.env.STEAM_TOKEN)

const { registerCommands, registerEvents, registerPlayerEvents } = require('./util/registry');
(async () => {
    client.login(process.env.BOT_TOKEN); client.player = player; client.steam = steamAPI; ; client.crypto = CoinGeckoClient
    client.commands = new Map(); client.filters = require('./configs/music/filters.json');
    await registerEvents(client, '../events/discordEvents'); await registerCommands(client, '../commands'); await registerPlayerEvents(player, '../events/player-event');
})();