async function rewardConfig(messageCreate, idToFind, options, args) {

    const 
        {MessageEmbed, Permissions} = require("discord.js"),
        lang = require("@lang"),
        guildSchema = require("@db/schemas/guildSchema"),
        {author, guild} = messageCreate;

    if(!messageCreate.member.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)) throw new Error(`${lang(author, "missing-permissions").replace("{perm}", `${lang(author, "economy-perms")}`)}`)
    if(!idToFind) throw new Error(lang(author, "econ-reward-noId"))
    if(!options) throw new Error(lang(author, "econ-reward-noOpts"))
    if(!args) throw new Error(lang(author, "no-args"))
    console.log(args)
    try {

        const find = await guildSchema.findOne({_id: guild.id}, {economyRewards: {$elemMatch: {id: idToFind}}})
        if(find.economyRewards) {
            const found = find.economyRewards
            const data = found[0]
            const opts = ["name", "cost", "image"]
            if(opts.indexOf(options) !== -1) {
                //vai se fUDEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
                if(options ===  "name") {
                    await guildSchema.findOneAndUpdate({_id: guild.id, economyRewards: {$elemMatch: {id: idToFind}}}, {economyRewards: [{rewardName: args, cost: data.cost, image: data.image, id: data.id}]})
                    const nameConfig = new MessageEmbed()
                        .setAuthor({name: author.username, iconURL: author.displayAvatarURL({dynamic: true})})
                        .setColor("RANDOM")
                        .setDescription(lang(author, "econ-reward-config-name").replace("{prevname}", data.rewardName).replace("{newname}", args))
                    return messageCreate.reply({embeds: [nameConfig]})
                } else if (options === "cost") {
                    await guildSchema.findOneAndUpdate({_id: guild.id, economyRewards: {$elemMatch: {id: idToFind}}}, {economyRewards: [{rewardName: data.rewardName, cost: args, image: data.image, id: data.id}]})
                    const costConfig = new MessageEmbed()
                        .setAuthor({name: author.username, iconURL: author.displayAvatarURL({dynamic: true})})
                        .setColor("RANDOM")
                        .setDescription(lang(author, "econ-reward-config-cost"))
                    return messageCreate.reply({embeds: [costConfig]})
                } else if(options === "image") {
                    await guildSchema.findOneAndUpdate({_id: guild.id, economyRewards: {$elemMatch: {id: idToFind}}}, {economyRewards: [{rewardName: data.rewardName, cost: data.cost, image: args, id: data.id}]})
                    const imageConfig = new MessageEmbed()
                        .setAuthor({name: author.username, iconURL: author.displayAvatarURL({dynamic: true})})
                        .setColor("RANDOM")
                        .setDescription(lang(author, "econ-reward-config-image"))
                    return messageCreate.reply({embeds: [imageConfig]})
                }
            } else throw new Error(lang(author, "no-args-match"))
        } else throw new Error(lang(author, "econ-reward-notFound"))   
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {rewardConfig}