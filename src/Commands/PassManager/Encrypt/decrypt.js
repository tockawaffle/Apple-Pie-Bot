const 
    { errorHandle } = require("@configs/other/errorHandle"),
    { decrypthis } = require("@configs/PassManager/decryptThis");

module.exports = {
    aliases: ["decrypthis"],
    run: async(client, messageCreate, args) => {
        const {author} = messageCreate;
        
        try {
            await decrypthis(messageCreate)
        } catch (error) {
            await errorHandle(messageCreate,author,error)
        }
    }
}