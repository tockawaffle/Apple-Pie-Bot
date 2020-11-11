const MemberLeftSchema = require('../../../db/schemas/memberleft-schema')
const languages = require('../../util/languages/languages')

module.exports = {
    run: async(client, message) => {

        const {guild, channel} = message

        if(!message.member.hasPermission('ADMINISTRATOR')) {
            return message.reply(`${languages(guild, 'GR_C')}`)
        }

        const gwelcome = await MemberLeftSchema.findOneAndRemove({_id: guild.id,},{_id: guild.id,channelId: channel.id,},)
        try{
            if(gwelcome) {
                message.channel.send(`${languages(guild, 'RL_C')}`)
            } else if(!gwelcome) {
                message.channel.send(`${languages(guild, 'RL_C2')}`)
            }
        }catch(err) {
            console.log(err)
        }

    }, aliases: ['rlft'], description: 'Remove a mensagem de saída do server'
}