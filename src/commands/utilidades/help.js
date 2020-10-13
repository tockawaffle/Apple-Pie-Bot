module.exports = {
  run: async(client, message, args) => {  
    
      const { MessageEmbed } = require('discord.js')
      const { guild } = message;

      if(message.author.bot) return;
        const embed = new MessageEmbed()
          .setTitle('Você sabia que a vida só fica mais doce com um pouco de ajuda?')
          .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
          .setThumbnail(guild.iconURL({ dynamic: true }))
          .addFields(
            {
              name: 'Para verificar as aliases de meus comandos, use:', value: '-aliases (ou, -als)'
            },

            {
              name: 'Utilidades:', 
              value: '-convite(Para me convidar a um outro servidor!)\n\n-help (Bem... Eu acho que não preciso explicar muito.)\n\n-avatar (Mostra o avatar da pessoa mencionada ou pelo ID, ou o próorio avatar)\n\n-ping (Mostra o meu ping e o ping que eu tenho da API do Discord!)\n\n -botinfo (Mostra informações minhas!)\n\n-userinfo (Mostra informações de alguém DESTE servidor)\n\n-github (Minha página no github!)\n\n-clima (Mostra o clima de um Estado/Cidade)',
              inline: true
            },

            {
              name: 'Moderação:',
                value: '-ban (Bane um membro do servidor)\n\n-kick (Expulsa um membro do servidor)\n\n-mute (Muta um membro)\n\n-unban (Bem, todo comando de desbanimento só funciana por ID, então...)\n\n-unmute (Desmuta um membro)\n\n-muterole (Para criar o cargo de Silenciado)\n\n-muteroleperms (Para criar as permissões do cargo de Silenciado)\n\n-slowmode (Adiciona Slowmode em todos os chats do servidor)\n\n-smremove (Tira o slowmode de todos os chats do servidor)\n\n-lock (Bom contra raids, locka todos os chats do servidor)\n\n-unlock (Retira o lock de todos os chats)',
                inline: true
            },

            {
              name: 'Brincadeiras:',
              value: '-dado (rola um dado de 25 lados!)\n\n-meme (memes direto de vários subreddits!)\n\n-rps (Pedra, papel ou tesoura, ou, Jokenpô)'
            },

            {
              name: 'Outros',
              value: '-nowelcome (Tira a mensagem de boas vindas do bot)'
            }

            )
            .setColor('RANDOM')
            .setFooter("Sim, eu sei, não tenho muitas funcionalidades, mas eu ainda estou em desenvolvimento, com muito esforço, prometo melhorar!\n\nMinha versão atual é: 2.0")
              message.channel.send(embed); 
            
  },
  aliases: ['ajuda', 'h'],
  description: 'Comando de ajuda, mostra todos os comandos presentes no servidor!'
}
