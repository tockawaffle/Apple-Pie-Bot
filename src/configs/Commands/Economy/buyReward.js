async function buyReward(messageCreate, idNumber) {

    if(!idNumber) throw new Error(lang(author, "no-args"))
 
    const 
        {MessageEmbed} = require("discord.js"),
        lang = require("@lang"),
        guildSchema = require("@db/schemas/guildSchema"),
        {author, guild} = messageCreate;

    if(isNaN(idNumber)) throw new Error(lang(author, "econ-id-isnan"))
    try {
        const 
            tryToFind = await guildSchema.findOne({_id: guild.id, economyRewards: {$elemMatch: {id: idNumber}}}, {economyRewards: {$elemMatch: {id: idNumber}}}),
            coinName = await guildSchema.findOne({_id: guild.id}),
            findUser = await guildSchema.findOne({_id: guild.id}, {dataOfEconomy: {$elemMatch: {userID: author.id}}});
        
        if(tryToFind) {
            if(findUser) {
                const 
                    findTry = await guildSchema.findOne({_id: guild.id, dataOfEconomy: {$elemMatch: {userID: author.id}}}, {dataOfEconomy: {$elemMatch: {userID: author.id}}}),
                    userAmount = findTry.dataOfEconomy[0].balance,
                    rewardAmount = tryToFind.economyRewards[0].cost,
                    rewards = tryToFind.economyRewards[0];
                if(rewardAmount > userAmount) {
                    throw new Error(lang(author, "econ-not-enough-balance"))
                } else {
                    const amountToUpdate = userAmount - rewardAmount
                    await guildSchema.findOneAndUpdate({_id: guild.id, dataOfEconomy: {$elemMatch: {userID: author.id}} }, {$pull: {dataOfEconomy: {userID: author.id}}}, {upsert: true})
                    await guildSchema.findOneAndUpdate({_id: guild.id}, {$push: {dataOfEconomy: {userID: author.id, balance: amountToUpdate}, pendingRewards: {userID: author.id, rewardID: rewards.id, date: Date.now()}}}, {upsert: true})
                    
                    const foundEmbed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(lang(author, "econ-reward-buy").replace("{rewardName}", rewards.rewardName).replace("{amountName}", `${rewards.cost + " " + coinName.coinName}`).replace("{newAmount}", amountToUpdate + " " + coinName.coinName))
                        .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    return messageCreate.reply({embeds: [foundEmbed]})
                }
            }
        } else throw new Error(lang(author, "econ-notfound"))
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {buyReward}