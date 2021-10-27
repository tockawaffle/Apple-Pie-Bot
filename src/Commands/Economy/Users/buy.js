const 
    {buyReward} = require("@configs/Economy/buyReward"),
    {errorHandle} = require("@configs/other/errorHandle"),
    {checkGuild} = require("@configs/other/checkGuild");
module.exports = {
    aliases: ["buy", "comprar"],
    run: async(client, messageCreate, args) => {
        const 
            {author} = messageCreate,
            verify = await checkGuild(messageCreate, author, true);
        if(verify !== true) return

        try {
            await buyReward(messageCreate, args[0])
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }
}