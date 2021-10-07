const {getBalance} = require("@configs/other/getBalance")
const {errorHandle} = require("@configs/other/errorHandle")

module.exports = {
    aliases: ["bal"],
    run:async(client, messageCreate, args) => {

        const {author} = messageCreate
        const {checkGuild} = require("@configs/other/checkGuild")
        const verify = await checkGuild(messageCreate, author)
        if(verify.verify !== true) return 

        try {
            await getBalance(messageCreate)
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }
}