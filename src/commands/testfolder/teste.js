const { MessageAttachment, MessageEmbed } = require('discord.js')
const path = require('path')

module.exports = {
    run: async(client, message, args) => {
        const owner = client.users.cache.get('723185654044950539')

        if(message.author.id === owner.id) {


        } else return console.log('Segurança funcionou:\nFailed to <command name>')
        
    }, aliases: ['tst'], description: 'testar algo sla'
}
