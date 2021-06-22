const dbdSchema = require('../../../configs/db/schemas/steam-schema')
const {MessageEmbed} = require('discord.js')
const lang = require('../../../util/languages/languages')

module.exports = {
    aliases:['steamr', 'registrar-steam', 'r-steam', 'rsteam'],
    description: '',
    run: async(client, message, args) => {

        const s = client.steam
        const {guild} = message
        let userId = message.author.id;
        let steamID = args[0];

        s.getUserSummary(steamID).then(smr => {
            const steamUserInfo = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setTitle(`${lang(guild, "steamr")} "${smr.nickname}" ${lang(guild,"steamr2")}`)
                .setThumbnail(smr.avatar.medium)
                .setDescription(`${lang(guild, "steamr3")} [${smr.nickname}](${smr.url}) ${lang(guild, "steamr4")}`)
                .setColor("RANDOM")
            message.reply(steamUserInfo).then((msg) => {
                message.channel.awaitMessages(response => response.content === lang(guild, "yes") || response.content === lang(guild, "no"), {
                    max: 1,
                    time: 10000,
                    errors: ['time'],
                }).then(async(clt) => {
                    let rps = clt.first().content.toLowerCase()
                    if(rps === lang(guild, "yes")) {
                        await dbdSchema.findOneAndUpdate(
                            {_id: steamID},
                            {_id: steamID, userID: userId },
                            {upsert: true}
                        )
                        const accpt = new MessageEmbed()
                            .setColor("GREEN")
                            .setAuthor(guild, guild.iconURL({dynamic: true}))
                            .setDescription(lang(guild, "steamr-y"))
                            .addField(lang(guild, "steamr-y2"), `\`\`\`${lang(guild, "steamr-y3")}\`\`\``)
                        return message.reply(accpt)
                    } else if(rps === lang(guild, "no")) {
                        const cncl = new MessageEmbed()
                            .setColor("#ff0000")
                            .setAuthor(guild, guild.iconURL({dynamic: true}))
                            .setDescription(lang(guild, "steamr-n"))
                        return message.reply(cncl)
                    }
                }).catch(err => message.reply('Time is up'))
            })
        }).catch(err => {
            const errEmbed = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setDescription(lang(guild, "err"))
                .setColor("#ff0000")
                .addFields(
                    {name: `${lang(guild, "err2")}  ${lang(guild, "err_dev")}`, value: `\`\`\`${err}\`\`\``},
                )
            return message.reply(errEmbed)
        })
    }
}