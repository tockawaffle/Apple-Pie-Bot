//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

require('dotenv').config();
const discord = require('discord.js');const partial = ["USER", "REACTION", "GUILD_MEMBER", "CHANNEL"]; const client = new discord.Client({disableMentions: "everyone", partials: [partial]});
const { Player } = require('discord-player'); const player = new Player(client); const teemo = require('teemojs'); const api = teemo(process.env.RGKEY)
const DBL = require('dblapi.js');
const ssteam = require('steamapi'); const steam = new ssteam(process.env.STEAM_TOKEN)
//  const dbl = new DBL(`${process.env.TOPGG_TOKEN}`, client);

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

const { registerCommands, registerEvents, registerPlayerEvents, registerDblEvents } = require('./util/registry');
(async () => {
    client.login(process.env.BOT_TOKEN); client.player = player; client.steam = steam; client.rg = api
    // client.dbl = dbl;
    client.commands = new Map(); client.filters = require('./configs/music/filters.json');
    await registerEvents(client, '../events/discordEvents'); await registerCommands(client, '../commands'); await registerPlayerEvents(player, '../events/player-event'); await registerDblEvents(dbl, '../events/dblEvents')
})();

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//