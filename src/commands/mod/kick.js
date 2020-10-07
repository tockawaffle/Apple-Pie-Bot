//Since I know it's pretty difficult to do this for begginers (like me), I'm going to explain what I did.
//Yes, I did this alone, I'm tired AS FREECK

const discord = require("discord.js");

module.exports = {
    run: (client, message, args) => {     
        if(message.author.bot) return;
        const { guild } = message
        const { discord } = require("discord.js");
        const { MessageEmbed } = require('discord.js')

        //Setting the user constance
        const user = message.mentions.users.first();

        if(!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply(`Você não tem permissão para isso!`)
        }
        
        //If it has a mentioned user, kick him using the mention
        if(user) {
            try {
                //Let the target be the mentioned *member*
                let target = message.mentions.members.first();

                //Permission stuff
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
                //Kicking the target that is the mentioned member
                target.kick(args[1])
            }catch(err) {
                console.log(err)
            }
            //If there isnt is a mentioned user, try to catch his userID from the cache
        } else {
            let target = message.mentions.members.first();
            //Here we are going to search the id
            const memberId = message.content.substring(message.content.indexOf(' ') + 1)
            //Here we found the id
            const member = message.guild.members.cache.get(memberId);
            if(member.id === message.author.id) {
                //DON'T FORGET THE RETURN! if you do, it's going to send the embed message and also the .reply
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
            //you need to set up the args before kicking someone, also, need to use another tag other than 'target', so that's why member, because it was the constance that has the userID
            member.kick(args[1])

            //Sincerely, I don't really know how I could make this work xD
        }

        
    },
    aliases: ['kc'],
    description: 'Retira um membro do servidor!'
  }
