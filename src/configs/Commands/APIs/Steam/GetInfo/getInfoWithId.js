async function getInfoWithId(client, messageCreate, id) {
    const
    {MessageEmbed} = require('discord.js'),
    {buttonsPagination} = require("djs-buttons-pagination"),
    {author} = messageCreate,
    lang = require("@lang"),
    moment = require("moment"),
    steam = client.steam;
if(!id) throw new Error(lang(author, "ERROR_MISSING_URL"));
try {
    await messageCreate.channel.sendTyping()
    let 
        steamSum = await steam.getUserSummary(id),
        steamBans = await steam.getUserBans(id),
        steamFriends = await steam.getUserFriends(id),
        steamLevel = await steam.getUserLevel(id),
        steamRecentGames = await steam.getUserRecentGames(id),
        steamOwned = await steam.getUserOwnedGames(id),
        steamAvatar = await steamSum.avatar.small,
        steamName = await steamSum.nickname,
        steamRealName = await steamSum.realName,
        steamId = await steamSum.steamID,
        steamStatus = await steamSum.visibilityState,
        steamCreated = await steamSum.created,
        status,
        vacBan,
        gameBan,
        communityBan,
        daysSinceLastBan;

        if(steamStatus === 0) { status = lang(author, "steam_offline") }
        else if(steamStatus === 1) { status = lang(author, "steam_online") }
        else if(steamStatus === 2) { status = lang(author, "steam_busy") }
        else if(steamStatus === 3) { status = lang(author, "steam_away") }
        else if(steamStatus === 4) { status = lang(author, "steam_snooze") }

        if(steamBans.vacBanned === false) { vacBan = lang(author, "steam_notbanned") }
        else { vacBan = `${lang(author, "steam_banned")} ${steamBans.vacBans}x` }
        if(steamBans.gameBans === 0) { gameBan = lang(author, "steam_notbanned") }
        else { gameBan = `${lang(author, "steam_banned")} ${steamBans.gameBans}x` }
        if(steamBans.communityBanned === false) { communityBan = lang(author, "steam_notbanned") }
        else { communityBan = lang(author, "steam_banned") }
        if(steamBans.daysSinceLastBan === 0) { daysSinceLastBan = lang(author, "steam_notbanned") }
        else { daysSinceLastBan = `${lang(author, "steam_banned")} ${steamBans.daysSinceLastBan} ${lang(author, "steam_days_ago")}` }

        const 
            list = steamRecentGames.map(game => { return `${game.name} - ${(game.playTime / 60).toLocaleString()}h` }).join("\n\n")
        const initEmbed = new MessageEmbed()
            .setColor("#0099ff")
            .setAuthor(`${steamName} - lvl${steamLevel}`, steamAvatar)
            .setDescription(`Steam ID: \`\`\`${steamId}\`\`\`\n${lang(author, "steam_realname")}:\n\`\`\`${steamRealName ? steamRealName: lang(author, "steam_none_or_private")}\`\`\`\nStatus:\n\`\`\`${status ? status: lang(author, "unknown")}\`\`\`\n${lang(author, "steam_friends_amount")}:\n\`\`\`${steamFriends.length ? steamFriends.length: lang(author, "steam_zero_or_private")}\`\`\`\nCreated at:\n\`\`\`${moment.unix(steamCreated).utc().format("L")}\`\`\``);
        const gamesEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${steamName} - lvl${steamLevel}`, steamAvatar)
            .setDescription(`${lang(author, "steam_amount_games_owned")}:\n\`\`\`${steamOwned.length ? steamOwned.length: lang(author, "steam_zero_or_private")}\`\`\`\n${lang(author, "steam_recent_game")}: \`\`\`${list}\`\`\``)
        const bansEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${steamName} - lvl${steamLevel}`, steamAvatar)
            .setDescription(`VAC Bans:\n\`\`\`${vacBan}\`\`\`\nGame Bans:\`\`\`${gameBan}\`\`\`\nCommunity Bans:\n\`\`\`${communityBan}\`\`\`\n${lang(author, "steam_days_since_last_ban")}:\n\`\`\`${daysSinceLastBan}\`\`\``)
        await buttonsPagination(messageCreate, [initEmbed, gamesEmbed, bansEmbed], [], 10000)  
} catch (error) {
    throw new Error(error)
}
}

module.exports = {getInfoWithId};