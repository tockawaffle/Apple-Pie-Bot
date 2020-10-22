module.exports = {
    run: async(client, message, args) => {
        const owner = client.users.cache.get('723185654044950539')
        if(message.author.id !== owner.id) return;

        if(message.author.id === owner.id) {
            message.guild.channels.cache.forEach(async (channel, id) => {
                await channel.createOverwrite(channel.guild.roles.everyone, {
                MANAGE_MESSAGES: false,
                ADD_REACTIONS: false
                })
            })
            const channel = message.channel
            channel.createOverwrite(client.user, {SEND_MESSAGES: true})
        }
    }, aliases: ['cover'], description: 'Teste para criação de overwrite'
}
