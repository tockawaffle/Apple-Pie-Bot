module.exports = {
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || message.author;
        const member = message.mentions.members.first() || message.member;
        const { MessageEmbed } = require('discord.js');
        const { guild } = message;
        if(!member) return message.channel.send('T1');

        let embed = new MessageEmbed()
            .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
            .setDescription("Informações quentinhas chegando!")
            .setColor("RANDOM")
            .addField("Nome do Usuário:", user.tag)
            .addField("ID:", user.id)
            .addField("Conta criada em:", user.createdAt)
            .addField("Status:", user.presence.status)
            .addField("O que o(a) usuário(a) faz?:", user.presence.game ? user.presence.game : 'Não está fazendo nada!')
        message.channel.send(embed);
        console.log(embed)

    },
    aliases: ["uf"],
    description: 'Userinfo'
}