const guildSchema = require('../../../configs/db/schemas/guildSchema')
const {MessageEmbed} = require('discord.js')
const lang = require('../../../util/languages/languages')
const page = require('discord.js-pagination')

module.exports = {
    aliases: ['config'], description: '',
    run: async(client, message, args) => {

        try {
         
            const {guild} = message
            if(!message.member.hasPermission('MANAGE_GUILD')) {
                const noPerm = new MessageEmbed()
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setColor("RED")
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(lang(guild, "NPFX"))
                    .addFields(
                        {name: lang(guild, "NPFX2"),value: lang(guild, "NPFX3")}
                    )
                return message.reply(noPerm)
            }
            
            let def;
            if(args[0] === 'default') {def = 'defaults'}
            else if(args[0] === 'prefix') {def = 'prefixConfig'}
            else if(args[0] === 'language') {def = 'languageConfig'}
            else if(args[0] === 'help') {def = 'helpConfig'}
            else if(args[0] === 'show') {def = 'configConsult'}
            if (!args[0] || !def) {return message.react('<:Bad_Argument:853404667765850112>')}
            let configConsult = await guildSchema.findOne({_id: guild.id})
            let PREFIX = configConsult.prefix

            message.channel.startTyping()
            if(def === 'helpConfig') {
                const helpConfig = new MessageEmbed()
                    .setColor('#ffe135')
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setDescription(`\`\`\`diff\n${lang(guild, "config_1")}\n\n+language (${lang(guild, "config_1_a")})\n+prefix (${lang(guild, "config_1_b")})\n+help (${lang(guild, "config_1_c")})\n+defaults (${lang(guild, "config_1_e")})\n+show (${lang(guild, "config_1_d")})\n\n${lang(guild, "config_2")} ${PREFIX}config ${lang(guild, "config_2_a")}\`\`\``)
                message.reply(helpConfig); message.channel.stopTyping()
            } else if(def === 'defaults') {
                await guildSchema.findOneAndUpdate({_id: guild.id}, {_id: guild.id, language: 'english', prefix: process.env.PREFIX}, {upsert: true})
            } else if(def === 'prefixConfig') {
                if(!args[1]) {
                    const returnEmbed = new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setColor('RANDOM')
                        .setDescription(`${lang(guild, "config_prefix_err_noargs")}\n\n\`Ex: ${PREFIX}config prefix <Your-Prefix-Here>`)
                    message.channel.stopTyping()
                    return message.reply(returnEmbed);
                }
                await guildSchema.findOneAndUpdate({_id: guild.id}, {_id: guild.id, prefix: args[1]}, {upsert: true})
                const sucessEmbed = new MessageEmbed()
                    .setColor('#ffe135')
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setDescription(`${lang(guild, "config_prefix_set")} \`${args[1]}\``)
                message.channel.stopTyping()
                return message.reply(sucessEmbed);
            } else if(def === 'languageConfig') {

                const lang = require('../../../util/languages/languages')
                const targetLanguage = args[1]

                if(!targetLanguage) {
                    const noargs = new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setColor("RED")
                        .setDescription(lang(guild, "config_lang_err_noargs"))
                        .addFields(
                            {name: lang(guild, "config_lang_err_noargs-nolang_2"),value: `\`\`\`${PREFIX}config language english | portugues\`\`\``},
                        )
                    message.channel.stopTyping()
                    console.log(lang(guild, "config_lang_err_noargs-nolang_2"))
                    return message.reply(noargs)
                }

                const { languages } = require('../../../util/languages/languages.json')
                
                if (!languages.includes(targetLanguage)) {
                    const nolang = new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setColor("RED")
                        .setDescription(lang(guild, "config_lang_err_nolang"))
                        .addFields({name: lang(guild, "config_lang_err_nolang_2"),value: `\`\`\`${targetLanguage}\`\`\``})
                    const langs = new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setColor("RED")
                        .setDescription(`${lang(guild, "config_lang_err_noargs-nolang_2")}\n\`\`\`${PREFIX}config language english | portugues\`\`\``)
                    pages = [nolang,langs]; message.channel.stopTyping()
                    return page(message, pages)
                }
                const { setLanguage } = require('../../../util/languages/languages');
                setLanguage(guild, targetLanguage)
                const success = new MessageEmbed()
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setDescription(lang(guild, "config_lang_set"))
                    .addFields({name: lang(guild, "config_lang_set_1"),value: `\`\`\`${targetLanguage}\`\`\``})
                    .setColor("RANDOM")
                message.reply(success).then(message.channel.stopTyping())
                await guildSchema.findOneAndUpdate({_id: guild.id},{_id: guild.id,language: targetLanguage,},{upsert: true,})
            } else if (def === 'configConsult') {
                const consultEmbed = new MessageEmbed()
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setColor('RANDOM')
                    .setDescription(`\`\`\`json\n${JSON.stringify(configConsult, null, '\t')}\`\`\``)
                message.channel.stopTyping()
                return message.reply(consultEmbed)
            }
        } catch (error) {
            const errorEmbed = new MessageEmbed()
                .setColor('#ffe135')
                .setAuthor(message.author.username, 'https://cdn.discordapp.com/emojis/821190159995371521.gif?v=1')
                .setDescription(`Oops, Something went wrong!:\n\n\`\`\`diff\n +Error: ${error}\`\`\`\nIf this error persists, please, open an issue at my GitHub page.`)
                
            message.reply(errorEmbed)
            message.channel.stopTyping()
        }
    }
}