const { MessageEmbed } = require("discord.js"),
    { errorHandle } = require("@configs/other/errorHandle"),
    { encryptThis } = require("../../Configs/Commands/other/encryptThis")

module.exports = {
    aliases: ["enc"],
    run: async(client, messageCreate, args) => {

        try {
            await encryptThis(messageCreate)
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }  
}