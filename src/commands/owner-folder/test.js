const { MessageEmbed } = require('discord.js')

module.exports = {
    run: async(client, message, args) => {
        const owner = client.users.cache.get('723185654044950539')

        if(message.author.id === owner.id) {

            const embed = new MessageEmbed()
                .setFooter(message.guild.name, message.guild.iconURL())
            message.reply(embed)

            console.log('Se você não usou isso, houve uma falha na segurança do bot!\nrun: <command name>')
        } else return console.log('Segurança funcionou:\nFailed to <command name>')
        
    }, aliases: ['tst'], description: 'test'
}
