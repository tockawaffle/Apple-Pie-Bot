const { mongo } = require('mongoose')
const prefixSchema = require('../../../db/schemas/prefix-schema')
module.exports = {
    run: async(client, message, args) => {

        const owner = client.users.cache.get('723185654044950539')

        if(message.author.id === owner.id) {
            try{
                const { guild } = message
                const prefix = args[0]
    
                await prefixSchema.findOneAndUpdate(
                    {
                        _id: guild.id
                    },
                    {
                        _id: guild.id,
                        prefix: prefix
                    },
                    {
                        upsert: true
                    }
                )
                message.channel.send('Atualizado')
            }catch(err) {
                console.log(err)
            }
            console.log('Se você não usou isso, houve uma falha na segurança do bot!\nrun: Set-Prefix Command')
        } else return console.log('Segurança funcionou:\nFailed to run set-prefix.')
        


    }, aliases: ['chgpfx'], description: ''
}