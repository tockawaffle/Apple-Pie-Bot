const 
	db = require("@db/db.js"),
	{loadUserLangs} = require("@lang"),
	{setStatus, setAvatar} = require("../../.../../../configs/Events/Statuses/setConfig.js")
module.exports = async(client) => {

    db.then(console.log(`${client.user.username} - Base de Dados Carregada.`))
    await loadUserLangs(client)
    console.log(`${client.user.username} - Idiomas carregados.\n${client.user.username} - Pronta em ${client.guilds.cache.size} servidores, com ${client.users.cache.size} usuários!`)

    await setStatus(client); await setAvatar(client)
}