const { MessageEmbed } = require('discord.js')
const {getChannelId} = require('../../commands/welcomes/setgw')
const languages = require('../../languages/languages')
// const path = require('path')
// const Canvas = require('canvas')
 
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

    // const canvas = Canvas.createCanvas(700, 250)
    // const ctx = canvas.getContext('2d')

    // const background = await Canvas.loadImage(
    //     path.join(__dirname, '../../../images/background.png')
    // )
    // let x = 0
    // let y = 25
    // ctx.drawImage(background, x, y)

    // const pfp = await Canvas.loadImage(
    //     member.user.displayAvatarURL({
    //         format: 'png'
    //     })
    // )

    // x = canvas.width / 2 - pfp.width / 2
    // y = canvas.height /2 - pfp.height / 2
    // ctx.drawImage(pfp, x, y)

    // ctx.fillStyle = '#E7B985'
    // ctx.font = '35px sans-serif'
    // let text = `Welcome ${member.user.tag}`
    // x = canvas.widht / 2 - ctx.measureText(text).widht / 2
    // ctx.fillText(text, x, 60 + pfp.height)

    // const attachment = new MessageAttachment(canvas.toBuffer())
    // channel.send('', attachment)
}