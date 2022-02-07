const 
    {checkGuild} = require("@configs/other/checkGuild"),
    {resetPass} = require("@configs/PassManager/resetPass"),
    {errorHandle} = require("@configs/other/errorHandle");

module.exports = {
    aliases: ["resetpass"],
    description: "Resets your password",
    category: "Security",
    run: async(client, messageCreate, args) => {

        const
            {author} = messageCreate, 
            verified = await checkGuild(messageCreate, author, false)
        if(verified === true) return messageCreate.react("❌")

        try {
            await resetPass(messageCreate)
        } catch (error) {
            await errorHandle(messageCreate,author,error)
        }
    }
}