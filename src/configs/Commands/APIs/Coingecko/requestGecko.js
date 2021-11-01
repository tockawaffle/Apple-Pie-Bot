async function requestGecko(messageCreate, token, author) {
    
    const 
        { MessageEmbed } = require("discord.js"),
        fetch = require("node-fetch"),
        lang = require("@lang");
    if(!messageCreate) {
        throw new Error(`Faltando o evento de mensagem.`)
    }else if(!author) {
        throw new Error(`Faltando um "author"`)
    }else if(!token) {
        const noToken = new MessageEmbed()
            .setAuthor(author.username, author.displayAvatarURL({dynamic:true}))
            .setColor("DARK_RED")
            .setDescription(`${lang(author, "noToken")}`)
        return messageCreate.reply({embeds: [noToken]})
    } 
    try {
        const geckoFetch = await fetch(`https://api.coingecko.com/api/v3/coins/${token}`, {method: "GET"})
        const geckoJson = await geckoFetch.json()
        if(geckoJson.error) {
            return {error: geckoJson.error}
        }
        const geckoRps = {
            id: geckoJson.id,
            name: geckoJson.name,
            platform: geckoJson.asset_platform_id,
            description: geckoJson.description.en,
            categories: geckoJson.categories,
            links: {
                homepage: geckoJson.links.homepage,
                explorer: geckoJson.links.blockchain_site,
                chats: geckoJson.links.chat_url,
                announcement: geckoJson.links.announcement_url
            },
            images: {
                imgThumb: geckoJson.image.thumb,
                imgSmall: geckoJson.image.small,
                imgLarge: geckoJson.image.large,
            },
            contract: geckoJson.contract_address,
            ranks: {
                market_cap_rank: geckoJson.market_cap_rank,
                liquidity_score: geckoJson.liquidity_score
            },
            prices: {
                prices_fiat_tokens: {
                    brl: geckoJson.market_data.current_price.brl,
                    btc: geckoJson.market_data.current_price.btc,
                    bnb: geckoJson.market_data.current_price.bnb,
                    gbp: geckoJson.market_data.current_price.gbp,
                    usd: geckoJson.market_data.current_price.usd
                },
                market_cap_changes: {
                    last_24h: geckoJson.market_data.price_change_24h,
                    last_24h_percentage: geckoJson.market_data.price_change_percentage_24h,
                    last_7d_percentage: geckoJson.market_data.price_change_percentage_7d,
                    last_14d_percentage: geckoJson.market_data.price_change_percentage_14d,
                    last_30d_percentage: geckoJson.market_data.price_change_percentage_30d
                }
            }
        }
        return geckoRps
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {requestGecko}