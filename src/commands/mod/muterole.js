module.exports = {
    run: async (client, message, args) => {
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