const mongo = require('../../../db/db')
const welcomeSchema = require('../../../db/schemas/wmsg-schema')

module.exports = {
    run: async(client, message, args) => {

        const cache = {} // guildId: [channelId, text]

        const { member, channel, content, guild } = message
    
        if (!member.hasPermission('ADMINISTRATOR')) {
            channel.send('You do not have permission to run this command.')
            return
        }
    
        let text = content
    
        const split = text.split(' ')
    
        if (split.length < 2) {
            channel.send('Please provide a welcome message')
            return
        }
    
        split.shift()
        text = split.join(' ')
    
        cache[guild.id] = [channel.id, text]
      
        await welcomeSchema.findOneAndUpdate(
            {
                _id: guild.id,
            },
            {
                _id: guild.id,
                channelId: channel.id,
                text,
            },
            {
                upsert: true,
            }
        )

      
        const onJoin = async (member) => {
            const { guild } = member
        
            let data = cache[guild.id]
        
            if (!data) {
        
                const result = await welcomeSchema.findOne({ _id: guild.id })
            
                cache[guild.id] = data = [result.channelId, result.text]
            }
        
            const channelId = data[0]
            const text = data[1]
        
            const channel = guild.channels.cache.get(channelId)
            message.channel.send(text.replace(/<@>/g, `<@${member.id}>`))
        }

  

        client.on('guildMemberAdd', (member) => {
            onJoin(member)
        })

    }, aliases: ['setw', 'wmsg'], description: 'Mensagem de boas-vindas custominizavel!'
}