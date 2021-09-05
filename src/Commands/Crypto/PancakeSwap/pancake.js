const { MessageEmbed } = require("discord.js");const lang = require("@lang"); const moment = require("moment")
const {requestPancake} = require("../../../Configs/Commands/APIs/PancakeSwap/requestPancake"); const {errorHandle} = require("../../../Configs/Commands/other/errorHandle")
module.exports = {
    aliases: [],
    run:async(client, messageCreate, args) => {
        const {author} = messageCreate
        try {
            const contract = args[0]
            if(!contract) {
                const noArg = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setColor("DARK_RED")
                    .setTitle(`${lang(author, "error")} ${lang(author, "no-args")}`)
                    .setDescription(`${lang(author, "no-args-correct").replace("{command}", `\`\`\`${messageCreate.prefix}pancake <token-contract>\`\`\``)}`)
                return messageCreate.reply({embeds: [noArg]})
            } else {
                const req = await requestPancake(messageCreate, contract)
                const reqEmbed = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setTitle(`${req.data.name} - ${req.data.symbol}`)
                    .setColor("RANDOM")
                    .setDescription(`${lang(author, "pancake-contract")} \`\`\`${contract}\`\`\`\n${lang(author, "pancake-price").replace("{usd}", `\`\`\`${req.data.price.substring(0, 5)}\`\`\``).replace("{bnb}", `\`\`\`${req.data.price_BNB.substring(0, 6)}\`\`\`\n${lang(author, "swap-link").replace("{here}", `[${lang(author, "here")}](https://pancakeswap.finance/swap?outputCurrency=${contract})`)}`)}`)
                    .setFooter(`${lang(author, "pancake-last-att")} - ${moment(req.updated_at).utc().format("L")} - ${moment(req.updated_at).utc().format("LTS")}`)
                return messageCreate.reply({embeds: [reqEmbed]})
            }
        } catch (error) {
            errorHandle(messageCreate, author, err)
        }
       
    }
}