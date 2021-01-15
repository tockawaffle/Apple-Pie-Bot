//-----------------------------------------------------------------------------------------------------------------------------------------------//

require('dotenv').config();
const discord = require('discord.js');
const DBL = require('dblapi.js')
const client = new discord.Client({disableMentions: "everyone"});
const { Player } = require('discord-player')
const player = new Player(client)
// const dbl = new DBL(`${process.env.TOPGG_TOKEN}`, client)


//-----------------------------------------------------------------------------------------------------------------------------------------------//

const { registerCommands, registerEvents, registerPlayerEvents, registerDblEvents } = require('./util/registry');
(async () => {
    client.login(process.env.BOT_TOKEN);
    client.player = player;
    // client.dbl = dbl;
    client.commands = new Map();
    client.filters = require('./util/music-utils/filters.json');
    await registerEvents(client, '../events/discordEvents');
    await registerCommands(client, '../commands');
    await registerPlayerEvents(player, '../events/player-event');
    // await registerDblEvents(dbl, '../events/dblEvents')
})();

//------------------------------------------------------------------------------------------------------------------------------------------------//