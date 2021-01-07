module.exports = {
    run: async(client, message, args) => {

        const owner = client.users.cache.get('723185654044950539')
        const {guild} = message
        if(message.author.id === owner.id) {
            client.emit('guildCreate', guild)
        }

    },aliases: ['simjoin'], description: ''
}