module.exports = {
    run: async(client, message) => {

        const user = message.mentions.users.first()
        const { MessageEmbed } = require('discord.js');
        const { guild } = message;
        const args = message.content.split(' ');
        const moment = require('moment')

        if(args.length > 2) {
          message.channel.send(`Ops, algo deu errado!\nComo usar: -userinfo <user_id> | -userinfo @mention`);
        } else if(args.length === 2) {
            const member = message.mentions.members.size === 1 ? 
                message.mentions.members.first() :
                message.guild.members.cache.get(args[1]);
            if(member) {
                const created = moment(member.user.createdAt).locale('pt-br').format('LLLL')

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
            } else {
                message.channel.send(`Eu não consegui encontrar o usuario com o ID ou Menção: ${args[1]}, será que ele deixou de ser uma torta!?`);
            }

        }
    },
    aliases: ["uf"],
    description: 'Userinfo'
}