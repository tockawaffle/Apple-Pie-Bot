const { MessageEmbed } = require("discord.js")
const pages = require('discord.js-pagination')
const lang = require('../../util/languages/languages')
module.exports = {
    aliases: ['cryptoh', 'cryptohelp'],
    description: 'CryptoHelp',
    run: async(client, message, args) => {

        const {guild} = message

        const CryptoHelp = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setDescription(`Here you can get help with the cryptos avaiable!`)
            .addFields(
                {name: '<:bitcoin:811435136678756402> Bitcoin', value: `\`\`\`<prefix>bitcoin <currency>\`\`\``},
                {name: '<:ethereum:811436739738075178> Ethereum', value: `\`\`\`<prefix>ethereum <currency>\`\`\``},
                {name: '<:litecoin:811437478446760056> Litecoin', value: `\`\`\`<prefix>litecoin <currency>\`\`\``},
                {name: '<:dogecoin:811436082306613258> Dogecoin', value: `\`\`\`<prefix>dogecoin <currency>\`\`\``},
                {name: '<:nanocoin:811416752026157066> Nano', value: `\`\`\`<prefix>nano <currency>\`\`\``},
                {name: '<:ravencoin:811438538721067038> Ravencoin', value: `\`\`\`<prefix>ravencoin <currency>\`\`\``},
                {name: '<:xrp:811433454209073192> XRP (Ripple)', value: `\`\`\`<prefix>xrp <currency>\`\`\``},
                {name: '<:basicattentiontoken:811443748486512678> BAT', value: '```<prefix>bat <currency>```'}
            )
        const CryptoDonate = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setDescription('Consider Donating!')
            .addFields(
                {name: '<:bitcoin:811435136678756402> Bitcoin Wallet:', value: '\`\`\`bc1qtgkxy2zcgvxyk9kwt9nhc4gzfyytrjzhc3q97y\`\`\`'},
                {name: '<:ethereum:811436739738075178> Ethereum Wallet:', value: '```0x208f7243e8d0295dd023e9e102d54eb079bab2e1  -  Gas Limit: 36,000```'},
                {name: '<:xrp:811433454209073192> XRP (Ripple) Wallet:', value: '```rnW8je5SsuFjkMSWkgfXvqZH3gLTpXxfFH  -  Destination Tag: 100549967```'},
                {name: '<:litecoin:811437478446760056> Litecoin Wallet:', value: '```MRvTvzDwWbiVUARt4P1HSBR4g2FYEGx8g1```'},
                {name: '<:ravencoin:811438538721067038> Ravencoin Wallet:', value: '```rLukKVTLwXyDE8CBAvnxsbbewKStWfeweR```'},
                {name: '<:nanocoin:811416752026157066> Nano Coin Wallet:', value: '```nano_1w5dof5cb6ss3aqubsweybkg6os4xtbisnwfqghogooswdhi37qt93umtmt8```'},
                {name: '<:basicattentiontoken:811443748486512678> BAT (Basic Attention Token) Wallet:', value: '```0x8ebe9261111ff32a24fa311668d328724a309f96  -  Gas Limit: 36,000```'}
            )
        const CryptoFAQ = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setDescription(lang(guild, "crypto_faq")+ '\n' + lang(guild, "crypto_faq4"))
            .addFields(
                {name: lang(guild, "crypto_faq2"), value: `[Binance](https://www.binancezh.cc/pt-BR/register?ref=71034648)\n[Mercado Bitcoin](https://www.mercadobitcoin.com.br/)`},
                {name: lang(guild, "crypto_faq3"), value: `[Nicehas](https://www.nicehash.com)`},
            )

        page = [CryptoFAQ, CryptoHelp, CryptoDonate]
        pages(message, page)

    }
}