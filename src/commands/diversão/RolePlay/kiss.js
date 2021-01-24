const languages = require('../../../util/languages/languages')
const {MessageEmbed} = require('discord.js');
module.exports = {
    run: async(client, message, args) => {

        const {guild} = message
        const user = message.mentions.users.first();
        const me = message.mentions.has(client.user);

        const kisses = require('../../../configs/comandos/kiss/kisses')
        const randomKisses = kisses[Math.floor(Math.random() * kisses.length)]

        if (!args[0]) {
            if(args[0] === undefined) args[0] = languages(guild, "noreason")
            const noMember = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "nomemb"))
                .addFields(
                    {
                        name: languages(guild, "nomemb2"),
                        value: `\`${args[0]}\``
                    },
                    {
                        name: languages(guild, "ncreate3"),
                        value: languages(guild, "kUsage")
                    }
                )
            message.reply(noMember); return 
        }
        if(me) {
            const embed = new MessageEmbed()
                .setAuthor(`${guild.name}`, guild.iconURL({dynamic: true}))
                .setTitle(`${languages(guild, 'KISS_C')}`)
                .setDescription(`${languages(guild, 'KISS_C1')}`)
                .setImage('https://static.wixstatic.com/media/8b2700_2dc119412843455e81183e12a936eb4b~mv2.gif')
                .setColor('RANDOM')
                .setFooter(`${languages(guild, 'KISS_C2')}`)
            message.channel.send(embed)
        } else if(user && !me) {
            const embed = new MessageEmbed()
                .setAuthor(`${guild.name}`, guild.iconURL({dynamic: true}))
                .setTitle(`${languages(guild, 'KISS_C4')}`)
                .setDescription(`${message.author.username} ${languages(guild, 'KISS_C5')} ${user.username} ${process.env.TOHRUYES}`)
                .setImage(await randomKisses)
                .setColor('RANDOM');
            message.channel.send(embed)
        }
    }, aliases: ['ks'], description: 'Hehe, beijinho'
}