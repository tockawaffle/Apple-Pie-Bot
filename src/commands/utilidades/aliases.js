module.exports = {
    run: async(client, message, args) => {  
      const languages = require('../../util/languages/languages')
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
                  value: '-convite(-cvt)\n-help (-ajuda, -h)\n-avatar (-avt)\n-ping (-ping)\n-aliases (-als)\n-botinfo (-bf, -bi)\n-userinfo (-uf)\n-github (-gt, -gthb)\n-serverinfo (-si)\n-uptime (-upt)',
                  inline: true
              },
              
              {
                  name: 'Moderação / Moderation:',
                  value: '-ban (-b)\n-kick (-kc)\n-mute (-mt)\n-unban (-unb)\n-unmute (-unmt)\n-slowmode (-sm)\n-smremove (-smr)\n-lock (-l)\n-unlock(-ul)',
                  inline: true
              },

              {
                name: 'Brincadeiras / Fun:',
                value: '-dado (-dice)\n-meme (-rdm, -reddit)\n-rps (-joken, -jokenpo)\n-snakegame (-snake)',
                inline: true
              },

              {
                name: 'Outros / Others:',
                value: '-setlanguage (-setl)',
                inline: true
              },
              {
                name: 'Mensagens de boas-vindas / Welcome Messages:',
                value: '-sgw\n-rgw',
                inline: true
              }
            )
          .setColor('RANDOM')
          .setFooter(`${languages(guild, 'H_C7')}`)
        message.channel.send(embed); 
              
    },
    aliases: ['als'],
    description: 'Aliases'
  }
  