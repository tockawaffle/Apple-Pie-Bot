const 
    {MessageEmbed} = require('discord.js'),
    {buttonsPagination} = require("djs-buttons-pagination"),
    {errorHandle} = require("@configs/other/errorHandle"),
    {registerAccount} = require("@configs/APIs/League API/Account/Commands/registerAccount");


module.exports = {
    aliases: ["lra"],
    run: async(client, messageCreate) => {
        const {author} = messageCreate;
        try{
            await registerAccount(messageCreate)
        } catch(err) {
            await errorHandle(messageCreate, undefined, err)
        }

    }
}