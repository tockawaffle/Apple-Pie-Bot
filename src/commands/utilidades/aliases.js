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
                    value: '-convite(-cvt)\n\n-help (-ajuda, -h)\n\n-avatar (-avt)\n\n-ping (-ping)\n\n-aliases (-als)\n\n-dado (-rolardado, -rolar, -dice, -jogardado)\n\n-botinfo (-bf, -bi)\n\n-userinfo (-uf), -github (-gt, -gthb)',
                    inline: true
                },
                
                {
                    name: 'Moderação:',
                    value: '-ban (-b)\n\n-kick (-kc)\n\n-mute (-mt)\n\n-unban (-unb)\n\n-unmute (-unmt)\n\n-muterole (-mtr)\n\n -muteroleperms (-mtrp)\n\n-slowmode (-sm)\n\n-smremove (-smr)\n\n-lock (-l)\n\n-unlock(-ul)',
                    inline: true
                },

                {
                  name: 'Brincadeiras:',
                  value: '-dado (-dice)\n\n-meme (-rdm, -reddit)\n\n-rps (-joken, -jokenpo)'
                },

                {
                  name: 'Outros',
                  value: '-nowelcome (-nw)'
                }
              )
              .setColor('RANDOM')
                message.channel.send(embed); 
              
    },
    aliases: ['als'],
    description: 'Aliases'
  }
  