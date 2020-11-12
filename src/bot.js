//-----------------------------------------------------------------------------------------------------------------------------------------------//

require('dotenv').config();
const discord = require('discord.js');
const DBL = require('dblapi.js')
const client = new discord.Client();
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2MjA3NzMzNjgxMjEyNjIyOCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA1MjAxNjAyfQ.H_6XSbmBFIW2ArDpgBKfa4FjWF31L0GoOFUwMWCAUdo', client)

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