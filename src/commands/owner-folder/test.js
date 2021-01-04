const { MessageEmbed } = require('discord.js')

module.exports = {
    run: async(client, message, args) => {
        const owner = client.users.cache.get('723185654044950539')

        if(message.author.id === owner.id) {
            let test = message.guild.channels.cache.get('782331604467056642')
        } 
        
    }, aliases: ['tst'], description: 'test'
}
