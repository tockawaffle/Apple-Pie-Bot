const
    { errorHandle } = require("@configs/other/errorHandle"),
    { encryptThis } = require("@configs/PassManager/encryptThis"),
    {checkGuild} = require("@configs/other/checkGuild");

module.exports = {
    aliases: ["enc", "guard"],
    description: "Encrypts your password",
    category: "Security",
    run: async(client, messageCreate, args) => {

        const 
            {author} = messageCreate,
            verify = await checkGuild(messageCreate, author);
        if(verify === true) return
        try {
            await encryptThis(messageCreate)
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }  
}