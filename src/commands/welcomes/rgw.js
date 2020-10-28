const mongo = require('../../../db/db')
const welcomeGSchema = require('../../../db/schemas/wgmsg-schema')
const languages = require('../../languages/languages')

module.exports = {
    run: async(client, message) => {

        const {guild, channel} = message

        if(!message.member.hasPermission('ADMINISTRATOR')) {
            return message.reply(`${languages(guild, 'GR_C')}`)
        }

        const gwelcome = await welcomeGSchema.findOneAndRemove({_id: guild.id,},{_id: guild.id,channelId: channel.id,},)
        try{
            if(gwelcome) {
                message.channel.send(`${languages(guild, 'GR_C2')}`)
            } else if(!gwelcome) {
                message.channel.send(`${languages(guild, 'GR_C3')}`)
            }
        }catch(err) {
            console.log(err)
        }

    }, aliases: ['rgw'], description: 'Remove a mensagem genérica de boas vindas'
}