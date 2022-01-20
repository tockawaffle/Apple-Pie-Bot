async function econfigStart(messageCreate, name) {
    const {author, guild} = messageCreate
    
    try {
        const {MessageEmbed, Permissions} = require("discord.js")
        if(!messageCreate.member.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)) throw new Error(`${lang(author, "missing-permissions").replace("{perm}", `${lang(author, "economy-perms")}`)}`)
        const lang = require("@lang"),
            guildSchema = require("@db/schemas/guildSchema"),
            checker = await guildSchema.findOne({_id: guild.id}),
        moment = require("moment");

        if(!checker) {
            for (const users of guild.members.cache) {
                const userId = users[0]; const dataToInsert = { userID: userId,  balance: 1000 }
                await guildSchema.findOneAndUpdate({_id: guild.id}, {_id: guild.id, coinName: name ? name: "Pies", premium: false, startedEconomy: true, date: Date.now(), $push: {dataOfEconomy: dataToInsert}},{upsert: true})
            }
            const startedEmbed = new MessageEmbed()
                .setAuthor({name: author.username, iconURL: author.displayAvatarURL({dynamic: true})})
                .setColor("RANDOM")
                .setDescription(`${lang(author, "econ-started").replace("{prefix}", messageCreate.prefix).replace("{option}", lang(author, "econ-reward")).replace("{name}", name ? name: "Pies")}`)
            return messageCreate.reply({embeds: [startedEmbed]})
        } else {
            throw new Error(lang(author, "error-already-started").replace("{date}", moment(checker.date).format('L')))
        }
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {econfigStart}