const backup = require('discord-backup');
const { MessageEmbed } = require('discord.js');
const moment = require('moment')
backup.setStorageFolder(__dirname+"/backups/");
const languages = require('../../util/languages/languages')

module.exports = {
    aliases: ['bckh'],
    description: 'Backup help',
    run: async(client, message, args) => {
        const bckH = new MessageEmbed()
            .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
            .setDescription(`Here you can find what every backup command does!`)
            .addFields(
                {
                    name: `-create`,
                    value: `This creates a backup and provide you a code to load it latter!`
                },
                {
                    name: `-load`,
                    value: `This loads a backup with the code provided in the creation of the backup`
                },
                {
                    name: `-info`,
                    value: `This gives some info about that backup!`
                }
            )
            .setColor('RANDOM')
        await message.reply(bckH)
    }
}