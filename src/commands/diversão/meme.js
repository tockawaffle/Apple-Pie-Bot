module.exports = {
    run: async(client, message, args) => {
        const { MessageEmbed } = require('discord.js')
        const randomPuppy = require('random-puppy')

        const subReddits = ["shitpostcrusaders", "memesbrasil", "eu_nvr", "g1comments", "animemes", "bestmemes"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random);
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`Meme quentinho vindo de /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`);

        message.channel.send(embed);
    },
    aliases: ['reddit', 'rdm'],
    description: 'Memes direto do reddit, hehe'
}