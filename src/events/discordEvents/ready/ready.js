const db = require("@db/db"); const {loadUserLangs} = require("@lang");
const {setStatus, setAvatar} = require("../../.../../../Configs/Events/Statuses/setConfig")
module.exports = async(client) => {

    await db.then(console.log(`${client.user.username} - DataBase Connected.`))
    await loadUserLangs(client).then(console.log(`${client.user.username} - Languages Loaded`))
    console.log(`${client.user.username} - Ready.`)

    await setStatus(client)
    await setAvatar(client)

}