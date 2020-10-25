const languages = require('../../languages/languages')

module.exports = {
    run: async(client, message, args) => {
        const owner = client.users.cache.get('723185654044950539')
        const { MessageEmbed } = require('discord.js')
        const { guild } = message;

        if(message.author.id !== owner.id) return;

        if(message.author.id === owner.id) {
            message.reply(`${languages(guild, 'TESTE_LANG')} okay?`)

            const embed = new MessageEmbed()
                .setDescription(`[${languages(guild, 'AVATAR_C')}](${message.author.avatarURL({format: 'png', dynamic: true, size:2048})})`)
                .setImage(`${message.author.avatarURL({format: 'png', dynamic: true, size:2048})}`)
            message.channel.send(embed)
        }
        
    }, aliases: ['tstl'], description: 'Teste de Multilingua'
}
