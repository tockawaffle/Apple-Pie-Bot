const { MessageEmbed } = require('discord.js')
const {getChannelId} = require('../../commands/memberleft/setleft')
const languages = require('../../util/languages/languages')
const path = require('path')

module.exports = async(client, member) => {
    const { guild } = member

    const g1 = 'https://i.pinimg.com/originals/d7/e0/14/d7e01423a736bcd73a3152d8ced9b444.gif'
    const g2 = 'https://i.pinimg.com/originals/d4/33/74/d43374f33f0249e121a13a6311745e35.gif'
    const g3 = 'https://i.pinimg.com/originals/d7/e0/14/d7e01423a736bcd73a3152d8ced9b444.gif'
    const leftImage = [g1, g2, g3]
    const random = leftImage[Math.floor(Math.random() * leftImage.length)]

    try{
        const channelId = getChannelId(guild.id)

        if(!channelId) {
            return
        }
    
        const channel = guild.channels.cache.get(channelId)
        if(!channel) {
            return
        }

        const embed = new MessageEmbed()
            .setThumbnail(member.user.avatarURL())
            .setTitle(`${member.user.tag} ${languages(guild, 'GW_C3')}!`)
            .setDescription(`${languages(guild, 'GW_C4')}`)
            .setColor('RANDOM')
            .setFooter(`${languages(guild, 'GW_C5')}`)
            .setImage(random)
        channel.send(embed)
    }catch(err) {
        console.log(err)
    }
}