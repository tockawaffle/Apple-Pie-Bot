module.exports = {
    run: async(client, message, args) => {

        const owner = client.users.cache.get('723185654044950539')

        if(message.author.id === owner.id) {
            client.emit('guildMemberAdd', message.member)
            console.log('Se você não usou isso, houve uma falha na segurança do bot!\nrun: simjoin Command')
        } else return console.log('Segurança funcionou:\nFailed to run simjoin.')

    },aliases: ['simjoin'], description: ''
}