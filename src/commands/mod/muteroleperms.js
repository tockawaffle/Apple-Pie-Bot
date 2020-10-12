module.exports = {
    run: async (client, message, args) => {

        if(message.author.bot) return;
        if(!message.member.hasPermission('MANAGE_ROLES')) {
            return message.reply('Hey hey, sei que você quer ajudar, mas você não tem o acesso ao comando' + process.env.POUT)
        }

        if(message.member.hasPermission('MANAGE_ROLES')) {
            const { guild } = message
            try {
                let muteRole = message.guild.roles.cache.find(x => x.name === "Silenciado")
                message.guild.channels.cache.forEach(async (channel, id) => {
                    await channel.createOverwrite(muteRole, {
                       SEND_MESSAGES: false,
                       MANAGE_MESSAGES: false,
                       READ_MESSAGES: false,
                       ADD_REACTIONS: false
                    });
                 });
                message.channel.send("Permissões do cargo 'Silenciado' foram criadas com sucesso!")
            } catch (error) {
                console.log(error);
                message.channel.send('Desculpe, algo errado aconteceu...')
                
            }
        }
    }, 
    aliases: ["mtrp"],
    description: "Cria o cargo 'Silenciado'"
}

require('dotenv').config()