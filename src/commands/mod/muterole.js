module.exports = {
    run: async (client, message, args) => {
        
        if(message.author.bot) return;
        if(!message.member.hasPermission('MANAGE_ROLES')) {
            return message.reply('Hey hey, sei que você quer ajudar, mas você não tem o acesso ao comando' + process.env.POUT)
        }
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("Eu não posso criar o cargo de Silenciado. Habilite a permissão 'Gerenciar Cargos' em meu cargo para que eu possa concluir o comando!");
        }
        if(message.member.hasPermission('MANAGE_ROLES')) {
            const { guild } = message
            try {
                guild.roles.create({
                    data:{
                    name:"Silenciado",
                    color:"grey",
                    permissions:[]
                },
                reason:"Cargo de mutado!",
                
                });
                message.channel.send("Cargo 'Silenciado' foi criado com sucesso!")
            } catch (error) {
                console.log(error);
                message.channel.send('Desculpe, algo errado aconteceu...')
                
            }
        }
    }, 
    aliases: ["mtr"],
    description: "Cria o cargo 'Silenciado'"
}

require('dotenv').config()