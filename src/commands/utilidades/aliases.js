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
                  value: '-convite(-cvt)\n-help (-ajuda, -h)\n-avatar (-avt)\n-ping (-ping)\n-aliases (-als)\n-botinfo (-bf, -bi)\n-userinfo (-uf)\n-github (-gt, -gthb)',
                  inline: true
              },
              
              {
                  name: 'Moderação / Moderation:',
                  value: '-ban (-b)\n-kick (-kc)\n-mute (-mt)\n-unban (-unb)\n-unmute (-unmt)\n-muterole (-mtr)\n-muteroleperms (-mtrp)\n-slowmode (-sm)\n-smremove (-smr)\n-lock (-l)\n-unlock(-ul)',
                  inline: true
              },

              {
                name: 'Brincadeiras / Fun:',
                value: '-dado (-dice)\n-meme (-rdm, -reddit)\n-rps (-joken, -jokenpo)',
                inline: true
              },

              {
                name: 'Outros / Others:',
                value: '-setlanguage (-setl)',
                inline: true
              },
              {
                name: 'Mensagens de boas-vindas / Welcome Messages:',
                value: '-setgw\n-gwmsg\n-rwmsg\n-rgw',
                inline: true
              }
            )
          .setColor('RANDOM')
        message.channel.send(embed); 
              
    },
    aliases: ['als'],
    description: 'Aliases'
  }
  