//-----------------------------------------------------------------------------------------------------------------------------------------------//

require('dotenv').config();
const discord = require('discord.js');
const DBL = require('dblapi.js')
const client = new discord.Client();
const dbl = new DBL(`${process.env.TOPGG_TOKEN}`, client)

//-----------------------------------------------------------------------------------------------------------------------------------------------//

const { registerCommands, registerEvents } = require('./util/registry');
(async () => {
    client.login(process.env.BOT_TOKEN);
    client.commands = new Map();
    client.cachedMessageReactions = new Map();
    await registerEvents(client, '../events');
    await registerCommands(client, '../commands');
    
})();

//------------------------------------------------------------------------------------------------------------------------------------------------//