const c = require('ansi-colors');
const fs = require('fs').promises;
const path = require('path');
const { checkCommandModule, checkProperties } = require('./validate');
const commandStatus = [
    [`${c.bold('Command')}`, `${c.bold('Status')}`, `${c.bold('Description')}`]
], eventStatus = [
    [`${c.bold('Event')}`, `${c.bold('Status')}`, `${c.bold('Description')}`]
], playerEventStatus = [
    [`${c.bold('Player Event')}`, `${c.bold('Status')}`, `${c.bold('Description')}`]
]

async function registerCommands(client, dir) {
    let files = await fs.readdir(path.join(__dirname, dir));
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory())
            registerCommands(client, path.join(dir, file));
        else {
            if(file.endsWith(".js")) {
                let cmdName = file.substring(0, file.indexOf(".js"));
                try {
                    let cmdModule = require(path.join(__dirname, dir, file));
                    if(checkCommandModule(cmdName, cmdModule)) {
                        if(checkProperties(cmdName, cmdModule)) {
                            let { aliases } = cmdModule;
                            client.commands.set(cmdName, cmdModule.run);
                            if(aliases.length !== 0)
                                aliases.forEach(alias => client.commands.set(alias, cmdModule.run));
                            commandStatus.push(
                                [`${c.cyan(`${cmdName}`)}`, `${c.bgGreenBright('Successo')}`, `${cmdModule.description}`]
                            )
                        }
                    }
                }
                catch(err) {
                    console.log(err);
                    commandStatus.push(
                        [`${c.white(`${cmdName}`)}`, `${c.bgRedBright('Falha!')}`, '']
                    );
                }
            }
        }
    }
}

async function registerEvents(client, dir) {
    let files = await fs.readdir(path.join(__dirname, dir));
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory())
            registerEvents(client, path.join(dir, file));
        else {
            if(file.endsWith(".js")) {
                let eventName = file.substring(0, file.indexOf(".js"));
                try {
                    let eventModule = require(path.join(__dirname, dir, file));
                    client.on(eventName, eventModule.bind(null, client));
                    eventStatus.push(
                        [`${c.cyan(`${eventName}`)}`, `${c.bgGreenBright('Successo')}`, `${eventModule.description}`]
                    )
                }
                catch(err) {
                    console.log(err);
                    eventStatus.push(
                        [`${c.white(`${eventName}`)}`, `${c.bgRedBright('Falha!')}`, '']
                    );
                }
            }
        }
    }
}

async function registerPlayerEvents(client, dir) {
    let files = await fs.readdir(path.join(__dirname, dir));
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory())
            registerEvents(client, path.join(dir, file));
        else {
            if(file.endsWith(".js")) {
                let playerEventName = file.substring(0, file.indexOf(".js"));
                try {
                    let playerEventModule = require(path.join(__dirname, dir, file));
                    client.on(playerEventName, playerEventModule.bind(null, client));
                    playerEventStatus.push(
                        [`${c.cyan(`${playerEventName}`)}`, `${c.bgGreenBright('Successo')}`, `${playerEventModule.description}`]
                    )
                }
                catch(err) {
                    console.log(err);
                    playerEventStatus.push(
                        [`${c.white(`${playerEventName}`)}`, `${c.bgRedBright('Falha!')}`, '']
                    );
                }
            }
        }
    }
}

module.exports = { 
    commandStatus, 
    eventStatus, 
    playerEventStatus,
    registerEvents, 
    registerCommands,
    registerPlayerEvents
};