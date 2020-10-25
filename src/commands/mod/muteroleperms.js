module.exports = {
    run: async (client, message, args) => {
        const languages = require('../../languages/languages')
        if(message.author.bot) return;
        if(!message.member.hasPermission('MANAGE_ROLES' & "MANAGE_CHANNELS")) {
            return message.reply(`${languages(guild, 'M_E')}` + process.env.POUT)
        }

        if (!message.guild.me.hasPermission("MANAGE_ROLES" & "MANAGE_CHANNELS")) {
            return message.channel.send(`${languages(guild, 'L_C')}`);
        }

        if(message.member.hasPermission('MANAGE_ROLES' & "MANAGE_CHANNELS")) {
            const { guild } = message
            try {
                let muteRole = message.guild.roles.cache.find(x => x.name === `${languages(guild, 'M_R')}`)
                message.guild.channels.cache.forEach(async (channel, id) => {
                    await channel.createOverwrite(muteRole, {
                       SEND_MESSAGES: false,
                       MANAGE_MESSAGES: false,
                       READ_MESSAGES: false,
                       ADD_REACTIONS: false
                    });
                 });
                message.channel.send(`${languages(guild, 'M_P')}`)
            } catch (error) {
                console.log(error);
                message.channel.send(`${languages(guild, 'MTR_ERR')}`)
                
            }
        }
    }, 
    aliases: ["mtrp"],
    description: "Cria o cargo 'Silenciado'"
}

require('dotenv').config()