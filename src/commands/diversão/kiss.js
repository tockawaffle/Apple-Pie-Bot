module.exports = {
    run: async(client, message, args) => {
        const {MessageEmbed} = require('discord.js');
        const guild = message.guild;
        const owner = client.users.cache.get('723185654044950539');
        const user = message.mentions.users.first();
        const me = message.mentions.has(client.user);

        const g1 = 'https://i.pinimg.com/originals/4f/db/e9/4fdbe9469f67804ae273f2d7a71120c6.gif'
        const g2 = 'https://i.pinimg.com/originals/3a/df/00/3adf007025f558319e96b7557027fe41.gif'
        const g3 = 'https://i.pinimg.com/originals/51/fa/2e/51fa2e1237643d5cfe8bb3fb129aa099.gif'
        const g4 = 'https://i.pinimg.com/originals/df/14/14/df141459968515c610e62bf1a7df7be0.gif'
        const g5 = 'https://i.pinimg.com/originals/bc/c1/a3/bcc1a3e96af7a255b65ff89699ed1997.gif'
        const g6 = 'https://i.pinimg.com/originals/cb/b1/7d/cbb17d3f633e0a740f4ab864bee2694d.gif'
        const gImages = [g1, g2 ,g3 ,g4, g5, g6]
        const random = gImages[Math.floor(Math.random() * gImages.length)]
        console.log(random)

        if(me) {
            const embed = new MessageEmbed()
                .setAuthor(`${guild.name}`, guild.iconURL({dynamic: true}))
                .setTitle('Hey! Você não pode fazer isso!')
                .setDescription('O único autorizado a me beijar é meu criador!!')
                .setImage('https://i.pinimg.com/originals/fe/1e/3a/fe1e3a486fb347929c0cebd1df3ef170.gif')
                .setColor('RANDOM')
                .addField('Você está encrencado!', `${owner.username} vai ficar sabendo disso! ${process.env.BLUSHY4}`)
            message.channel.send(embed)
        }

        try{
            if(me) return;
            if(user) {
                const embed = new MessageEmbed()
                    .setTitle('Beijos são tão doces quanto qualquer outro doce!')
                    .setDescription(`${message.author.username} beijou ${user.username}`)
                    .setImage(random)
                    .setColor('RANDOM');
                message.channel.send(embed)
                console.log(embed)
            }
        }catch(err) {
            console.log(err)
        }
    }, aliases: ['ks'], description: 'Hehe, beijinho'
}