const lang = require('../../../util/languages/languages')
const { MessageEmbed } = require("discord.js")
const pages = require('discord.js-pagination')

module.exports = {
    aliases: ['bm', 'bnnm'],
    description: 'Calcula o quanto de banano você vai receber do f@h',
    run: async(client, message, args) => {
        let PPD = args[0];
        let currency = args[1];
        const {guild} = message

        if(PPD.includes(',')) {
            PPD = PPD.replace(',', '.')
        }

        // Might not use this for now:
        // 
        // else if (PPD.length > 5 && !PPD.includes('.')) {
        //     thisSlice = [PPD.slice(0,3), '.', PPD.slice(3)].join('')
        //     if(thisSlice.length > 5) {
        //         PPD = thisSlice.slice(0, 6)
        //     } else PPD = thisSlice
        // }

        if(!PPD) {
            return message.reply("Você precisa inserir uma quantidade de PPD para que eu possa calcular!\nVocê também pode inserir uma moeda na qual seja válida para que eu calcule o valor dela.")
        } else if(!currency) {
            let PPDtotal = 2.2 * (PPD / 2 ) ^ 0.44
            let PPDAlt = Math(0.955793*(PPD^0.430331))

            message.reply(`Certo, seu PPD é de ${PPD}, irei calcular para você, me dê um segundo. . .`).then(async(msg) => {
                const dlt = msg.delete({timeout: 3000})
                message.channel.startTyping()
                const obs = new MessageEmbed()
                    .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/815713271918231564.gif?v=1')
                    .setColor("#FA5407")
                    .setTitle('AVISO')
                    .setDescription('Os cálculos se baseiam em DOIS cálculos, um mais conhecido e outro não tanto, considere ambos na hora de ver seus pontos e >> NÃO << leve nenhum dos dois como valor absoluto do que você irá ganhar. Mas provavelmente o segundo cálculo é mais confiável.\n\nVocê irá encontrar nas próximas páginas os dois cálculos.')                
                const calculoUm = new MessageEmbed()
                    .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/815713271918231564.gif?v=1')
                    .setDescription(
                        `\`\`\`diff\n-Pontos por Dia (PPD): ${PPD}\n\n+Estimativa de Bananos: ${PPDtotal} Bananos\n\n-Fórmula utilizada: 2.2 * (PPD / 2 ) ^ 0.44\`\`\``
                    )
                    .setColor("#FA5407")
                const calculoDois = new MessageEmbed()
                    .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/815713271918231564.gif?v=1')
                    .setDescription(
                        `\`\`\`diff\n-Pontos por Dia (PPD): ${PPD}\n\n+Estimativa de Bananos: ${PPDAlt} Bananos\n\n-Fórmula utilizada: 0.955793*(PPD^0.430331)\n   Autoria da Fórmula: ZZMthesurand#4965\`\`\``
                    )
                    .setColor("#FA5407")
                pgs=[obs, calculoUm, calculoDois]
                await dlt
                message.channel.stopTyping()
                pages(message, pgs)
            })
        } else {
            const get = client.crypto
            const banano = await get.coins.markets({vs_currency: currency, ids: 'banano'})
            let data = banano.data

            if(data.error === 'invalid vs_currency') {
                const errorEmbed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setTitle(lang(guild, "crypt_err"))
                    .addField(lang(guild, "crypt_err2"), `\`\`\`Invalid Currency\`\`\``)
                return message.reply(errorEmbed)
            } else if(banano.success === true) {
                let price = await data.map(x => x.current_price);
                let PPDtotal = 2.2 * (PPD / 2 ) ^ 0.44
                let PPDAlt = 0.955793*(PPD^0.430331)
                message.reply(`Certo, seu PPD é de ${PPD}, irei calcular para você, me dê um segundo. . .`).then(async(msg) => {
                    const dlt = msg.delete({timeout: 3000})
                    message.channel.startTyping()
                    const obs = new MessageEmbed()
                        .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/815713271918231564.gif?v=1')
                        .setColor("#FA5407")
                        .setTitle('AVISO')
                        .setDescription('Os cálculos se baseiam em DOIS cálculos, um mais conhecido e outro não tanto, considere ambos na hora de ver seus pontos e >> NÃO << leve nenhum dos dois como valor absoluto do que você irá ganhar. Mas provavelmente o segundo cálculo é mais confiável.\n\nVocê irá encontrar nas próximas páginas os dois cálculos.')                
                    const calculoUm = new MessageEmbed()
                        .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/815713271918231564.gif?v=1')
                        .setDescription(
                            `\`\`\`diff\n-Pontos por Dia (PPD): ${PPD}\n\n+Estimativa de Bananos: ${PPDtotal} Bananos\n\n+Estimativa de Moeda: ${price * PPDtotal} ${currency.toUpperCase()}\n\n-Fórmula utilizada: 2.2 * (PPD / 2 ) ^ 0.44\`\`\``
                        )
                        .setColor("#FA5407")
                    const calculoDois = new MessageEmbed()
                        .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/815713271918231564.gif?v=1')
                        .setDescription(
                            `\`\`\`diff\n-Pontos por Dia (PPD): ${PPD}\n\n+Estimativa de Bananos: ${PPDAlt} Bananos\n\n+Estimativa de Moeda: ${price * PPDAlt} ${currency.toUpperCase()}\n\n-Fórmula utilizada: 0.955793*(PPD^0.430331)\n   Autoria da Fórmula: ZZMthesurand#4965\`\`\``
                        )
                        .setColor("#FA5407")
                    pgs=[obs, calculoUm, calculoDois]
                    await dlt
                    message.channel.stopTyping()
                    pages(message, pgs)
                })

            }
        }
    }
}