const fs = require('fs').promises;
const path = require('path');
const { checkCommandModule, checkProperties } = require('./validate');

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
                            if(aliases.length !== 0) {
                                aliases.forEach(alias => client.commands.set(alias, cmdModule.run));
                            }
                        }
                    }
                }
                catch(err) {
                    console.log(err);
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
                }
                catch(err) {
                    console.log(err);
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
                }
                catch(err) {
                    console.log(err);
                }
            }
        }
    }
}

// async function registerDblEvents(client, dir) {
//     let files = await fs.readdir(path.join(__dirname, dir));
//     for(let file of files) {
//         let stat = await fs.lstat(path.join(__dirname, dir, file));
//         if(stat.isDirectory())
//             registerEvents(client, path.join(dir, file));
//         else {
//             if(file.endsWith(".js")) {
//                 let dblEventName = file.substring(0, file.indexOf(".js"));
//                 try {
//                     let dblEventModule = require(path.join(__dirname, dir, file));
//                     client.on(dblEventName, dblEventModule.bind(null, client));
//                 }
//                 catch(err) {
//                     console.log(err);
//                 }
//             }
//         }
//     }
// }

module.exports = { 
    registerEvents, 
    registerCommands,
    registerPlayerEvents,
    // registerDblEvents
};