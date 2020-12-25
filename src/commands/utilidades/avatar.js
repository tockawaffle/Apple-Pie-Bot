module.exports = {
    run: async(client, message, args) => {
      const languages = require('../../util/languages/languages')
      const { MessageEmbed } = require('discord.js')
      const { guild } = message

      if(args.length > 1) {
        message.channel.send(`${languages(guild, 'AV_E1')}`);
      } else if(args.length === 1) {

        const member = message.mentions.members.size === 1 ? 
        message.mentions.members.first() :
        message.guild.members.cache.get(args[0]);

        if(member) {
          const { guild } = message;
          const embed = new MessageEmbed()
            .setTitle(`🔍${message.author.username}`)
            .setDescription(`[${languages(guild, 'AVATAR_C')}](${member.user.avatarURL({format: 'png', dynamic: true, size:2048})}) ${languages(guild, 'AV_C2')}`)
            .setImage(member.user.avatarURL({format: 'png', dynamic: true, size: 2048 }))
            .setColor('RANDOM')
          message.channel.send(embed);

        } else {
            
          message.channel.send(`${languages(guild, 'AV_E2')} " ${args[1]} " ${languages(guild, 'AV_E2_1')}`);

        }
      }
      if(args.length === 0) {
        const { guild } = message;

        const embed = new MessageEmbed()

          .setTitle(`🔍${message.author.username}`)

          .setDescription(`[${languages(guild, 'AVATAR_C')}](${message.author.displayAvatarURL({format: 'png', dynamic: true, size:2048})}) ${languages(guild, 'AV_C')}`)

          .setImage(message.author.displayAvatarURL({format: 'png', dynamic: true, size: 2048 }))

          .setColor('RANDOM')

        message.channel.send(embed);
      }
    },
    aliases: ["av"],
    description: "Mostra o Avatar do usuario!"
}
