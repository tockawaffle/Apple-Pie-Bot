const languages = require('../../../util/languages/languages')
const {MessageEmbed} = require('discord.js')
module.exports = {
    run: async(client, message, args) => {
        const user = message.mentions.users.first(); const me = message.mentions.has(client.user)
        const {guild} = message;

        const huggies = require('../../../configs/comandos/hug/hugging');
        const randomHuggies = huggies[Math.floor(Math.random() * huggies.length)]
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
                        value: languages(guild, "hUsage")
                    }
                )
            message.reply(noMember); return 
        }
        if(me){
            const embed = new MessageEmbed()
                .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                .setDescription(`${languages(guild, 'HUG_C')}`)
                .setImage("https://static.wixstatic.com/media/8b2700_45f6c28410c345d4a838c83a76ff3262~mv2.gif")
                .setColor("E7B985")
            message.channel.send(embed)
        }else if(user && !me) {
            const embed = new MessageEmbed()
                .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                .setTitle(`${languages(guild, 'HUG_C2')}`)
                .setDescription(`**${message.author.username}** ${languages(guild, 'HUG_C3')} **${user.username}**`)
                .setImage(await randomHuggies)
                .setColor('RANDOM')
                .setFooter(`${languages(guild, 'HUG_C4')}`)
            message.channel.send(embed)
        }
    },
    aliases: ['abrç', 'abraçar', 'hg'],
    description: 'Abraça outro usuário!'
}