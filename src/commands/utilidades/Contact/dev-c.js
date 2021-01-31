const { MessageEmbed } = require("discord.js");

module.exports = {
    aliases: ['support', 'contact'],
    description: 'Contata o dev do bot!',
    run: async(client, message) => {
        const args = message.content.split(' ')
        args.shift(' ')
        const { guild } = message
        const reportID = Math.random()

        const suggestionOrErrorReport = new MessageEmbed()
            .setTitle(`@ guilda: ${message.guild.name}`, message.guild.iconURL({dynamic: true}))
            .setDescription(`Enviado pelo usuário: ${message.author.username}\nCom o userID: ${message.author.id}\nNo servidor: ${guild.name}, ${guild.id}`)
            .addFields(
                {
                    name: `Conteúdo da mensagem:`,
                    value: `${args.join(' ')}`
                },
                {
                    name: `Report ID:`,
                    value: `${reportID}`
                }
            )
            .setColor('RANDOM')
        client.channels.cache.get('782331604467056642').send(suggestionOrErrorReport).catch(err => message.reply(`Error: ${error}\nPlease, contact the dev team at the support server.`))

        const MessageSent = new MessageEmbed()
            .setTitle(`${message.author.username}`, message.author.avatarURL({dynamic: true}))
            .setDescription(`Your report was sent to the dev server.`)
            .addFields(
                {
                    name: `Be **very** careful with reports or suggestions;`,
                    value: `If the report gets considered as a Troll Report, your server is going to get flagged.\n5 flags will result in your server being blocked to use this bot for a period of time`
                },
                {
                    name: `Support:`,
                    value: `If your server gets flagged, you can appeal at the [Support Server](https://discord.gg/eyGX6pWa5V)`
                },
                {
                    name: `Report ID (Please, you should remember this ID.):`,
                    value: `${reportID}`

                }
            )
            .setFooter(`This message is going to be deleted in One minute after it's sent.`)
            .setColor('RANDOM')
        message.channel.send(MessageSent).then((msg) => msg.delete({timeout: 60000}))
    }
}