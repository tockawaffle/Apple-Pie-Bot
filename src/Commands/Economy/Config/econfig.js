const 
    {econfigStart} = require("@configs/Economy/econStart"),
    {econfigRewards} = require("@configs/Economy/econRewards"),
    {rewardConfig} = require("@configs/Economy/rewardConfig"),
    {errorHandle} = require("@configs/other/errorHandle"),
    lang = require("@lang");

module.exports = {
    aliases: ["economy-start"],
    run: async(client, messageCreate, args) => {
        const {author} = messageCreate

        const 
            {checkGuild} = require("@configs/other/checkGuild"),
            verify = await checkGuild(messageCreate, author),
            options = args[0];
        if(verify.verify !== true) return   
        
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