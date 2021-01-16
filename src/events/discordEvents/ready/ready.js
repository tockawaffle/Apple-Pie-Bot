module.exports = async(client) => {
    const newPrefixSchema = require('../../../configs/db/schemas/prefix-schema')
    const {loadLangs} = require('../../../util/languages/languages')
    const status = require('../../../configs/status/statusA');
    const random = status[Math.floor(Math.random() * status.length)];
    const ms = require('ms');
    const db = require('../../../configs/db/db');
    
    client.guilds.cache.forEach(async(guild) => {
        await newPrefixSchema.insertMany({_id: guild.id, prefix: '_'})
    })

    db.then(() => console.log(`${client.user.username} se conectou à DB!`)).catch(err => console.log(err))
    console.log('╠══════════════════════════════════ ( Login ) ═══════════════════════════════════════╣')
    console.log(`║ > Entrou como ${client.user.tag}!                                                 ║`);
    console.log('╠══════════════════════════════════ ( Servers ) ═════════════════════════════════════╣')
    console.log(`║ > Ativo em ${client.guilds.cache.size} servers!                                                              ║`)
    console.log('╚════════════════════════════════════════════════════════════════════════════════════╝	')

    client.user.setActivity(random, {type: 'PLAYING'}); let actNum = 0
    setInterval(function() {
        if(actNum === 0) {const random2 = status[Math.floor(Math.random() * status.length)]; client.user.setActivity(random2, {type: 'PLAYING'}); actNum = 1}
        else if(actNum === 1) {const random3 = status[Math.floor(Math.random() * status.length)]; client.user.setActivity(random3, {type: 'PLAYING'}); actNum = 0}
    }, ms('1m'))

    client.user.setAvatar('src/configs/imgs/perfil/i1.jpg').catch(err => console.log(`${err}`)); let av = 0
    setInterval(function() {
        if(av === 0) {client.user.setAvatar('src/configs/imgs/perfil/i2.jpg'); av = 1} 
        else if (av === 1) {client.user.setAvatar('src/configs/imgs/perfil/i3.jpg'); av = 2} 
        else if (av === 2 ) {client.user.setAvatar('src/configs/imgs/perfil/i4.png'); av = 3} 
        else if (av === 3) {client.user.setAvatar('src/configs/imgs/perfil/i5.png'); av = 0} 
    }, ms('2h'));
    loadLangs(client)
}