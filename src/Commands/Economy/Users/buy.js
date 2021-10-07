const {checkGuild} = require("@configs/other/checkGuild")
const {buyReward} = require("@configs/other/buyReward")
const {errorHandle} = require("@configs/other/errorHandle")
module.exports = {
    aliases: ["buy", "comprar"],
    run: async(client, messageCreate, args) => {
        const {author, guild} = messageCreate
        
        const verify = await checkGuild(messageCreate, author)
        if(verify.verify !== true) return

        try {
            await buyReward(messageCreate, args[0])
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }
}