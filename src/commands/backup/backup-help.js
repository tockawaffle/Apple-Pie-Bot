const backup = require('discord-backup');
const { MessageEmbed } = require('discord.js');
backup.setStorageFolder(__dirname+"/backups/");
const languages = require('../../util/languages/languages')

module.exports = {
    aliases: ['bckh'],
    description: 'Backup help',
    run: async(client, message, args) => {
        const {guild} = message
        const bckH = new MessageEmbed()
            .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
            .setDescription(`${languages(guild, 'BCK')}`)
            .addFields(
                {
                    name: `${languages(guild, 'BCK_C')}`,
                    value: `[${languages(guild, 'BCK_C2')}](https://www.applepiebot.xyz/privacy-service-terms)`
                },
                {
                    name: `${languages(guild, 'BCK_C3')}`,
                    value: `\`\`\`-create\`\`\``
                },
                {
                    name: `${languages(guild, 'BCK_C4')}`,
                    value: `\`\`\`-load\`\`\``
                },
                {
                    name: `${languages(guild, 'BCK_C5')}`,
                    value: `\`\`\`-info\`\`\``
                }
            )
            .setColor('RANDOM')
        await message.reply(bckH)
    }
}