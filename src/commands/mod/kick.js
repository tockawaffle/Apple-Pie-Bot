module.exports = {
    run: (client, message, args) => {     
        if(message.author.bot) return;
        const { guild } = message
        const { discord } = require("discord.js");
        const { MessageEmbed } = require('discord.js')

        const user = message.mentions.users.first();

        if(!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply(`Você não tem permissão para isso!`)
        }

        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.channel.send("Eu não tenho permissão para expulsar alguém. Habilite a permissão 'Expulsar Membros' em meu cargo para que eu possa concluir o comando!");
        }
        
        if(user) {
            try {
                let target = message.mentions.members.first();

                if(target.id === message.author.id) {
                    return message.reply(`Por que quer sair assim? Você sabe que eu não posso te expulsar...`)
                }
                if(target.hasPermission("KICK_MEMBERS", "ADMINISTRATOR", "BAN_MEMBERS")) {
                   return message.reply('Impossivel! Ele tem permissões de administrador também, não vou me atrever a fazer isso...')
                }

                const embed = new MessageEmbed()
                    .setTitle("Ação: Expulsão")
                    .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                    .setDescription(`${user.tag} foi expulso(a) do servidor!`)
                    .setColor("#ff2050")
                    .setImage('https://i.pinimg.com/originals/6f/f1/40/6ff14029eb25bbbe796bcec5112eff67.gif')
                    .setFooter(`${message.author.username} expulsou ${user.tag}`);
                message.channel.send(embed)
                target.kick(args[1])
            }catch(err) {
                console.log(err)
            }
        } else {
            let target = message.mentions.members.first();
            const memberId = message.content.substring(message.content.indexOf(' ') + 1)
            const member = message.guild.members.cache.get(memberId);
            if(member.id === message.author.id) {
                return message.reply(`Por que quer sair assim? Você sabe que eu não posso te expulsar...`)
            }

            if(member.hasPermission("KICK_MEMBERS", "ADMINISTRATOR", "BAN_MEMBERS")) {
                return message.reply('Impossivel! Ele tem permissões de administrador também, não vou me atrever a fazer isso...')
            }

            const embed = new MessageEmbed()
                .setTitle("Ação: Expulsão")
                .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                .setDescription(`${member.user.tag} foi expulso(a) do servidor!`)
                .setColor("#ff2050")
                .setImage('https://i.pinimg.com/originals/6f/f1/40/6ff14029eb25bbbe796bcec5112eff67.gif')
                .setFooter(`${message.author.username} expulsou ${member.user.tag}`);
            message.channel.send(embed)
            member.kick(args[1])
        }

        
    },
    aliases: ['kc'],
    description: 'Retira um membro do servidor!'
  }
