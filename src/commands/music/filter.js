const { MessageEmbed, Message } = require("discord.js")
const languages = require('../../util/languages/languages')
module.exports = {
    aliases:[],
    description: 'Filtros para músicas',
    run: async(client, message) => {

        const args = message.content.split(' ')
        args.shift(' ')
        const {guild} = message
        if (!message.member.voice.channel) {
            const noChannel = new MessageEmbed()
                .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, 'PL')}`)
                .setColor('RED')
            message.reply(noChannel)
            return
        }

        if (!client.player.getQueue(message)) return message.reply(`${languages(guild, 'LPNQ')}`)



        if (!args[0]) {
            const noFilterFound = new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`You need to provide one filter to enable/disable!`)
                .setAuthor(`${message.guid.name}`, message.guild.iconURL({dynamic: true}))
            message.reply(noFilterFound)
            return
        }

        const filterToUpdate = Object.values(client.filters).find((f) => f.toLowerCase() === args[0].toLowerCase());
    
        if (!filterToUpdate) {
            const noValidFilter = new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`That filter does not exists! Please, provide a valid filter.`)
                .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
            message.reply(noValidFilter)
            return
        }
        const filterRealName = Object.keys(client.filters).find((f) => client.filters[f] === filterToUpdate);
    
        const queueFilters = client.player.getQueue(message).filters
        const filtersUpdated = {};
        filtersUpdated[filterRealName] = queueFilters[filterRealName] ? false : true;
        client.player.setFilters(message, filtersUpdated);
    
        if (filtersUpdated[filterRealName]) {
            const filterUpdated = new MessageEmbed()
                .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
                .setColor('RANDOM')
                .setDescription(`${languages(guild, "FE_3")}`)
                .addField(`${languages(guild, "FE_7")}:`, `${languages(guild, "FE_4")}`)
            message.reply(filterUpdated)
        }
        else {
            const filterRemoved = new MessageEmbed()
                .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
                .setColor('RANDOM')
                .setDescription(`${languages(guild, "FE_5")}`)
                .addField(`${languages(guild, "FE_7")}`, `${languages(guild, "FE_6")}`)
                message.channel.send(filterRemoved);
        }
    }
}