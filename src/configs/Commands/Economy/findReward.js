//Ya ustala pomogi mne
async function findReward(messageCreate, options, id) {

    const 
        {MessageEmbed} = require("discord.js"),
        lang = require("@lang"),
        guildSchema = require("@db/schemas/guildSchema"),
        {author, guild} = messageCreate;

    if(options === "all") {
        const tryToFind = await guildSchema.findOne({_id: guild.id})
        const rewards = tryToFind.economyRewards
        let arrOfIds = []
        
        var items = rewards;
        for (var i = 0; i < items.length; i++) {
            arrOfIds.push(items[i].id)
        }
        const rewardsEmbed = new MessageEmbed()
            .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
            .setColor("RANDOM")
            .setDescription(`${lang(author, "econ-rewardl-3+")}\`\`\`${JSON.stringify(arrOfIds, null, " ").replace(/[\#\"\#,\[\].]/g, "")}\`\`\``)
        return messageCreate.reply({embeds: [rewardsEmbed]})

    } else if(options === "id") {
        if(!id) throw new Error(lang(author, "no-args"))
        if(isNaN(id)) throw new Error(lang(author, "econ-id-isnan"))

        const tryToFind = await guildSchema.findOne({_id: guild.id, economyRewards: {$elemMatch: {id: id}}}, {economyRewards: {$elemMatch: {id: id}}})
        if(tryToFind) {
            const name = tryToFind.economyRewards[0].rewardName,
                  cost = tryToFind.economyRewards[0].cost,
                  image = tryToFind.economyRewards[0].image,
                  id = tryToFind.economyRewards[0].id
            const foundEmbed = new MessageEmbed()
                .setAuthor(author.username, author.displayAvatarURL({dynamic:true}))
                .setColor("RANDOM")
                .setDescription(`\`\`\`${lang(author, "econ-name")} ${name}\n${lang(author, "econ-cost")} ${cost}\nID: ${id}\`\`\``)
                .setImage(image)
            return messageCreate.reply({embeds: [foundEmbed]})
        } else throw new Error(lang(author, "econ-reward-notFound"))
    }
    

}

module.exports = {findReward}