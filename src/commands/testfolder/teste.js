module.exports = {
    run: async(client, message, args) => {
        const owner = client.users.cache.get('723185654044950539')

        if(message.author.id === owner.id) {
            const { guild } = message
            const member = guild.member.fetch()

            const role = message.guild.roles.cache.find(x => x.name === `Newbies`);
            if(!role) return
            else if(role) {
                member.kick()
            }

            console.log('Se você não usou isso, houve uma falha na segurança do bot!\nrun: <command name>')
        } else return console.log('Segurança funcionou:\nFailed to <command name>')
        
    }, aliases: ['<Aliases>'], description: '<Descrição>'
}
