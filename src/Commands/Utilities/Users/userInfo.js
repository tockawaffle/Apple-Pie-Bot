const 
    {errorHandle} = require("@configs/other/errorHandle"),
    {RichPresence} = require("@configs/other/RichPresence"),
    {memberStatus} = require("@configs/other/memberStatus"),
    { MessageEmbed } = require("discord.js"),
    lang = require("@lang"),
    {buttonsPagination: pagination} = require("djs-buttons-pagination");
    
module.exports = {
    aliases: ["uf", "userinfo"],
    run: async(client, messageCreate, args) => {

        const 
            {author, mentions, guild} = messageCreate,
            {checkGuild} = require("@configs/other/checkGuild"),
            verified = await checkGuild(messageCreate, author);
        if(verified !== true) return 
        
        try {
            let verify = []
            const 
                guildMember = mentions.members.first() || guild.members.cache.get([args[0]]),
                toget = await RichPresence(author, guildMember),
                togetstatus = await memberStatus(author, guildMember),
                retrieveStatus = togetstatus[0],
                name = retrieveStatus.username,
                id = retrieveStatus.id,
                created = retrieveStatus.created,
                createdFrom = retrieveStatus.createdFromNow,
                presence = retrieveStatus.presence,
                joined = retrieveStatus.joinedAt,
                joinedFrom = retrieveStatus.joinedFrom,
                userMainInfoText = `**${lang(author, "uf")}**\`\`\`\n${lang(author, "name")} ${name}\nUser ID: ${id}\n${lang(author, "created")} ${created} - ${createdFrom}\n${lang(author, "joined")} ${joined} - ${joinedFrom}\n${lang(author, "presence")} ${presence}\`\`\``
                userMainInfo = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setDescription(`${userMainInfoText}`)
                    .setColor("RANDOM")
                    .setFooter(name, guildMember.user.displayAvatarURL({dynamic: true}));
                
                verify.push(userMainInfo)
            if(toget !== "Nothing.") {
                const retrieve = toget[0]; const retrieveId = retrieve.id.id;
                
                if(retrieveId === "Multiple") {
                    if(retrieve.VSC) {
                        const 
                            retrieveVSC = retrieve.VSC,
                            largeImageVSC = retrieveVSC.assets.largeImage,
                            smallImageVSC = retrieveVSC.assets.smallImage,
                            retrieveVSCText = `**Visual Studio Code:**\`\`\`${lang(author, "vsc-name")} ${retrieveVSC.name}\n${lang(author, "vsc-type")} ${retrieveVSC.state}\n${lang(author, "vsc-details")} ${retrieveVSC.assets.largeText} - ${retrieveVSC.details}\n${lang(author, "vsc-started")} ${retrieveVSC.starts}\`\`\``,
                            vscEmbed = new MessageEmbed()
                                .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                                .setColor("RANDOM")
                                .setDescription(`${retrieveVSCText}`)
                                .setThumbnail(await largeImageVSC)
                                .setFooter(`${retrieveVSC.assets.smallText}`, `${await smallImageVSC}`)
                        verify.push(vscEmbed)
                    } else {}
                    if(retrieve.Spotify){
                        const 
                            retrieveSpotify = retrieve.Spotify,
                            largeImageSpotify = retrieveSpotify.assets.largeImage,
                            smallImageSpotify = retrieveSpotify.assets.smallImage,
                            retrieveSpotifyText = `**Spotify**:\`\`\`${lang(author, "spotify-name").replace("{song}", retrieveSpotify.assets.largeText)}\n${lang(author, "spotify-started")} ${retrieveSpotify.starts}\n${lang(author, "spotify-ends")} ${retrieveSpotify.ends}\n${lang(author, "spotify-details")} ${retrieveSpotify.details}\`\`\``,
                            SpotifyEmbed = new MessageEmbed()
                                .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                                .setColor("RANDOM")
                                .setDescription(`${retrieveSpotifyText}`)
                                .setThumbnail(await largeImageSpotify)
                                .setFooter(`${retrieveSpotify.assets.smallText}`, `${await smallImageSpotify}`)
                            verify.push(SpotifyEmbed)
                    } else {}
                    if(retrieve.otherElements) {
                        const 
                            otherElements = retrieve.otherElements,
                            otherElementsText = `**${otherElements.name}:**\`\`\`\n${lang(author, "other-state")} ${otherElements.type}\n${lang(author, "other-details")} ${otherElements.details}\n${lang(author, "other-started")} ${otherElements.starts}\`\`\``,
                            otherElementsEmbed = new MessageEmbed()
                                .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                                .setColor("RANDOM")
                                .setDescription(`${otherElementsText}`);
                        let otherElementsAssets = otherElements.assets
                        if(otherElementsAssets !== undefined) {
                            const 
                                largeImageSpotify = otherElementsAssets.largeImage,
                                smallImageSpotify = otherElementsAssets.smallImage;
                            otherElementsEmbed.setThumbnail(await largeImageSpotify)
                            otherElementsEmbed.setFooter(`${otherElements.assets.smallText}`, `${await smallImageSpotify}`)
                            verify.push(otherElementsEmbed)
                        } else { verify.push(otherElementsEmbed) }
                    }
                    return pagination(messageCreate, verify, [], 10000)
                }
                if(retrieveId === "Single") {
                    const 
                        otherElements = retrieve.Single,
                        otherElementsText = `**${otherElements.name}:**\`\`\`\n${lang(author, "other-state")} ${otherElements.type}\n${lang(author, "other-details")} ${otherElements.details}\n${lang(author, "other-started")} ${otherElements.starts}\`\`\``,
                        otherElementsEmbed = new MessageEmbed()
                            .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                            .setColor("RANDOM")
                            .setDescription(`${otherElementsText}`);
                    let otherElementsAssets = otherElements.assets

                    if(otherElementsAssets !== undefined) {
                        const 
                            largeImageSpotify = otherElementsAssets.largeImage,
                            smallImageSpotify = otherElementsAssets.smallImage;

                        otherElementsEmbed.setThumbnail(await largeImageSpotify)
                        otherElementsEmbed.setFooter(`${otherElements.assets.smallText}`, `${await smallImageSpotify}`)
                        verify.push(otherElementsEmbed)
                    } else { verify.push(otherElementsEmbed) }
                }
            } else { return await messageCreate.reply({embeds: [userMainInfo]}) }
            await pagination(messageCreate, verify, [], 10000)
        } catch (error) { await errorHandle(messageCreate, author, error) }
    }
}