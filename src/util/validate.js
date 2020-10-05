module.exports.checkCommandModule = (cmdName, cmdModule) => {
    if(!cmdModule.hasOwnProperty('run'))
    throw new Error(`O comando "${cmdName}" não tem a propriedade 'run'`)
    if(!cmdModule.hasOwnProperty('description'))
        throw new Error(`O comando "${cmdName}" não tem a propriedade 'description'`)
    if(!cmdModule.hasOwnProperty('aliases'))
        throw new Error(`O comando "${cmdName}" não tem a propriedade 'aliases'`)

    return true
}

module.exports.checkProperties = (cmdName, cmdModule) => {
    if(typeof cmdModule.run !== 'function')
        throw new Error(`${cmdName}: 'run' não é uma função`)
    if(typeof cmdModule.description !== 'string')
        throw new Error(`${cmdName} 'description' não é uma linha`)
    if(!Array.isArray(cmdModule.aliases))
        throw new Error(`${cmdName} 'aliases' não existe`)
    return true;
}