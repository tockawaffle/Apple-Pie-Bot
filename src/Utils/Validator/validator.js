module.exports.checkCommandModule = (cmdName, cmdModule) => {
    if(!cmdModule.hasOwnProperty('run'))
    throw new Error(`O comando "${cmdName}" não tem a propriedade 'run'`)
    if(!cmdModule.hasOwnProperty('aliases'))
        throw new Error(`O comando "${cmdName}" não tem a propriedade 'aliases'`)
    return true
}

module.exports.checkProperties = (cmdName, cmdModule) => {
    if(typeof cmdModule.run !== 'function')
        throw new Error(`A função 'run' no comando ${cmdName} não existe!`)
    if(!Array.isArray(cmdModule.aliases))
        throw new Error(`Hey hey, as aliases do comando ${cmdName} não existem!`)
    return true;
}