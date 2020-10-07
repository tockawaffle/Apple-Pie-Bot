module.exports = {
    run: async(client, message, args) => {

        const user = message.mentions.users.first()
        const { MessageEmbed } = require('discord.js');
        const { guild } = message;
        const moment = require('moment')


        if(!user) {

            try {
            
                const memberId = message.content.substring(message.content.indexOf(' ') + 1)
                const member = message.guild.members.cache.get(memberId);
                const created = moment(member.createdAt).locale('pt-br').format('LLLL')

                const embed = new MessageEmbed()
                    .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                    .setDescription("Informações quentinhas chegando!")
                    .setThumbnail(member.user.avatarURL({dynamic: true}))
                    .setColor("RANDOM")
                    .addField("Nome do Usuário:", member.user.tag)
                    .addField("ID:", member.user.id)
                    .addField("Conta criada em:", created)
                    .addField("Status:", member.user.presence.status)
                    .addField("O que o(a) usuário(a) faz?:", member.user.presence.game ? member.user.presence.game : 'Não está fazendo nada!')
                message.channel.send(embed);

            }catch(err) {
                console.log(err)
            }
        } else {

            const created = moment(user.createdAt).locale('pt-br').format('LLLL')

            const embed = new MessageEmbed()
                .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                .setDescription("Informações quentinhas chegando!")
                .setThumbnail(user.avatarURL({dynamic: true}))
                .setColor("RANDOM")
                .addField("Nome do Usuário:", user.tag)
                .addField("ID:", user.id)
                .addField("Conta criada em:", created)
                .addField("Status:", user.presence.status)
                .addField("O que o(a) usuário(a) faz?:", user.presence.game ? user.presence.game : 'Não está fazendo nada!')
            message.channel.send(embed);
        }
    },
    aliases: ["uf"],
    description: 'Userinfo'
}