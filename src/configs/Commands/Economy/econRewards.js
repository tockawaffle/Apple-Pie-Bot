

async function econfigRewards(messageCreate, rewardOptions, name, cost, image) {
    
    const 
        {MessageEmbed, Permissions} = require("discord.js"),
        {makeid} = require('./createId'),
        id = makeid(6),
        {author, guild} = messageCreate,
        lang = require("@lang"),
        guildSchema = require("@db/schemas/guildSchema"),
        checker = await guildSchema.findOne({_id: guild.id});
        

    if(!checker) throw new Error(lang(author, "econ-not-started"))

    const opts = ["add", "delete", "remove", "config"]
    if(!rewardOptions) throw new Error(`${lang(author, "no-args")}\n${lang(author, "accp-args").replace("{opts}", "Add | Delete")}`)
    if(opts.indexOf(rewardOptions) !== -1) {

        if(!messageCreate.member.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)) throw new Error(`${lang(author, "missing-permissions").replace("{perm}", `${lang(author, "economy-perms")}`)}`)
        if(!name) throw new Error(lang(author, "econ-no-reward-name"))

        if(rewardOptions === "add") {
            if(!cost) throw new Error(lang(author, "econ-no-reward-cost"))
            if(isNaN(cost)) throw new Error(lang(author, "econ-reward-cost-nan").replace("{prefix}", messageCreate.prefix))
            
            const findDuplicate = await guildSchema.findOne({_id: guild.id, economyRewards: {$elemMatch: {rewardName: name}}})
            if(findDuplicate) throw new Error(lang(author, "econ-reward-duplicated").replace("{name}", `"${name}"`))
            
            if(checker.economyRewards) {
                const findLength = checker.economyRewards.length
                if(findLength > 8) throw new Error(lang(author, "econ-max-rewards"))
            }
            
            const dataToInsert = { rewardName: name.replace(/[\#\-\#_\|#.]/g, " "),  cost: cost, image: image ? image: "https://cdn.discordapp.com/attachments/874792124099473478/886377525452881960/noimage2.png", id: id}
            await guildSchema.findOneAndUpdate({_id: guild.id}, {_id: guild.id, $push: {economyRewards: dataToInsert}},{upsert: true})
            const rewardAdded = new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor({name: author.username, url: author.displayAvatarURL({dynamic: true})})
                .setDescription(`${lang(author, "econ-name")} **${name.replace(/[\#\-\#_\|#.]/g, " ")}**\n${lang(author, "econ-cost")} **${cost}** ${checker.coinName}`)
                .setImage(image ? image: "https://cdn.discordapp.com/attachments/874792124099473478/886377525452881960/noimage2.png")
                .setFooter(`${lang(author, "econ-reward-id").replace("{id}", id)}`)
            return messageCreate.reply({embeds: [rewardAdded]})
        } else if(rewardOptions === "delete" || rewardOptions === "remove") {
            const toRemove = name
            const findToRemove = await guildSchema.findOne({_id: guild.id, economyRewards: {$elemMatch: {id: toRemove}}})
            //I'm watching this while doing this code: https://www.youtube.com/watch?v=Vqx_Cl81r78 (Not worth it, trust me)
            if(findToRemove) {
                await guildSchema.findOneAndUpdate({_id: guild.id}, {$pull: { economyRewards: {id: name} } }, {upsert: true})
                const rewardRemoved = new MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor({name: author.username, url: author.displayAvatarURL({dynamic: true})})
                    .setDescription(`${lang(author, "success")}\`\`\`${lang(author, "econ-reward-removed").replace("{id}", name)}\`\`\``)
                return messageCreate.reply({embeds: [rewardRemoved]})
            } else throw new Error(lang(author, "econ-no-reward-found").replace("{id}", name))
        }
    } else throw new Error(`${lang(author, "no-args-match")}\n${lang(author, "accp-opts").replace("{opts}", "Add | Delete")}`)
}

module.exports = {econfigRewards}