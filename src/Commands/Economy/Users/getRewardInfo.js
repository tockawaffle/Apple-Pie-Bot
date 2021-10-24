const 
    {findReward} = require("@configs/Economy/findReward"),
    {checkGuild} = require("@configs/other/checkGuild"),
    {errorHandle} = require("@configs/other/errorHandle");

module.exports = {
    aliases: ["show", "rw", "rinfo"],
    run: async(client, messageCreate, args) => {

        const 
            {author} = messageCreate,
            verify = await checkGuild(messageCreate, author);
        if(verify.verify !== true) return
    
        try {
            await findReward(messageCreate, args[0], args[1])
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }
}