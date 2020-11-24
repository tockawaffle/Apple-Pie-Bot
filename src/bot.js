//-----------------------------------------------------------------------------------------------------------------------------------------------//

require('dotenv').config();
const discord = require('discord.js');
const DBL = require('dblapi.js')
const client = new discord.Client({disableMentions: "everyone"});
const { Player } = require('discord-player')
const player = new Player(client)


// const dbl = new DBL(`${process.env.TOPGG_TOKEN}`, client)

//-----------------------------------------------------------------------------------------------------------------------------------------------//

const { registerCommands, registerEvents, registerPlayerEvents } = require('./util/registry');
(async () => {
    client.player = player
    client.login(process.env.BOT_TOKEN);
    client.commands = new Map();
    client.cachedMessageReactions = new Map();
    await registerEvents(client, '../events');
    await registerCommands(client, '../commands');
    await registerPlayerEvents(player, '../player-event')
    
})();

//------------------------------------------------------------------------------------------------------------------------------------------------//