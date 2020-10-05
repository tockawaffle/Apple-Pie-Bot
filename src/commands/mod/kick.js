const discord = require("discord.js");

module.exports = {
    run: (client, message, args) => {     
        if(message.author.bot) return;
        const { guild } = message
        const { discord } = require("discord.js");
        const { MessageEmbed } = require('discord.js')
        const user = message.mentions.users.first();
  
        if(!message.member.hasPermission("KICK_MEMBERS")) {
            return message.channel.send(`**${message.author.username}**, Você não tem permissão para isso!`)
        }     
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.channel.send(`**${message.author.username}**, Eu não tenho permissão para fazer isso!`)
        }      
        let target = message.mentions.members.first();     
        if(!target) {
            return message.channel.send(`**${message.author.username}**, Por favor, mencione alguém.`)
        }
        if(target.id === message.author.id) {
            return message.channel.send(`**${message.author.username}**, Por que quer sair assim? Você sabe que eu não posso te expulsar...`)
        }
        if(target.hasPermission("KICK_MEMBERS")) {
            return message.channel.send(`Ei! Você não pode expulsar meu superior!`)
        }
        const embed = new MessageEmbed()
            .setTitle("Ação: Expulsão")
            .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
            .setDescription(`${target} foi expulso(a) do servidor!`)
            .setColor("#ff2050")
            .setImage('https://i.pinimg.com/originals/6f/f1/40/6ff14029eb25bbbe796bcec5112eff67.gif')
            .setFooter(`${message.author.username} expulsou ${target}`);
        message.channel.send(embed)
        target.kick(args[1]);
    },
    aliases: ['kc'],
    description: 'Retira um membro do servidor!'
  }
