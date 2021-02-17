const { MessageEmbed } = require("discord.js")
const pages = require('discord.js-pagination')
module.exports = {
    aliases: [],
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
                {name: '<:bitcoin:811435136678756402> Bitcoin Wallet:', value: '\`\`\`bc1qduxslynek8t59uzvlkkxv34a08ck3k9q545yqa\`\`\`'},
                {name: '<:ethereum:811436739738075178> Ethereum Wallet:', value: '```0xdf5869e0c15bfcb9903919a0c37836c11b674b1a  -  Gas Limit: 36,000```'},
                {name: '<:xrp:811433454209073192> XRP (Ripple) Wallet:', value: '```rnW8je5SsuFjkMSWkgfXvqZH3gLTpXxfFH  -  Destination Tag: 100549967```'},
                {name: '<:litecoin:811437478446760056> Litecoin Wallet:', value: '```MRvTvzDwWbiVUARt4P1HSBR4g2FYEGx8g1```'},
                {name: '<:ravencoin:811438538721067038> Ravencoin Wallet:', value: '```rLukKVTLwXyDE8CBAvnxsbbewKStWfeweR```'},
                {name: '<:nanocoin:811416752026157066> Nano Coin Wallet:', value: '```nano_1t6tj3zqwjxsxda7o6wb6gzc65y6h1qifoysn9if9x8nj4bh7igbpao46szm```'},
                {name: '<:basicattentiontoken:811443748486512678> BAT (Basic Attention Token) Wallet:', value: '```0x8ebe9261111ff32a24fa311668d328724a309f96  -  Gas Limit: 36,000```'}
            )
        page = [CryptoHelp, CryptoDonate]
        pages(message, page)

    }
}