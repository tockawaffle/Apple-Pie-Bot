const { MessageEmbed } = require("discord.js")

module.exports = {
    run: async(client, message) => {
        const owner = client.users.cache.get('723185654044950539')
        const args = message.content.split(' ')
        args.shift(' ')
        if(message.author.id === owner.id) {


            const userID = args[0]
            if(!userID) return message.reply('O caraio, tu precisa me dar um ID de usuário para me fazer responder.')
            else {
                const user = client.users.cache.get(`${userID}`)
                args.shift(' ')

                const devInfo = new MessageEmbed()
                    .setTitle(`The dev: ${message.author.username} answered your repport`)
                    .setDescription(`${args.join(' ')}`)
                    .setFooter(`We appreciate that you sent us a report!`)
                    .setColor(`GREEN`)
                    .addFields(
                        {
                            name: `Dev ID:`,
                            value: `${message.author.id}`
                        }
                    )

                user.send(devInfo)
            }
            
        }
        
    }, aliases: ['r'], description: 'Responde um usuário que fez algum reporte'
}
