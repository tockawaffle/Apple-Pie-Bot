const 
    { MessageEmbed } = require("discord.js"),
    { errorHandle } = require("@configs/other/errorHandle"),
    { encryptThis } = require("@configs/other/encryptThis");

module.exports = {
    aliases: ["enc", "guard"],
    run: async(client, messageCreate, args) => {

        const {author} = messageCreate
        try {
            await encryptThis(messageCreate)
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }  
}