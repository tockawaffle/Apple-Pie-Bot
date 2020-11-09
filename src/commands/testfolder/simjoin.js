module.exports = {
    run: async(client, message, args) => {

        const owner = client.users.cache.get('723185654044950539')
        if(message.author.id !== owner.id) return;

        if(message.author.id === owner.id) {

            client.emit('guildMemberAdd', message.member)
        }

    },aliases: [''], description: ''
}