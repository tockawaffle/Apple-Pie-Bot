module.exports = {
    run: async(client, message) => {
      const { MessageEmbed } = require('discord.js')
      if(message.author.bot) return;
      const args = message.content.split(' ');

      if(args.length > 2) {
        message.channel.send(`Ops, algo deu errado!\nComo usar: -avatar <user_id> | -avatar @mention | -avatar (Sem nenhuma menção ou ID, irá mostrar o seu avatar!)`);
      } else if(args.length === 2) {

        const member = message.mentions.members.size === 1 ? 
        message.mentions.members.first() :
        message.guild.members.cache.get(args[1]);

        if(member) {
          const { guild } = message;
          const embed = new MessageEmbed()
            .setTitle(`🔍${message.author.username}`)
            .setDescription(`[Esta](${member.user.avatarURL({format: 'png', dynamic: true, size:2048})}) é a imagem que o usuário utiliza no momento`)
            .setImage(member.user.avatarURL({format: 'png', dynamic: true, size: 2048 }))
            .setColor('RANDOM')
          message.channel.send(embed);

        } else {
            
          message.channel.send(`Eu não consegui encontrar o usuario com o ID ou Menção: ${args[1]} no forno, será que ele foi levado para a cozinha?`);

        }

      }
      if(args.length === 1) {
        const { guild } = message;

        const embed = new MessageEmbed()

          .setTitle(`🔍${message.author.username}`)

          .setDescription(`[Esta](${message.author.displayAvatarURL({format: 'png', dynamic: true, size:2048})}) é a imagem que você utiliza no momento`)

          .setImage(message.author.displayAvatarURL({format: 'png', dynamic: true, size: 2048 }))

          .setColor('RANDOM')

        message.channel.send(embed);
      }
    },
    aliases: ["av"],
    description: "Mostra o Avatar do usuario!"
}
