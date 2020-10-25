module.exports = {
    run: async(client, message, args) => {  
      const languages = require('../../languages/languages')
      const { MessageEmbed } = require('discord.js')
      const { guild } = message;

      if(message.author.bot) return;
        const embed = new MessageEmbed()
          .setTitle(`${languages(guild, 'H_C4')}`)
          .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
          .setThumbnail(guild.iconURL({ dynamic: true }))
          .addFields(
              {
                  name: 'Utilidades / Utilities:', 
                  value: '-convite(-cvt)\n\n-help (-ajuda, -h)\n\n-avatar (-avt)\n\n-ping (-ping)\n\n-aliases (-als)\n\n-dado (-rolardado, -rolar, -dice, -jogardado)\n\n-botinfo (-bf, -bi)\n\n-userinfo (-uf), -github (-gt, -gthb)',
                  inline: true
              },
              
              {
                  name: 'Moderação / Moderation:',
                  value: '-ban (-b)\n\n-kick (-kc)\n\n-mute (-mt)\n\n-unban (-unb)\n\n-unmute (-unmt)\n\n-muterole (-mtr)\n\n -muteroleperms (-mtrp)\n\n-slowmode (-sm)\n\n-smremove (-smr)\n\n-lock (-l)\n\n-unlock(-ul)',
                  inline: true
              },

              {
                name: 'Brincadeiras / Fun:',
                value: '-dado (-dice)\n\n-meme (-rdm, -reddit)\n\n-rps (-joken, -jokenpo)'
              },

              {
                name: 'Outros / Others:',
                value: '-nowelcome (-nw)'
              }
            )
          .setColor('RANDOM')
        message.channel.send(embed); 
              
    },
    aliases: ['als'],
    description: 'Aliases'
  }
  