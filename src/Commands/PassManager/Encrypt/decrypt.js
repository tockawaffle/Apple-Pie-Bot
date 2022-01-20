const 
    { errorHandle } = require("@configs/other/errorHandle"),
    { decrypthis } = require("@configs/PassManager/decryptThis"),
    {checkGuild} = require("@configs/other/checkGuild");

module.exports = {
    aliases: ["decrypthis"],
    description: "Decrypts your stored password",
    category: "Security",
    run: async(client, messageCreate, args) => {
        const 
            {author} = messageCreate,
            verify = await checkGuild(messageCreate, author);
        if(verify === true) return
        try {
            await decrypthis(messageCreate)
        } catch (error) {
            await errorHandle(messageCreate,author,error)
        }
    }
}