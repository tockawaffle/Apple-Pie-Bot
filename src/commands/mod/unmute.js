module.exports = {
    run: async (client, message, args) => {


        const { guild } = message
        const { discord } = require("discord.js");
        const { MessageEmbed } = require('discord.js')
        const user = message.mentions.members.first();
        if(message.author.bot) return;
        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.channel.send(
                "Desculpe, mas você não tem permissão para fazer isso."
            );
        }
    
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("Eu não tenho permissão para mutar alguém.");
        }
    
        if(!user) {
            try {
                const { MessageEmbed } = require('discord.js')
                let mutedRole = message.guild.roles.cache.find(x => x.name === "Silenciado")
                let memberId = message.content.substring(message.content.indexOf(' ') + 1)
                let member = message.guild.members.cache.get(memberId);
                if(!mutedRole) {
                    message.reply('Olá!\nParece que não há o cargo "Silenciado" neste servidor, tenha certeza de criar o mesmo e configurar os canais para de modo correto para o unmute funcionar!')
    
                }    
                if(mutedRole) {
                        member.roles.remove(mutedRole)
                        const embed = new MessageEmbed()
                        .setTitle('Ação: Unmute')
                        .setDescription(`O usuário indicado foi desmutado(a) com sucesso!`)
                        .setColor('RANDOM')
                        .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                        .setFooter(`Unmute realizado por: ${message.author.tag}`);
                        message.channel.send(embed)
                    }
            } catch (err) {
                    message.reply('Algo de errado aconteceu, desculpe-me pela inconveniencia...')
                    console.log(err)
            }
        } else {
            let mutedRole = message.guild.roles.cache.find(x => x.name === "Silenciado")
            if(!mutedRole) {
                message.reply('Olá!\nParece que não há o cargo "Silenciado" neste servidor, tenha certeza de criar o mesmo e configurar os canais para de modo correto para o unmute funcionar!')
    
                }   
            if(mutedRole) {
                user.roles.remove(mutedRole)
                const embed = new MessageEmbed()
                    .setTitle('Ação: Unmute')
                    .setDescription(`O usuário mencionado foi desmutado(a) com sucesso!`)
                    .setColor('RANDOM')
                    .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                    .setFooter(`Unmute realizado por: ${message.author.tag}`);
                message.channel.send(embed)
            }
        }
    },
    aliases: ['desmutar', "unmt"],
    description: 'Desmuta um membro'
};
