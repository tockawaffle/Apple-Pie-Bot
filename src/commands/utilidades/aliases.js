module.exports = {
    run: async(client, message, args) => {  
      
        const { MessageEmbed } = require('discord.js')
        const { guild } = message;
  
        if(message.author.bot) return;
          const embed = new MessageEmbed()
            .setTitle('Tudo fica um pouco mais fácil quando o trabalho, é menor!')
            .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                {
                    name: 'Utilidades:', 
                    value: '-convite(-cvt)\n\n-help (-ajuda, -h)\n\n-avatar (-avt)\n\n-ping (-ping)\n\n-aliases (-als)\n\n-dado (-rolardado, -rolar, -dice, -jogardado)',
                    inline: true
                },
                
                {
                    name: 'Moderação:',
                    value: '-ban (-b)\n\n-kick (-kc)\n\n-mute (-mt)\n\n-unban (-unb)\n\n-unmute (-unmt)\n\n-muterole (-mtr)\n\n -muteroleperms (-mtrp)',
                    inline: true
                }
              )
              .setColor('RANDOM')
                message.channel.send(embed); 
              
    },
    aliases: ['als'],
    description: 'Aliases'
  }
  