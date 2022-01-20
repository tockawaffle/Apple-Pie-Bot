const 
	db = require("@db/db.js"),
	{loadUserLangs} = require("@lang"),
	{setStatus, setAvatar} = require("../../.../../../configs/Events/Statuses/setConfig.js")
module.exports = async(client) => {

    db.then(console.log(`${client.user.username} - DataBase Connected.`))
    await loadUserLangs(client)
    console.log(`${client.user.username} - Languages Loaded\n${client.user.username} - Ready.`)

    await setStatus(client); await setAvatar(client)
}