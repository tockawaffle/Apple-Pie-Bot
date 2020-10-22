module.exports = {
    run: async(client, message, args) => {
        
        const {MessageEmbed} = require('discord.js')
        const owner = client.users.cache.get('723185654044950539')

        const g1 = 'https://i.pinimg.com/originals/06/dd/8f/06dd8f976b7353d69aec173b44927ef4.gif'
        const g2 = 'https://i.pinimg.com/originals/68/0b/69/680b69563aceba3df48b4483d007bce3.gif'
        const g3 = 'https://i.pinimg.com/originals/ef/b6/e3/efb6e37a8a31e47b1ea969833555b4b6.gif'
        const g4 = 'https://i.pinimg.com/originals/cb/74/fc/cb74fcfbaa1c29a7744b600ffe365f05.gif'
        const g5 = 'https://i.pinimg.com/originals/b4/39/a5/b439a56458d086acb7eac47cc7991616.gif'
        const g6 = 'https://i.pinimg.com/originals/53/b5/d7/53b5d7446c0c8cc4ab66a1982617f41e.gif'
        const gImages = [g1, g2 ,g3 ,g4, g5, g6]
        const random = gImages[Math.floor(Math.random() * gImages.length)]

        const g7 = 'https://i.pinimg.com/originals/4f/db/e9/4fdbe9469f67804ae273f2d7a71120c6.gif'
        const g8 = 'https://i.pinimg.com/originals/3a/df/00/3adf007025f558319e96b7557027fe41.gif'
        const g9 = 'https://i.pinimg.com/originals/51/fa/2e/51fa2e1237643d5cfe8bb3fb129aa099.gif'
        const g10 = 'https://i.pinimg.com/originals/df/14/14/df141459968515c610e62bf1a7df7be0.gif'
        const g11 = 'https://i.pinimg.com/originals/bc/c1/a3/bcc1a3e96af7a255b65ff89699ed1997.gif'
        const g12 = 'https://i.pinimg.com/originals/cb/b1/7d/cbb17d3f633e0a740f4ab864bee2694d.gif'
        const gImages2 = [g11, g10 ,g9 ,g8, g7, g12]
        const random2 = gImages2[Math.floor(Math.random() * gImages2.length)]

        if(message.author.id === owner.id) {
            const embed = new MessageEmbed()
                .setTitle(`Esse é um teste para imagens!`)
                .setImage(random)
                .setThumbnail(random2)
            message.channel.send(embed)
        } else return;

    }, aliases: ['imgtst'], description: 'Para testar imagens!'
}
