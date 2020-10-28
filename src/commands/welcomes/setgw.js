const mongo = require('../../../db/db')
const welcomeGSchema = require('../../../db/schemas/wgmsg-schema')
const languages = require('../../languages/languages')

module.exports = {
    run: async(client, message, args) => {


        const cache = {}
        const { member, channel, content, guild } = message
    
        if (!member.hasPermission('ADMINISTRATOR')) {
            channel.send(`${languages(guild, 'GW_C')}`)
            return
        }
        
        cache[guild.id] = [channel.id]

        await welcomeGSchema.findOneAndUpdate(
            {
                _id: guild.id,
            },
            {
                _id: guild.id,
                channelId: channel.id,
            },
            {
                upsert: true,
            }
        )
        
        message.channel.send(`${languages(guild, 'GW_C2')}`)

        const onJoin = async (member) => {
            const { guild } = member
        
            let data = cache[guild.id]
        
            if (!data) {
        
                const result = await welcomeSchema.findOne({ _id: guild.id })
            
                cache[guild.id] = data = [result.channelId]
            }
        
            const channelId = data[0]
        
            const channel = guild.channels.cache.get(channelId)
            const { MessageEmbed } = require('discord.js')
            
            const embed = new MessageEmbed()
                .setThumbnail(member.user.avatarURL())
                .setTitle(`${member.user.tag} ${languages(guild, 'GW_C3')}!`)
                .setDescription(`${languages(guild, 'GW_C4')}`)
                .setColor('RANDOM')
                .setFooter(`${languages(guild, 'GW_C5')}`)
                .setImage('https://i.pinimg.com/originals/b0/de/02/b0de026a12e20137a654b5e2e65e2aed.gif')
            channel.send(embed)
        }

        client.on('guildMemberAdd', (member) => {
            onJoin(member)
        })
        
    }, aliases: ['setgw', 'gwmsg'], description: 'Mensagem de boas-vindas genérica!'
}