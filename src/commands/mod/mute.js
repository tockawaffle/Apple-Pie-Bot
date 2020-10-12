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
            return message.channel.send("Eu não tenho permissão para mutar alguém. Habilite a permissão 'Gerenciar Cargos' em meu cargo para que eu possa concluir o comando!");
        }
        if(!user) {
            try {
                const { MessageEmbed } = require('discord.js')
                let mutedRole = message.guild.roles.cache.find(x => x.name === "Silenciado")
                let memberId = message.content.substring(message.content.indexOf(' ') + 1)
                let member = message.guild.members.cache.get(memberId);
                if(!mutedRole) {
                    message.reply('Olá!\nParece que não há o cargo "Silenciado" neste servidor, utilize os comandos -mtr (para criar o cargo) e -mtrp (para configurar as permissões do mesmo)!')
                }
                if(mutedRole) {
                    member.roles.add(mutedRole)
                    const embed = new MessageEmbed()
                    .setTitle('Ação: Silenciamento')
                    .setDescription(`O usuário indicado foi silenciado(a) com sucesso!`)
                    .setColor('RANDOM')
                    .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                    .setFooter(`Silenciamento realizado por: ${message.author.tag}`);
                    message.channel.send(embed)
                }
            } catch (err) {
                    message.reply('Desculpe, mas... Você tem certeza que mencionou a pessoa certa?')
                    console.log(err)
            }
        } else {
            let mutedRole = message.guild.roles.cache.find(x => x.name === "Silenciado")
            if(!mutedRole) {
                message.reply('Olá!\nParece que não há o cargo "Silenciado" neste servidor, utilize os comandos -mtr (para criar o cargo) e -mtrp (para configurar as permissões do mesmo)!')
            } 
            if(mutedRole) {
                user.roles.add(mutedRole)
                const embed = new MessageEmbed()
                .setTitle('Ação: Silenciamento')
                .setDescription(`O usuário mencionado foi silenciado(a) com sucesso!`)
                .setColor('RANDOM')
                .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                .setFooter(`Silenciamento realizado por: ${message.author.tag}`);
                message.channel.send(embed)
                
            }
        }
    },
    aliases: ['mute', "mt"],
    description: 'Muta um membro'
  };
  
  
