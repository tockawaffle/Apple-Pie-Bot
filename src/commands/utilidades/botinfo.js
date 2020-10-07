module.exports = {
    run: async(client, message, args) => {

        const { MessageEmbed } = require('discord.js');
        const { guild } = message;
        const moment = require('moment')
        const owner = client.users.cache.get('723185654044950539')
        const created = moment(client.user.createdAt).locale('pt-br').format('LLLL')

        const embed = new MessageEmbed()
            .setAuthor(`${guild.name}`, owner.avatarURL({ dynamic: true }))
            .setDescription("Você realmente quer saber sobre mim? Okay!")
            .setThumbnail(client.user.avatarURL({dynamic: true}))
            .setColor("E7B985")
            .addField("Meu nome é:", client.user.username+', é um prazer te conhecer!')
            .addField("Fui criada por:", owner.tag)
            .addField("Meu criador me deu vida em um:", created)
            .addField("Meu código fonte (tome cuidado!)", "[Clique Aqui](https://github.com/The-Crow-pleb/Apple-Pie-Bot)")
            .addField('Se eu sou compromissada?', 'Claro! Com a farinha e a maça!')
        message.channel.send(embed);
        console.log(embed)
    },
    aliases: ['bi', 'bf'],
    description: 'Minha descrição'
}