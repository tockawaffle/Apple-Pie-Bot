module.exports = {
    run: async (client, message, args) => {
        const languages = require('../../languages/languages')
        const { guild } = message;
        if(message.author.bot) return;
        if(!message.member.hasPermission('MANAGE_ROLES')) {
            return message.reply(`${languages(guild, 'M_E')}` + process.env.POUT)
        }
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send(`${languages(guild, 'L_C')}`);
        }

        try{
            const mutedRole = message.guild.roles.cache.find(x => x.name === `${languages(guild, 'M_R')}`)
            if(mutedRole) {
                message.channel.send(`${languages(guild, 'M_E2')}`)
                return
            }
        }catch(err) {

        }

        if(message.member.hasPermission('MANAGE_ROLES')) {
            const { guild } = message
            try {
                guild.roles.create({
                    data:{
                    name: `${languages(guild, 'M_R')}`,
                    color:"grey",
                    permissions:[]
                },
                reason:"Cargo de mutado!",
                
                });
                message.channel.send(`${languages(guild, 'M8_C')}`)
            } catch (error) {
                console.log(error);
                message.channel.send(`${languages(guild, 'MTR_ERR')}`)
                
            }
        }
    }, 
    aliases: ["mtr"],
    description: "Cria o cargo 'Silenciado'"
}

require('dotenv').config()