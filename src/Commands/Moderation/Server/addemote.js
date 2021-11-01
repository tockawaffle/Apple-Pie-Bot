const   
    {errorHandle} = require("@configs/other/errorHandle"),
    {checkGuild} = require("@configs/other/checkGuild"), 
    {emojiAdd} = require("@configs/Moderation/emojiAdd_EoL"),
    {emojiAddWithAttach} = require("@configs/Moderation/emojiAdd_Att");

module.exports = {
    aliases: ["ae", "addemoji"],
    //Não sei a diferença entre emoji e emote, é tipo bolacha e biscoito tlgd? Os dois servem!!!
    run: async(client, messageCreate, args) => {
        const {author} = messageCreate
        try {
            const verify = await checkGuild(messageCreate, author, true)
            if(verify !== true) return 

            if(messageCreate.attachments.first()) {
                return await emojiAddWithAttach(messageCreate, args[0], messageCreate.attachments.first())
            } else {
                await emojiAdd(messageCreate, args[0], args[1])
            }

            
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }
}