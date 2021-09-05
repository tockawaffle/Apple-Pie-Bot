const { MessageEmbed } = require("discord.js"); const lang = require("@lang"); const {buttonsPagination: pagination} = require("djs-buttons-pagination")
const {requestGecko} = require("../../../Configs/Commands/APIs//Coingecko/requestGecko"); const {filterAliases} = require("../../../Configs/Commands/APIs//Coingecko/filterAliases"); const {errorHandle} = require("../../../Configs/Commands/other/errorHandle")
module.exports = {
    aliases: [],
    run:async(client, messageCreate, args) => {
        const {author} = messageCreate; const tokenToFilter = args[0]; let token;
        
        try {

            const filter = await filterAliases(messageCreate, tokenToFilter, author)
            if(filter.length === 0) { token = args[0] } 
            else { token = filter[0] }

            const geckoReq = await requestGecko(messageCreate, token, author)
            if(geckoReq.error) { return messageCreate.reply(`${lang(author, "bad")} ${geckoReq.error}`) }
            
            const name = geckoReq.name
            const description = geckoReq.description
            const categories = geckoReq.categories
            const contract = geckoReq.contract
            const market_cap_rank = geckoReq.ranks.market_cap_rank
            const liquidity_score = geckoReq.ranks.liquidity_score
            const change_24h = geckoReq.prices.market_cap_changes.last_24h
            const change_24h_percentage = geckoReq.prices.market_cap_changes.last_24h_percentage
            const last_7d_percentage = geckoReq.prices.market_cap_changes.last_7d_percentage
            const last_14d_percentage = geckoReq.prices.market_cap_changes.last_14d_percentage
            const last_30d_percentage = geckoReq.prices.market_cap_changes.last_30d_percentage
            let explorer = geckoReq.links.explorer
            let homepage = geckoReq.links.homepage
            const usd = geckoReq.prices.prices_fiat_tokens.usd
            const gbp = geckoReq.prices.prices_fiat_tokens.gbp
            const brl = geckoReq.prices.prices_fiat_tokens.brl
            const btc = geckoReq.prices.prices_fiat_tokens.btc
            const bnb = geckoReq.prices.prices_fiat_tokens.bnb
            let chats = geckoReq.links.chats
            let announcements = geckoReq.links.announcement

            if(explorer.length > 1) { explorer=explorer.join('\t') } 
            if(homepage.length > 1) { homepage=homepage.join('\t') }
            if(chats.length > 1) { chats=chats.join('\t') }
            if(announcements.length > 1) { announcements= announcements.join('\t')}

            const mainInfos = new MessageEmbed()
                .setAuthor(name, geckoReq.images.imgSmall)
                .setColor("RANDOM")
                .setDescription(`${lang(author, "infos")}\`\`\`${lang(author, "names")} ${name}\n\n${lang(author, "category")} ${categories}\n\n${lang(author, "contract")} ${contract ? contract: lang(author, "not-a-contract")}\n\n${lang(author, "homepage")} ${homepage}\n\n${lang(author, "explorer")} ${explorer}\`\`\`\n${lang(author, "description")}\`\`\`${description ? description: `${lang(author, "not-provided")}`}\`\`\`\n${lang(author, "prices")}\`\`\`USD: ${usd}\nGBP: ${gbp}\nBRL: ${brl}\nBTC: ${btc}\nBNB: ${bnb}\`\`\`\n${lang(author, "price-changes")}\`\`\`${lang(author, "24h-change")} ${change_24h}\n${lang(author, "24h-change-percent")} ${change_24h_percentage}\n${lang(author, "7d-change")} ${last_7d_percentage}\n${lang(author, "14d-change")} ${last_14d_percentage}\n${lang(author, "30d-change")} ${last_30d_percentage}\`\`\``)
            const otherInfos = new MessageEmbed()
                .setAuthor(name, geckoReq.images.imgSmall)
                .setColor("RANDOM")
                .setDescription(`\`\`\`${lang(author, "chats")} ${chats ? chats: lang(author, "not-provided")}\n\n${lang(author, "announcements")} ${announcements ? announcements: lang(author, "not-provided")}\`\`\`\n${lang(author,"rank")}\`\`\`\n${lang(author, "rank-marketcap")} ${market_cap_rank}\n${lang(author, "rank-liquidity")} ${liquidity_score}\`\`\`\n`)
            return pagination(messageCreate, [mainInfos, otherInfos], [], 10000).catch(error => console.log(error))
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }
}