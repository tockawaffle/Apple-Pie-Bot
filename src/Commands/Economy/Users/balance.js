const 
    {getBalance} = require("@configs/Economy/getBalance"),
    {errorHandle} = require("@configs/other/errorHandle"),
    {checkGuild} = require("@configs/other/checkGuild");

module.exports = {
    aliases: ["bal"],
    run:async(client, messageCreate, args) => {

        const 
            {author} = messageCreate,
            verify = await checkGuild(messageCreate, author, true);
        if(verify !== true) return 

        try {
            await getBalance(messageCreate)
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }
}