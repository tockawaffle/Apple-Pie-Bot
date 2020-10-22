module.exports = {
    run: async(client, message, args) => {

        const {MessageEmbed} = require('discord.js')
        const owner = client.users.cache.get('723185654044950539')

        const a1 = 'ÿ'
        const a2 = '¢'
        const a3 = 'õ'
        const a4 = 'Ð'
        const a5 = 'µ'
        const a6 = 'þ'
        const a7 = 'œ'
        const a8 = 'ÿ'
        const a9 = '¢'
        const a10 = 'õ'
        const a11 = 'Ð'
        const a12 = 'µ'
        const a13 = 'þ'
        const a14 = 'œ'
        const random =[ a1 , a2 , a3 , a4 , a5 , a6 , a7, a8, a9, a10, a11, a12, a13, a14]
        //Modo mais fácil de se fazer:
        const random2 = ['ÿ', '¢', 'õ', 'Ð', 'ÿ', 'µ', 'þ', 'ÿ', '¢', 'õ', 'Ð', 'ÿ', 'µ', 'þ']

        const s1 = [];
        const s2 = [];
        const r1 = [];
        const r2 = [];
        for (let i = 0; i < 10; i++) {
            const rargs = ~~(Math.random() *random.length)
            const rargs2 = ~~(Math.random() *random2.lenght)

            s1.push(random[rargs]);
            random.splice(rargs, 1)

            s2.push(random[rargs]);
            random.splice(rargs, 1)

            r2.push(random2[rargs2]);
            random2.splice(rargs2, 1)

            r1.push(random2[rargs2]);
            random2.splice(rargs2, 1)

        }

        if(message.author.id === owner.id) {
            message.channel.send(`${s1.join('')}??? ${s2.join('')}!!!`)
            const rargsembed = new MessageEmbed()
                .setTitle(`${r1.join('')}~`)
                .setDescription(`${r2.join('')}!`)
                .setAuthor(`${r2.join('')}!`)
            message.channel.send(rargsembed)
            message.reply('Se você viu isso, você consegue usar argumentos aleatórios!')
        } else return;


        
    }, aliases: ['rargs'], description: 'Teste para argumentos aleatórios'
}








