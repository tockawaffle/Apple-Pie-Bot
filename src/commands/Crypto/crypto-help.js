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
                {name: '<:bitcoin:815670555797749800> Bitcoin', value: `\`\`\`<prefix>bitcoin <currency>\`\`\``},
                {name: '<:ethereum:815670388822376459> Ethereum', value: `\`\`\`<prefix>ethereum <currency>\`\`\``},
                {name: '<:litecoin:815670591028723732> Litecoin', value: `\`\`\`<prefix>litecoin <currency>\`\`\``},
                {name: '<:dogecoin:815670341502369832> Dogecoin', value: `\`\`\`<prefix>dogecoin <currency>\`\`\``},
                {name: '<:nanocoin:815670455984848936> Nano', value: `\`\`\`<prefix>nano <currency>\`\`\``},
                {name: '<:banano:815670286111473674> Banano', value: `\`\`\`<prefix>banano <currency>\`\`\``},
                {name: '<:ravencoin:815670629553668126> Ravencoin', value: `\`\`\`<prefix>ravencoin <currency>\`\`\``},
                {name: '<:xrp:815670503594524672> XRP (Ripple)', value: `\`\`\`<prefix>xrp <currency>\`\`\``},
                {name: '<:basic:815671583573409832> BAT', value: '```<prefix>bat <currency>```'},
                {name: '<:tether:815672050702090241> Tether (USDT)', value: '```<prefix>tether <currency>```'}
            )
        const CryptoDonate = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setDescription('Consider Donating!')
            .addFields(
                {name: '<:bitcoin:815670555797749800> Bitcoin Wallet:', value: '\`\`\`bc1qtgkxy2zcgvxyk9kwt9nhc4gzfyytrjzhc3q97y\`\`\`'},
                {name: '<:ethereum:815670388822376459> Ethereum Wallet:', value: '```0x208f7243e8d0295dd023e9e102d54eb079bab2e1  -  Gas Limit: 36,000```'},
                {name: '<:litecoin:815670591028723732> Litecoin Wallet:', value: '```MRvTvzDwWbiVUARt4P1HSBR4g2FYEGx8g1```'},
                {name: '<:dogecoin:815670341502369832> Dogecoin Wallet', value: '```D59E7bDkVLwVnwk2phmHBRy7bh3Pnycg8Z```'},
                {name: '<:nanocoin:815670455984848936> Nano Coin Wallet:', value: '```nano_1t6tj3zqwjxsxda7o6wb6gzc65y6h1qifoysn9if9x8nj4bh7igbpao46szm```'},
                {name: '<:banano:815670286111473674> Banano Wallet', value: '```ban_1t6tj3zqwjxsxda7o6wb6gzc65y6h1qifoysn9if9x8nj4bh7igbpao46szm```'},
                {name: '<:ravencoin:815670629553668126> Ravencoin Wallet:', value: '```rLukKVTLwXyDE8CBAvnxsbbewKStWfeweR```'},
                {name: '<:xrp:815670503594524672> XRP (Ripple) Wallet:', value: '```rnW8je5SsuFjkMSWkgfXvqZH3gLTpXxfFH  -  Destination Tag: 100549967```'},
                {name: '<:basic:815671583573409832> BAT (Basic Attention Token) Wallet:', value: '```0x8ebe9261111ff32a24fa311668d328724a309f96  -  Gas Limit: 36,000```'},
                {name: '<:tether:815672050702090241> Tether (USDT) Wallet', value: '```0x208f7243e8d0295dd023e9e102d54eb079bab2e1```'}
            )
        const CryptoFAQ = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setDescription(lang(guild, "crypto_faq")+ '\n' + lang(guild, "crypto_faq4"))
            .addFields(
                {name: lang(guild, "crypto_faq2"), value: `[Binance](https://www.binancezh.cc/pt-BR/register?ref=71034648)\n[Mercado Bitcoin](https://www.mercadobitcoin.com.br/)`},
                {name: lang(guild, "crypto_faq3"), value: `[Nicehash](https://www.nicehash.com)\n[Ezil Pool](https://ezil.me/?p=5a70)\n[Binance Pool](https://accounts.binance.com/en/register?ref=M5N9Y8O0)`},
            )

        page = [CryptoFAQ, CryptoHelp, CryptoDonate]
        pages(message, page)

    }
}