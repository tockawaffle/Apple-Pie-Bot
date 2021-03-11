const lang = require('../../../util/languages/languages')
const math = require('mathjs')
const pages = require('discord.js-pagination')
const { MessageEmbed } = require("discord.js")

module.exports = {
    aliases: ['bm', 'bnnm'],
    description: 'Calcula o quanto de banano você vai receber do f@h',
    run: async(client, message, args) => {

        let PPD = args[0];
        let currency = args[1];
        const {guild} = message
        

        if(!PPD) {
            return message.reply("Você precisa inserir uma quantidade de PPD para que eu possa calcular!\nVocê também pode inserir uma moeda na qual seja válida para que eu calcule o valor dela.")
        } else if(!currency) {
            
            let PPDfirst = {fExp:2.2, ppd:PPD, sExp:2, tExp: 0.44}
            let PPDtotal = math.evaluate('fExp * (ppd / sExp ) ^ tExp', PPDfirst)

            let scope = {fExp:0.955793, ppd:PPD, sExp:0.430331}
            let PPDAlt = math.evaluate('fExp * (ppd^sExp)', scope)
 
            message.reply(`Certo, seu PPD é de ${PPD}, irei calcular para você, me dê um segundo. . .`).then(async(msg) => {
                const dlt = msg.delete({timeout: 3000})
                message.channel.startTyping()
                const obs = new MessageEmbed()
                    .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/815713271918231564.gif?v=1')
                    .setColor("#FA5407")
                    .setTitle('OBSERVAÇÃO')
                    .setDescription('Os cálculos se baseiam em DUAS fórmulas, uma mais conhecida e outra mais nova, considere ambas na hora de ver seus pontos e >> NÃO << leve nenhuma das duas como valor absoluto do que você irá ganhar. Mas provavelmente o segundo cálculo é mais confiável.\n\nVocê irá encontrar nas próximas páginas os dois cálculos.')                
                const calculoUm = new MessageEmbed()
                    .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/815713271918231564.gif?v=1')
                    .addFields(
                        {name: 'Fórmula utilizada: 2.2 * (PPD / 2 ) ^ 0.44', value: `\`\`\`diff\n-Pontos por Dia (PPD): ${PPD}\n\n+Estimativa de Bananos: ${PPDtotal} Bananos\`\`\``},
                        {name: 'Fórmula utilizada: 0.955793 * (PPD ^ 0.430331)', value: `\`\`\`diff\n-Pontos por Dia (PPD): ${PPD}\n\n+Estimativa de Bananos: ${PPDAlt} Bananos\n\n---Autoria da Fórmula: ZZMthesurand#4965\`\`\``}
                    )
                    .setColor("#FA5407")
                pgs=[obs, calculoUm]
                await dlt; message.channel.stopTyping()
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

                let PPDfirst = {fExp:2.2, ppd:PPD, sExp:2, tExp: 0.44}
                let PPDtotal = math.evaluate('fExp * (ppd / sExp ) ^ tExp', PPDfirst)
    
                let scope = {fExp:0.955793, ppd:PPD, sExp:0.430331}
                let PPDAlt = math.evaluate('fExp * (ppd^sExp)', scope)

                message.reply(`Certo, seu PPD é de ${PPD}, irei calcular para você, me dê um segundo. . .`).then(async(msg) => {
                    const dlt = msg.delete({timeout: 3000})
                    message.channel.startTyping()
                    const obs = new MessageEmbed()
                        .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/815713271918231564.gif?v=1')
                        .setColor("#FA5407")
                        .setTitle('OBSERVAÇÃO')
                        .setDescription('Os cálculos se baseiam em DUAS fórmulas, uma mais conhecida e outra mais nova, considere ambas na hora de ver seus pontos e >> NÃO << leve nenhuma das duas como valor absoluto do que você irá ganhar. Mas provavelmente o segundo cálculo é mais confiável.\n\nVocê irá encontrar nas próximas páginas os dois cálculos.')                
                    const calculoUm = new MessageEmbed()
                        .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/815713271918231564.gif?v=1')
                        .addFields(
                            {name: 'Fórmula utilizada: 2.2 * (PPD / 2 ) ^ 0.44', value: `\`\`\`diff\n-Pontos por Dia (PPD): ${PPD}\n\n+Estimativa de Bananos: ${PPDtotal} Bananos\n\n+Estimativa de Moeda: ${price * PPDtotal} ${currency.toUpperCase()}\`\`\``},
                            {name: 'Fórmula utilizada: 0.955793*(PPD^0.430331)', value: `\`\`\`diff\n-Pontos por Dia (PPD): ${PPD}\n\n+Estimativa de Bananos: ${PPDAlt} Bananos\n\n+Estimativa de Moeda: ${price * PPDAlt} ${currency.toUpperCase()}\n\n---Autoria da Fórmula: ZZMthesurand#4965\`\`\``}
                        )
                        .setColor("#FA5407")
                    pgs=[obs, calculoUm]
                    await dlt; message.channel.stopTyping()
                    pages(message, pgs)
                })

            }
        }
    }
}