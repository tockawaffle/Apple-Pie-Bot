module.exports = async (client) => {

    const database = require('../../../../db/db')
      database.then(() => console.log(`${client.user.username} se conectou ao MongoDB!`)).catch(err => console.log(err))
    const { loadLangs } = require('../../../util/languages/languages')
    console.log(
        `
        ╠═════════════════════════════════════════════════╣
        ║    ∑${client.user.username} está pronta em:            ║
        ║    ↣ ${client.guilds.cache.size} Servidores                               ║
        ║    ↣ ${client.users.cache.size} Usuários                                ║
        ╚═════════════════════════════════════════════════╝
        `
    )
    
    client.user.setActivity(`_help`, {type: 'LISTENING'});
    let activNum = 0;
    setInterval(function() {
        if(activNum === 0) {
            client.user.setActivity(`_site`, {type: 'LISTENING'})
            activNum = 1;
        } else if (activNum === 1) {
            client.user.setActivity("Eu sou a Apple Pie! Você gosta de tortinhas? ", {type: 'PLAYING'})
            activNum = 2;
        } else if (activNum === 2) {
            client.user.setActivity("I'm Apple Pie! Do you like Apple pies?")
            activNum = 3;
        } else if (activNum === 3) {
            client.user.setActivity(`Maçã é a melhor fruta! E não vale me refutar`)
            activNum = 4;
        } else if (activNum === 4) {
            client.user.setActivity(`Apple is the best fruit ever! And don\'t you dare to disagree!`)
            activNum = 0;
        }
    }, 300 * 1000);


    client.user.setAvatar('src/events/discordEvents/ready/imgs/avatar1.jpg').catch(err => console.log(`${err}`))
    let av = 0
    setInterval(function() {
      if(av === 0) {
        client.user.setAvatar('src/events/discordEvents/ready/imgs/avatar2.jpg')
        av = 1
      } else if (av === 1) {
        client.user.setAvatar('src/events/discordEvents/ready/imgs/avatar3.jpg')
        av = 2
      } else if (av === 2 ) {
        client.user.setAvatar('src/events/discordEvents/ready/imgs/avatar4.jpg')
        av = 3
      } else if (av === 3) {
        client.user.setAvatar('src/events/discordEvents/ready/imgs/avatar5.jpg')
        av = 0
      } 
      
    }, 7200000);

    loadLangs(client)
}