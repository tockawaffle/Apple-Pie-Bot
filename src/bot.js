//-----------------------------------------------Constancias--------------------------------------------------------------------------------------//

require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client();
const fs = require('fs').promises;
const path = require('path');
const PREFIX = process.env.PREFIX
const { checkCommandModule, checkProperties } = require('./util/validate');
const { createStream, table } = require('table')
const tableConfig = require('./util/tableConfig');
const c = require('ansi-colors');
const commandStatus = [
    [`${c.bold.magenta('Comando')}`, `${c.bold.black('Status do Comando')}`]
];
const { MessageEmbed } = require('discord.js')

//-------------------------------------------------------------------------------------------------------------------------------------------------------//

client.login(process.env.BOT_TOKEN);

client.commands = new Map();

client.on('ready', () => {
    console.log(`${client.user.username} Saiu do forno!`)
    console.log(table(commandStatus))

    client.user.setActivity("Apple pie!", {type: 'PLAYING'});
    let activNum = 0;
    setInterval(function() {
        if(activNum === 0) {
            client.user.setActivity("Sweet sweet pie, why can't you be mine?")
            activNum = 1;
        } else if (activNum === 1) {
            client.user.setActivity("It's because you might eat me!")
            activNum = 2;
        } else if (activNum === 2) {
            client.user.setActivity("Candy, sweets, icecream!")
            activNum = 3;
        } else if (activNum === 3) {
            client.user.setActivity("My pfp creator!: https://www.zerochan.net/1949037")
            activNum = 0;
        }  
    }, 300 * 1000);
    
})

//-------------------------------------------------------------------------------------------------------------------------------------------------------//

client.on('message', async function(message) {
    if(message.author.bot) return;

    if(!message.content.startsWith(PREFIX)) return;
    let cmdName = message.content.substring(message.content.indexOf(PREFIX)+1).split(new RegExp(/\s+/)).shift()
    let argsToParse = message.content.substring(message.content.indexOf(' ')+1);

    if(client.commands.get(cmdName)) {
        client.commands.get(cmdName)(client, message, argsToParse)
    }
    else {
        message.reply("Comando não existe\nUse -help para ver todos meus comandos!")

    }
});

(async function registerCommands(dir = 'commands') {
    let files = await fs.readdir(path.join(__dirname, dir));
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory())
            registerCommands(path.join(dir, file));
        else {
            if(file.endsWith('.js')) {
                let cmdName = file.substring(0, file.indexOf('.js'));
                try {
                    let cmdModule = require(path.join(__dirname, dir, file));
                    if(checkCommandModule(cmdName, cmdModule)) {
                        if(checkProperties(cmdName, cmdModule)) {
                            let { aliases } = cmdModule;
                            client.commands.set(cmdName, cmdModule.run);
                            if(aliases.lenght !== 0) 
                                aliases.forEach(alias => client.commands.set(alias, cmdModule.run))
                            commandStatus.push(
                                [`${c.gray(`${cmdName}`)}`, `${c.bgGreen('Sucesso')}` ]
                            )    
                        } 
                    }
                    else {
                    }
                  }
                  catch(err) {
                    console.log(err);
                    commandStatus.push(
                        [`${c.whiteBright(`${cmdName}`)}`, `${c.bgRedBright('Falhou')}`]
                    )
                  }
              }
          }    
      }
})()

//-------------------------------------------------------------------------------------------------------------------------------------------------------//
