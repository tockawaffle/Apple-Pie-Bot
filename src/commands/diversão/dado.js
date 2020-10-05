const { dado } = require('../../util/dicefn')

module.exports = {
    run: async(client, message) => {
        let msg = await message.channel.send(`Girando o dado. . . 🎲`)
            .then((msg)=> {
                setTimeout(function(){
                  msg.edit('Você girou no dado o número ' + dado());
                }, 2000)
              })
    },
    aliases: ['rolardado', 'rolar', 'dice', 'jogardado'],
    description: 'Rola um dado até o número 25'
}