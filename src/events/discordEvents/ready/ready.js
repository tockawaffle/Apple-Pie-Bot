const db = require("@db/db"); const {loadUserLangs} = require("@lang");
module.exports = async(client) => {

    await db.then(console.log(`${client.user.username} - DataBase Connected.`))
    await loadUserLangs(client).then(console.log(`${client.user.username} - Languages Loaded`))
    console.log(`${client.user.username} - Ready.`)
    
    const ms = require("ms")
    client.user.setAvatar('src/Configs/Events/imgs/perfil/i1.png').catch(err => console.log(`${err}`)); let av = 0
    setInterval(function() {
        if(av === 0) {client.user.setAvatar('src/Configs/Events/imgs/perfil/i2.jpg'); av = 1} 
        else if (av === 1) {client.user.setAvatar('src/Configs/Events/imgs/perfil/i3.jpg'); av = 2} 
        else if (av === 2 ) {client.user.setAvatar('src/Configs/Events/imgs/perfil/i4.jpg'); av = 3} 
        else if (av === 3) {client.user.setAvatar('src/Configs/Events/imgs/perfil/i5.jpg'); av = 4}
        else if (av === 4) {client.user.setAvatar('src/Configs/Events/imgs/perfil/i1.png'); av = 0} 
    }, ms('2h'));
}