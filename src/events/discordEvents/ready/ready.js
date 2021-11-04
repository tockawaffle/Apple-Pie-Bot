const 
	db = require("@db/db.js"),
	{loadUserLangs} = require("@lang"),
	{setStatus, setAvatar} = require("../../.../../../configs/Events/Statuses/setConfig.js")
module.exports = async(client) => {

    await db.then(console.log(`${client.user.username} - DataBase Connected.`))
    await loadUserLangs(client).then(console.log(`${client.user.username} - Languages Loaded`))
    console.log(`${client.user.username} - Ready.`)

    await setStatus(client)
    await setAvatar(client)

}