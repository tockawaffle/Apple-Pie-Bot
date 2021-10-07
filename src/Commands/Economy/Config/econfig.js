const {econfigStart} = require("@configs/other/econStart")
const {econfigRewards} = require("@configs/other/econRewards")
const {errorHandle} = require("@configs/other/errorHandle")
const {rewardConfig} = require("@configs/other/rewardConfig")
const lang = require("@lang")

module.exports = {
    aliases: ["economy-start"],
    run: async(client, messageCreate, args) => {
        const {author} = messageCreate

        const {checkGuild} = require("@configs/other/checkGuild")
        const verify = await checkGuild(messageCreate, author)
        if(verify.verify !== true) return   
        
        const options = args[0]
        try {
            if(!options) throw new Error(`${lang(author, "no-args")}\n${lang(author, "accp-opts").replace("{opts}", lang(author, "econ-options"))}`)
            if(options === lang(author, "econ-start")) {
                await econfigStart(messageCreate, args[1])
            } else if(options === lang(author, "econ-reward")) {
                await econfigRewards(messageCreate, args[1], args[2], args[3], args[4])
            } else if (options === "rconfig") {
                await rewardConfig(messageCreate, args[1], args[2], args[3])
            }
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }
}