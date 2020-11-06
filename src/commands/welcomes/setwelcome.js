const mongo = require('../../../db/db')
const welcomeSchema = require('../../../db/schemas/wmsg-schema')
const languages = require('../../languages/languages')

const {MessageEmbed} = require('discord.js')

module.exports = {
    run: async(client, message, args) => {

        const cache = {}
        const { member, channel, content, guild } = message
    
        if (!member.hasPermission('ADMINISTRATOR')) {
            channel.send(`${languages(guild, 'WM_C')} ${process.env.POUT}`)
            return
        }
    
        let text = content
    
        const split = text.split(' ')

        // ${languages(guild, 'RM_C2')}
        try{
            const welcome = await welcomeSchema.findOne({ _id: guild.id, }, { _id: guild.id, channelId: channel.id,text,})
            if(welcome) {
                return message.channel.send(`${languages(guild, 'WM_ERR')}`)
            }
        } catch(err) {
            console.log(err)
        }
    
        if (split.length < 2) {
            const embed = new MessageEmbed()
                .setTitle(`${languages(guild, 'WM_C3')}`)
                .setDescription(`${languages(guild, 'WM_C4')}`)
                .addField(`${languages(guild, 'WM_C5')}`, `[${languages(guild, 'WM_C6')}](https://github.com/The-Crow-pleb/Junk/tree/master/Atalhos/Apple%20Pie/WelcomeTypes)`)
                .setColor('ff0202')
            channel.send(embed)
            return
        }
    
        split.shift()
        text = split.join(' ')
    
        cache[guild.id] = [channel.id, text]
      
        try{
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
            message.channel.send(`${languages(guild, 'WM_C7')}`)
        }catch(err) {
            console.log(err)
        }

      
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
            channel.send(text.replace(/<@>/g, `<@${member.id}>`))
        }

  

        client.on('guildMemberAdd', (member) => {
            onJoin(member)
        })

    }, aliases: ['setw', 'wmsg'], description: 'Mensagem de boas-vindas customizavel!'
}