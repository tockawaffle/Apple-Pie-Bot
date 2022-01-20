const 
    { MessageEmbed } = require("discord.js"),
    {errorHandle} = require("@configs/other/errorHandle"),
    {buttonsPagination} = require("djs-buttons-pagination"),
    lang = require("@lang");

module.exports = {
    aliases: [],
    description: "Command List",
    category: "Utilities",
    run: async(client, messageCreate, args) => {
        
        const 
            {user} = client,
            {author} = messageCreate,
            prefix = messageCreate.prefix;
        
        try {
            const mainEmbed = new MessageEmbed()
                .setAuthor({name: user.username, iconURL: user.displayAvatarURL({dynamic: true})})
                .setDescription(`${lang(author, "help-mainEmbed-intro")}\n\n${lang(author, "help-mainEmbed-tosp")}\n\n${lang(author, "help-mainEmbed-github")}\n\n${lang(author, "help-mainEmbed-options").replace("{prefix}", prefix)}`)
                .setColor("RANDOM")
                .setFooter({text: lang(author, "can-be-used-on-dms"), iconURL: user.displayAvatarURL({dynamic: true})})
            const userConfigEmbed = new MessageEmbed()
                .setAuthor({name: user.username, iconURL: user.displayAvatarURL({dynamic: true})})
                .setColor("RANDOM")
                .setDescription(`${lang(author, "help-userconfig-desc")}`)
                .addFields({name: lang(author, "help-uconfig"), value: `${prefix}uconfig [<options>](https://github.com/The-Crow-pleb/Apple-Pie-Bot/blob/Apple-Pie-v13/src/configs/Commands/Texts/uconfig-opts.md) <args>`})
                .setFooter({text: lang(author, "can-be-used-on-dms"), iconURL: user.displayAvatarURL({dynamic: true})})
            const modEmbed = new MessageEmbed()
                .setAuthor({name: user.username, iconURL: user.displayAvatarURL({dynamic: true})})
                .setColor("RANDOM")
                .setDescription(`${lang(author, "help-mod-desc")}\`\`\`${prefix}ban <@mention | userID> <?reason>\n${prefix}unban <userID> <?reason>\n${prefix}mute <@mention | userID> <reason>\n${prefix}unmute <@mention | userID>\n${prefix}kick <@mention | userID> <?reason>\n${prefix}addemote <emoji | discord URL | image attached> <name>\n${prefix}role <${lang(author, "create-role")} | ${lang(author, "delete-role")}> <args>\`\`\``)
                .setFooter({text: lang(author, "can-not-be-used-on-dms"), iconURL: user.displayAvatarURL({dynamic: true})})
            const roleplayEmbed = new MessageEmbed()
                .setAuthor({name: user.username, iconURL: user.displayAvatarURL({dynamic: true})})
                .setColor("RANDOM")
                .setDescription(`${lang(author, "help-roleplay-desc")}\`\`\`${prefix}kiss <@mention>\n${prefix}hug <@mention>\n${prefix}pat <@mention>\n${prefix}slap <@mention>\`\`\``)
                .setFooter({text: lang(author, "can-not-be-used-on-dms"), iconURL: user.displayAvatarURL({dynamic: true})})
            const utilitiesEmbed = new MessageEmbed()
                .setAuthor({name: user.username, iconURL: user.displayAvatarURL({dynamic: true})})
                .setColor("RANDOM")
                .setDescription(`${lang(author, "help-utils-desc")}\`\`\`${prefix}weather <City/State>\n${prefix}avatar <@mention | userID>\n${prefix}userinfo <@mention | userID>\n${prefix}translate <text> (${lang(author, "help-translate-field")})\`\`\``)
                .setFooter({text: lang(author, "some-can-be-used-on-dms"), iconURL: user.displayAvatarURL({dynamic: true})})
            const cryptoEmbed = new MessageEmbed()
                .setAuthor({name: user.username, iconURL: user.displayAvatarURL({dynamic: true})})
                .setColor("RANDOM")
                .setDescription(`${lang(author, "help-crypto-desc")}\`\`\`${prefix}gecko <coin API id | alias>\n${prefix}pancake <token contract>\`\`\``)
                .setFooter({text: lang(author, "can-be-used-on-dms"), iconURL: user.displayAvatarURL({dynamic: true})})
            const helpCanvas = new MessageEmbed()
                .setAuthor({name: user.username, iconURL: user.displayAvatarURL({dynamic: true})})
                .setDescription(`🖼 ${lang(author, "help-canvas-desc")}:\n\`\`\`Change my mind Meme: ${prefix}changemymind <text>\n\nFacepalm: ${prefix}facepalm <?@mention>\n\n${lang(author, "help-canvas-monster")} ${prefix}monster <@mention>\n\n${lang(author, "help-canvas-ohno")} ${prefix}ohno <text>\n\n${lang(author, "help-canvas-shit")} ${prefix}ohshit <?@mention>\n\n${lang(author, "help-canvas-opinion")} ${prefix}opinion <@mention> <text>\n\n${lang(author, "help-canvas-ytb")} ${prefix}ytb <?@mention> <text>\n\nJail: ${prefix}jail <@mention>\`\`\``)
                .setColor("RANDOM")
                .setFooter({text: lang(author, "some-can-be-used-on-dms"), iconURL: user.displayAvatarURL({dynamic: true})})
            const helpEncrypt = new MessageEmbed()
                .setAuthor({name: user.username, iconURL: user.displayAvatarURL({dynamic: true})})
                .setDescription(`🔐 ${lang(author, "help-encrypt-desc")}:\n\`\`\`${prefix}encrypt (${lang(author, "help-encrypt-desc1")})\n\n${prefix}decrypt (${lang(author, "help-encrypt-desc1")})\n\n${prefix}show-accounts\n\n${prefix}recover-password (${lang(author, "help-encrypt-desc2")})\`\`\`\n${lang(author, "read-privacy-passman")}`)
                .setColor("RANDOM")
                .setFooter({text: lang(author, "can-be-used-only-on-dms"), iconURL: user.displayAvatarURL({dynamic: true})})
            const helpRewards = new MessageEmbed()
                .setAuthor({name: user.username, iconURL: user.displayAvatarURL({dynamic: true})})
                .setDescription(`💰 ${lang(author, "help-rewards-desc")}:\n\`\`\`${prefix}balance\n\n\n${prefix}buy <Reward ID>\n\n${prefix}rinfo <id || all>\n\n${prefix}econfig <option>\`\`\``)
                .setFooter({text: lang(author, "can-not-be-used-on-dms"), iconURL: user.displayAvatarURL({dynamic: true})})
                .setColor("RANDOM")
            if(!args[0]) {
                pages = [mainEmbed, userConfigEmbed, modEmbed, helpRewards, roleplayEmbed, utilitiesEmbed, cryptoEmbed, helpCanvas, helpEncrypt]
                await buttonsPagination(messageCreate, pages, [], 15000)
            } 
            else if(args[0] === "main")     { await messageCreate.reply({embeds: [mainEmbed]}) }
            else if(args[0] === "config")   { await messageCreate.reply({embeds: [userConfigEmbed]}) }
            else if(args[0] === "roleplay") { await messageCreate.reply({embeds: [roleplayEmbed]}) }
            else if(args[0] === "utils")    { await messageCreate.reply({embeds: [utilitiesEmbed]}) }
            else if(args[0] === "mod")      { await messageCreate.reply({embeds: [modEmbed]}) }
            else if(args[0] === "crypto")   { await messageCreate.reply({embeds: [cryptoEmbed]}) }
            else if(args[0] === "canvas")   { await messageCreate.reply({embeds: [helpCanvas]}) }
            else if(args[0] === "encrypt")  { await messageCreate.reply({embeds: [helpEncrypt]}) }
            else if(args[0] === "rewards")  { await messageCreate.reply({embeds: [helpRewards]}) }
            
        
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }

    }
}