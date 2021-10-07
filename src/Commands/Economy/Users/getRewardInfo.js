const {checkGuild} = require("@configs/other/checkGuild")
const {findReward} = require("@configs/other/findReward")
const {errorHandle} = require("@configs/other/errorHandle")

module.exports = {
    aliases: ["show", "rw", "rinfo"],
    run: async(client, messageCreate, args) => {

        const verify = await checkGuild(messageCreate, author)
        if(verify.verify !== true) return
        
        const {author} = messageCreate 

        try {
            await findReward(messageCreate, args[0], args[1])
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }
}