const { MessageEmbed } = require("discord.js")
const {requestGecko} = require("../../../Configs/Commands/APIs//Coingecko/requestGecko")
const {filterAliases} = require("../../../Configs/Commands/APIs//Coingecko/filterAliases")
const lang = require("@lang")
const moment = require("moment")
module.exports = {
    aliases: [],
    run:async(client, messageCreate, args) => {
        const {author} = messageCreate
        const tokenToFilter = args[0]
        let token;
        const filter = await filterAliases(messageCreate, tokenToFilter, author)
        if(filter.length === 0) { token = args[0] } 
        else { token = filter[0] }
        const geckoReq = await requestGecko(messageCreate, token, author).catch(error => {return messageCreate.reply(`${lang(author, "bad")} ${error}`)})
        const name = geckoReq.name
        const description = geckoReq.description
        const categories = geckoReq.categories
        const explorer = geckoReq.links.explorer
        const homepage = geckoReq.links.homepage
        let chats;let announcements;let platform; let contract;

        const geckoEmbed = new MessageEmbed()
            .setAuthor(name, geckoReq.images.imgSmall)
            .setColor("RANDOM")
            .setDescription(`\`\`\`${lang(author, "names")} ${name}\n\n${lang(author, "category")} ${categories}\n\n${lang(author, "homepage")} ${homepage.join(' ')}\n\n${lang(author, "explorer")} ${explorer.join(' ')}\`\`\`\n${lang(author, "description")}\`\`\`${description}\`\`\``)
        const geckoEmbed2 = new MessageEmbed()
            .setAuthor(name, geckoReq.images.imgSmall)
            .setColor("RANDOM")
        if(!chats || chats.length === 0) {} 
        else {
            chats = geckoReq.links.chat
            geckoEmbed2.setFields({name: ``, value: ``})
        }
        if(!announcements || announcements.length === 0) {} 
        else {
            announcements = geckoReq.links.announcement
            geckoEmbed2.setFields({name: ``, value: ``})
        }
        if(!platform || platform.length === 0) {}
        else {
            platform = geckoReq.platform
            geckoEmbed2.setFields({name: ``, value: ``})
        } 
        if(!contract) {}
        else {
            contract = geckoReq.contract
            geckoEmbed2.setFields({name: ``, value: ``})
        }
    }
}