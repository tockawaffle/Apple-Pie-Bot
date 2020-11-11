const dado = () => Math.floor(Math.random() * 25) + 1;
const languages = require('../../util/languages/languages')

module.exports = {
    run: async(client, message) => {
        const { guild } = message;
        let msg = await message.channel.send(`${languages(guild, 'DADO_C')}`)
            .then((msg)=> {
                setTimeout(function(){
                  msg.edit(`${languages(guild, 'DADO1_C')}` + dado());
                }, 2000)
              })
    },
    aliases: ['rolardado', 'rolar', 'dice', 'jogardado'],
    description: 'Rola um dado até o número 25'
}