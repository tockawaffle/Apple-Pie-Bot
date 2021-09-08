const {errorHandle} = require("@configs/other/errorHandle"); const {emojiAdd} = require("@configs/other/emojiAdd")
module.exports = {
    aliases: ["ae", "addemoji"],
    run: async(client, messageCreate, args) => {
        const{author} = messageCreate
        try {
            const {checkGuild} = require("@configs/other/checkGuild")
            const verify = await checkGuild(messageCreate, author)
            if(verify.verify !== true) return 
            await emojiAdd(messageCreate, args[0], args[1], author)
        } catch (error) {
            errorHandle(messageCreate, author, error)
        }
    }
}