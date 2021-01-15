const { MessageEmbed } = require('discord.js')
const {getChannelId} = require('../../../commands/MongoDB/Welcomes/setgw')
const languages = require('../../../util/languages/languages')
 
module.exports = async(client, member) => {
    const { guild } = member
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
            .setImage('https://i.pinimg.com/originals/b0/de/02/b0de026a12e20137a654b5e2e65e2aed.gif')
        channel.send(embed)
    }catch(err) {
        console.log(err)
    }
}