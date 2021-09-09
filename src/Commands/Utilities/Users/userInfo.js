const {errorHandle} = require("@configs/other/errorHandle")
const {RichPresence} = require("@configs/other/RichPresence")
const {memberStatus} = require("@configs/other/memberStatus")
const { MessageEmbed } = require("discord.js")
const lang = require("@lang")
const {buttonsPagination: pagination} = require("djs-buttons-pagination")
module.exports = {
    aliases: ["uf", "userinfo"],
    run: async(client, messageCreate, args) => {

        const {author, mentions, guild} = messageCreate
        const {checkGuild} = require("@configs/other/checkGuild")
        const verified = await checkGuild(messageCreate, author)
        if(verified.verify !== true) return 
        
        try {
            let verify = []
            const guildMember = mentions.members.first() || guild.members.cache.get([args[0]])
            const toget = await RichPresence(author, guildMember)
            const togetstatus = await memberStatus(author, guildMember)
            const retrieveStatus = togetstatus[0]
            const name = retrieveStatus.username
            const id = retrieveStatus.id
            const created = retrieveStatus.created
            const createdFrom = retrieveStatus.createdFromNow
            const presence = retrieveStatus.presence
            const joined = retrieveStatus.joinedAt
            const joinedFrom = retrieveStatus.joinedFrom
            const userMainInfoText = `**${lang(author, "uf")}**\`\`\`\n${lang(author, "name")} ${name}\nUser ID: ${id}\n${lang(author, "created")} ${created} - ${createdFrom}\n${lang(author, "joined")} ${joined} - ${joinedFrom}\n${lang(author, "presence")} ${presence}\`\`\``
            
            const userMainInfo = new MessageEmbed()
                .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                .setDescription(`${userMainInfoText}`)
                .setColor("RANDOM")
                .setFooter(name, guildMember.user.displayAvatarURL({dynamic: true}))
            verify.push(userMainInfo)
            if(toget !== "Nothing.") {
                const retrieve = toget[0]; const retrieveId = retrieve.id.id;
                
                if(retrieveId === "Multiple") {
                    if(retrieve.VSC) {
                        const retrieveVSC = retrieve.VSC
                        const largeImageVSC = retrieveVSC.assets.largeImage;
                        const smallImageVSC = retrieveVSC.assets.smallImage
                        const retrieveVSCText = `**Visual Studio Code:**\`\`\`${lang(author, "vsc-name")} ${retrieveVSC.name}\n${lang(author, "vsc-type")} ${retrieveVSC.state}\n${lang(author, "vsc-details")} ${retrieveVSC.assets.largeText} - ${retrieveVSC.details}\n${lang(author, "vsc-started")} ${retrieveVSC.starts}\`\`\``
                        const vscEmbed = new MessageEmbed()
                            .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                            .setColor("RANDOM")
                            .setDescription(`${retrieveVSCText}`)
                            .setThumbnail(await largeImageVSC)
                            .setFooter(`${retrieveVSC.assets.smallText}`, `${await smallImageVSC}`)
                        verify.push(vscEmbed)
                    } else {}
                    if(retrieve.Spotify){
                        const retrieveSpotify = retrieve.Spotify
                        const largeImageSpotify = retrieveSpotify.assets.largeImage;
                        const smallImageSpotify = retrieveSpotify.assets.smallImage
                        const retrieveSpotifyText = `**Spotify**:\`\`\`${lang(author, "spotify-name").replace("{song}", retrieveSpotify.assets.largeText)}\n${lang(author, "spotify-started")} ${retrieveSpotify.starts}\n${lang(author, "spotify-ends")} ${retrieveSpotify.ends}\n${lang(author, "spotify-details")} ${retrieveSpotify.details}\`\`\``
                        const SpotifyEmbed = new MessageEmbed()
                            .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                            .setColor("RANDOM")
                            .setDescription(`${retrieveSpotifyText}`)
                            .setThumbnail(await largeImageSpotify)
                            .setFooter(`${retrieveSpotify.assets.smallText}`, `${await smallImageSpotify}`)
                        verify.push(SpotifyEmbed)
                    } else {}
                    if(retrieve.otherElements) {
                        const otherElements = retrieve.otherElements
                        const otherElementsText = `**${otherElements.name}:**\`\`\`\n${lang(author, "other-state")} ${otherElements.type}\n${lang(author, "other-details")} ${otherElements.details}\n${lang(author, "other-started")} ${otherElements.starts}\`\`\``
                        const otherElementsEmbed = new MessageEmbed()
                            .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                            .setColor("RANDOM")
                            .setDescription(`${otherElementsText}`)
                        let otherElementsAssets = otherElements.assets
                        if(otherElementsAssets !== undefined) {
                            const largeImageSpotify = otherElementsAssets.largeImage;
                            const smallImageSpotify = otherElementsAssets.smallImage
                            otherElementsEmbed.setThumbnail(await largeImageSpotify)
                            otherElementsEmbed.setFooter(`${otherElements.assets.smallText}`, `${await smallImageSpotify}`)
                            verify.push(otherElementsEmbed)
                        } else {
                            verify.push(otherElementsEmbed)
                        }
                    }
                    return pagination(messageCreate, verify, [], 10000)
                }
                if(retrieveId === "Single") {
                    const otherElements = retrieve.Single
                    const otherElementsText = `**${otherElements.name}:**\`\`\`\n${lang(author, "other-state")} ${otherElements.type}\n${lang(author, "other-details")} ${otherElements.details}\n${lang(author, "other-started")} ${otherElements.starts}\`\`\``
                    const otherElementsEmbed = new MessageEmbed()
                        .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                        .setColor("RANDOM")
                        .setDescription(`${otherElementsText}`)
                    let otherElementsAssets = otherElements.assets
                    if(otherElementsAssets !== undefined) {
                        const largeImageSpotify = otherElementsAssets.largeImage;
                        const smallImageSpotify = otherElementsAssets.smallImage
                        otherElementsEmbed.setThumbnail(await largeImageSpotify)
                        otherElementsEmbed.setFooter(`${otherElements.assets.smallText}`, `${await smallImageSpotify}`)
                        verify.push(otherElementsEmbed)
                    } else {
                       verify.push(otherElementsEmbed)
                    }
                }
            } else {
                return messageCreate.reply({embeds: [userMainInfo]})
            }
            pagination(messageCreate, verify, [], 10000)
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }
}