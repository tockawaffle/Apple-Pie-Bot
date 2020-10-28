const mongo = require('../../../db/db')
const welcomeSchema = require('../../../db/schemas/wmsg-schema')
const languages = require('../../languages/languages')

module.exports = {
    
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) {
            return message.reply(`${languages(guild, 'RM_C')}`)
        }

        const { guild, channel, content } = message
        let text = content

        try{
            const welcome = await welcomeSchema.findOneAndRemove({ _id: guild.id, }, { _id: guild.id, channelId: channel.id,text,})
            if(welcome) {
                message.channel.send(`${languages(guild, 'RM_C2')}`)
            } else if (!welcome) {
                message.channel.send(`${languages(guild, 'RM_C3')}`)
            }
        } catch(err) {
            console.log(err)
        }
    }, aliases: ['rwmsg'], description: 'Remove a mensagem customizavel de boas vindas'
}