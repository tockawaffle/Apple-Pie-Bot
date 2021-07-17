const {MessageEmbed} = require('discord.js'); const page = require('discord.js-pagination')
const lang = require('../../../../util/languages/languages'); const moment = require('moment')

module.exports = {
    aliases: ['user-steam','steam-u','steamuser', 'steamu'],
    description: 'Busca informações sobre um usuário da Steam',
    run: async(client, message, args) => {
        const {guild} = message
        let arg = args[0]
        const steam = client.steam
        if(arg.match('(?:https?:\/\/)?steamcommunity\.com\/(?:profiles|id)\/[a-zA-Z0-9]+')) {
            message.delete()
            const data = await steam.resolve(arg)
            let steamID = data
            const summary = await steam.getUserSummary(steamID)
            
            let userBans = await steam.getUserBans(steamID)
            let userLevel = await steam.getUserLevel(steamID)
            let recentGames = await steam.getUserRecentGames(steamID).catch(err => {return null})
            let userOwnedGames = await steam.getUserOwnedGames(steamID).catch(err => {return null})
            let userTotalFriends = await steam.getUserFriends(steamID).catch(err => {return null})
            let userOwnedGamesLenght; let userTotalFriendsLenght
            
            if(userLevel === undefined) userLevel = lang(guild, "stu_private")

            let comBan; let vacBan; let econBan; let gameBans;
            if(userBans.communityBanned === false) comBan = lang(guild, "stu_notbanned")
            else comBan = lang(guild, "stu_banned")
            if(userBans.vacBanned === 0) vacBan = lang(guild, "stu_notbanned")
            else vacBan = `${lang(guild, "stu_banned")} ${userBans.vacBans} ${lang(guild, "times")}\n${userBans.daysSinceLastBan} ${lang(guild, "stu_dlb")}`
            if(userBans.economyBan === 'none') econBan = lang(guild, "stu_notbanned")
            else econBan = lang(guild, "stu_banned")
            if(userBans.gameBans === 0) gameBans = lang(guild, "stu_notbanned")
            else gameBans = `${lang(guild, "stu_banned")} ${userBans.gameBans} ${lang(guild, "times")}`

            if(userOwnedGames === null) userOwnedGamesLenght = lang(guild, "stu_private")
            else userOwnedGamesLenght = userOwnedGames.length + ` ${lang(guild, "stu_games")}`
            if(userTotalFriends === null) userTotalFriendsLenght = lang(guild, "stu_private")
            else userTotalFriendsLenght = userTotalFriends.length

            //Formatando os Unix datas
            let lOffFormat = summary.lastLogOff; let cFormat = summary.created
            if(lOffFormat === undefined) lOffFormat = lang(guild, "stu_invalidDate")
            else lOffFormat = moment(lOffFormat, 'X').format('L')
            if(cFormat === undefined) cFormat = lang(guild, "stu_private")
            else cFormat = moment(summary.created, 'X').format('L'); 

            //Formatando a presença de usuário
            let presence = summary.personaState
            if(presence === 0) presence = 'Offline'
            else if(presence === 1) presence = 'Online'
            else if(presence === 2) presence = 'Do not Disturb'
            else if(presence === 3) presence = 'Away From Keyboard (AFK)'
            else if(presence === 4) presence = lang(guild, "stu_snooze")
            else if(presence === 5 || 6) presence = lang(guild, "stu_tradePlay")

            //Formatando a privacidade da conta do usuário
            let userPrivacy = summary.visibilityState
            if(userPrivacy === 1) userPrivacy = lang(guild, "stu_privC")
            else if(userPrivacy === 3) userPrivacy = lang(guild, "stu_pricO")

            //Respondendo à requisição
            const userEmbed = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RANDOM")
                .setDescription(`${lang(guild, "stu_user")} [${summary.nickname}](${summary.url})`)
                .setThumbnail(summary.avatar.large)
                .addFields(
                    {name: `${lang(guild, "stu_64")}`, value: `\`\`\`${summary.steamID}\`\`\``},
                    {name: `${lang(guild, "stu_created")}`, value: `\`\`\`${cFormat}\`\`\``},
                    {name: `${lang(guild, "stu_logoff")}`, value: `\`\`\`${lOffFormat}\`\`\``},
                    {name: `${lang(guild, "stu_presence")}`, value: `\`\`\`${presence}\`\`\``},
                    {name: `${lang(guild, "stu_friends")}`, value: `\`\`\`${userTotalFriendsLenght}\`\`\``},
                    {name: `${lang(guild, "stu_lvl")}`, value: `\`\`\`${userLevel}\`\`\``},
                    {name: `${lang(guild, "stu_priv")}`, value: `\`\`\`${userPrivacy}\`\`\``},
                    {name: `${lang(guild, "stu_gamesowned")}`, value: `\`\`\`${userOwnedGamesLenght}\`\`\``}
                )
            const userBan = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RANDOM")
                .setDescription(`${lang(guild, "stu_userban")} [${summary.nickname}](${summary.url})`)
                .addFields(
                    {name: 'Vac Banned?', value: `\`\`\`${vacBan}\`\`\``},
                    {name: 'Game Bans?', value: `\`\`\`${gameBans}\`\`\``},
                    {name: lang(guild, "stu_vac"), value: `\`\`\`${comBan}\`\`\``},
                    {name: lang(guild, "stu_econBan"), value: `\`\`\`${econBan}\`\`\``}
                )
            const RecentGames = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RANDOM")
                .setTitle(lang(guild, "stu_recent"))
                .setDescription(
                    recentGames.map((RecentGame ) => {
                        return  `\`\`\`${RecentGame.name  + `,\n${lang(guild, "stu_playtime")}` + Math.round(RecentGame.playTime / 60) + ` ${lang(guild, "gametime")}` }\`\`\`` 
                    })
                )
            pages = [userEmbed, userBan , RecentGames]
            page(message, pages)
        } else if (isNaN(arg)) {
            message.delete()
            const data = await steam.resolve(`https://steamcommunity.com/id/${arg}`)
            let steamID = data
            const summary = await steam.getUserSummary(steamID)
            
            let userBans = await steam.getUserBans(steamID)
            let userLevel = await steam.getUserLevel(steamID)
            let recentGames = await steam.getUserRecentGames(steamID).catch(err => {return null})
            let userOwnedGames = await steam.getUserOwnedGames(steamID).catch(err => {return null})
            let userTotalFriends = await steam.getUserFriends(steamID).catch(err => {return null})
            let userOwnedGamesLenght; let userTotalFriendsLenght
            
            if(userLevel === undefined) userLevel = lang(guild, "stu_private")

            let comBan; let vacBan; let econBan; let gameBans;
            if(userBans.communityBanned === false) comBan = lang(guild, "stu_notbanned")
            else comBan = lang(guild, "stu_banned")
            if(userBans.vacBanned === 0) vacBan = lang(guild, "stu_notbanned")
            else vacBan = `${lang(guild, "stu_banned")} ${userBans.vacBans} ${lang(guild, "times")}\n${userBans.daysSinceLastBan} ${lang(guild, "stu_dlb")}`
            if(userBans.economyBan === 'none') econBan = lang(guild, "stu_notbanned")
            else econBan = lang(guild, "stu_banned")
            if(userBans.gameBans === 0) gameBans = lang(guild, "stu_notbanned")
            else gameBans = `${lang(guild, "stu_banned")} ${userBans.gameBans} ${lang(guild, "times")}`

            if(userOwnedGames === null) userOwnedGamesLenght = lang(guild, "stu_private")
            else userOwnedGamesLenght = userOwnedGames.length + ` ${lang(guild, "stu_games")}`
            if(userTotalFriends === null) userTotalFriendsLenght = lang(guild, "stu_private")
            else userTotalFriendsLenght = userTotalFriends.length

            //Formatando os Unix datas
            let lOffFormat = summary.lastLogOff; let cFormat = summary.created
            if(lOffFormat === undefined) lOffFormat = lang(guild, "stu_invalidDate")
            else lOffFormat = moment(lOffFormat, 'X').format('L')
            if(cFormat === undefined) cFormat = lang(guild, "stu_private")
            else cFormat = moment(summary.created, 'X').format('L'); 

            //Formatando a presença de usuário
            let presence = summary.personaState
            if(presence === 0) presence = 'Offline'
            else if(presence === 1) presence = 'Online'
            else if(presence === 2) presence = 'Do not Disturb'
            else if(presence === 3) presence = 'Away From Keyboard (AFK)'
            else if(presence === 4) presence = lang(guild, "stu_snooze")
            else if(presence === 5 || 6) presence = lang(guild, "stu_tradePlay")

            //Formatando a privacidade da conta do usuário
            let userPrivacy = summary.visibilityState
            if(userPrivacy === 1) userPrivacy = lang(guild, "stu_privC")
            else if(userPrivacy === 3) userPrivacy = lang(guild, "stu_pricO")

            //Respondendo à requisição
            const userEmbed = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RANDOM")
                .setDescription(`${lang(guild, "stu_user")} [${summary.nickname}](${summary.url})`)
                .setThumbnail(summary.avatar.large)
                .addFields(
                    {name: `${lang(guild, "stu_64")}`, value: `\`\`\`${summary.steamID}\`\`\``},
                    {name: `${lang(guild, "stu_created")}`, value: `\`\`\`${cFormat}\`\`\``},
                    {name: `${lang(guild, "stu_logoff")}`, value: `\`\`\`${lOffFormat}\`\`\``},
                    {name: `${lang(guild, "stu_presence")}`, value: `\`\`\`${presence}\`\`\``},
                    {name: `${lang(guild, "stu_friends")}`, value: `\`\`\`${userTotalFriendsLenght}\`\`\``},
                    {name: `${lang(guild, "stu_lvl")}`, value: `\`\`\`${userLevel}\`\`\``},
                    {name: `${lang(guild, "stu_priv")}`, value: `\`\`\`${userPrivacy}\`\`\``},
                    {name: `${lang(guild, "stu_gamesowned")}`, value: `\`\`\`${userOwnedGamesLenght}\`\`\``}
                )
            const userBan = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RANDOM")
                .setDescription(`${lang(guild, "stu_userban")} [${summary.nickname}](${summary.url})`)
                .addFields(
                    {name: 'Vac Banned?', value: `\`\`\`${vacBan}\`\`\``},
                    {name: 'Game Bans?', value: `\`\`\`${gameBans}\`\`\``},
                    {name: lang(guild, "stu_vac"), value: `\`\`\`${comBan}\`\`\``},
                    {name: lang(guild, "stu_econBan"), value: `\`\`\`${econBan}\`\`\``}
                )
            const RecentGames = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RANDOM")
                .setTitle(lang(guild, "stu_recent"))
                .setDescription(
                    recentGames.map((RecentGame ) => {
                        return  `\`\`\`${RecentGame.name  + `,\n${lang(guild, "stu_playtime")}` + Math.round(RecentGame.playTime / 60) + ` ${lang(guild, "gametime")}` }\`\`\`` 
                    })
                )
            pages = [userEmbed, userBan , RecentGames]
            page(message, pages)
        } else if(!isNaN(arg)) {
            message.delete()
            const data = await steam.resolve(arg)
            let steamID = data
            const summary = await steam.getUserSummary(steamID)
            
            let userBans = await steam.getUserBans(steamID)
            let userLevel = await steam.getUserLevel(steamID)
            let recentGames = await steam.getUserRecentGames(steamID).catch(err => {return null})
            let userOwnedGames = await steam.getUserOwnedGames(steamID).catch(err => {return null})
            let userTotalFriends = await steam.getUserFriends(steamID).catch(err => {return null})
            let userOwnedGamesLenght; let userTotalFriendsLenght
            
            if(userLevel === undefined) userLevel = lang(guild, "stu_private")

            let comBan; let vacBan; let econBan; let gameBans;
            if(userBans.communityBanned === false) comBan = lang(guild, "stu_notbanned")
            else comBan = lang(guild, "stu_banned")
            if(userBans.vacBanned === 0) vacBan = lang(guild, "stu_notbanned")
            else vacBan = `${lang(guild, "stu_banned")} ${userBans.vacBans} ${lang(guild, "times")}\n${userBans.daysSinceLastBan} ${lang(guild, "stu_dlb")}`
            if(userBans.economyBan === 'none') econBan = lang(guild, "stu_notbanned")
            else econBan = lang(guild, "stu_banned")
            if(userBans.gameBans === 0) gameBans = lang(guild, "stu_notbanned")
            else gameBans = `${lang(guild, "stu_banned")} ${userBans.gameBans} ${lang(guild, "times")}`

            if(userOwnedGames === null) userOwnedGamesLenght = lang(guild, "stu_private")
            else userOwnedGamesLenght = userOwnedGames.length + ` ${lang(guild, "stu_games")}`
            if(userTotalFriends === null) userTotalFriendsLenght = lang(guild, "stu_private")
            else userTotalFriendsLenght = userTotalFriends.length

            //Formatando os Unix datas
            let lOffFormat = summary.lastLogOff; let cFormat = summary.created
            if(lOffFormat === undefined) lOffFormat = lang(guild, "stu_invalidDate")
            else lOffFormat = moment(lOffFormat, 'X').format('L')
            if(cFormat === undefined) cFormat = lang(guild, "stu_private")
            else cFormat = moment(summary.created, 'X').format('L'); 

            //Formatando a presença de usuário
            let presence = summary.personaState
            if(presence === 0) presence = 'Offline'
            else if(presence === 1) presence = 'Online'
            else if(presence === 2) presence = 'Do not Disturb'
            else if(presence === 3) presence = 'Away From Keyboard (AFK)'
            else if(presence === 4) presence = lang(guild, "stu_snooze")
            else if(presence === 5 || 6) presence = lang(guild, "stu_tradePlay")

            //Formatando a privacidade da conta do usuário
            let userPrivacy = summary.visibilityState
            if(userPrivacy === 1) userPrivacy = lang(guild, "stu_privC")
            else if(userPrivacy === 3) userPrivacy = lang(guild, "stu_pricO")

            //Respondendo à requisição
            const userEmbed = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RANDOM")
                .setDescription(`${lang(guild, "stu_user")} [${summary.nickname}](${summary.url})`)
                .setThumbnail(summary.avatar.large)
                .addFields(
                    {name: `${lang(guild, "stu_64")}`, value: `\`\`\`${summary.steamID}\`\`\``},
                    {name: `${lang(guild, "stu_created")}`, value: `\`\`\`${cFormat}\`\`\``},
                    {name: `${lang(guild, "stu_logoff")}`, value: `\`\`\`${lOffFormat}\`\`\``},
                    {name: `${lang(guild, "stu_presence")}`, value: `\`\`\`${presence}\`\`\``},
                    {name: `${lang(guild, "stu_friends")}`, value: `\`\`\`${userTotalFriendsLenght}\`\`\``},
                    {name: `${lang(guild, "stu_lvl")}`, value: `\`\`\`${userLevel}\`\`\``},
                    {name: `${lang(guild, "stu_priv")}`, value: `\`\`\`${userPrivacy}\`\`\``},
                    {name: `${lang(guild, "stu_gamesowned")}`, value: `\`\`\`${userOwnedGamesLenght}\`\`\``}
                )
            const userBan = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RANDOM")
                .setDescription(`${lang(guild, "stu_userban")} [${summary.nickname}](${summary.url})`)
                .addFields(
                    {name: 'Vac Banned?', value: `\`\`\`${vacBan}\`\`\``},
                    {name: 'Game Bans?', value: `\`\`\`${gameBans}\`\`\``},
                    {name: lang(guild, "stu_vac"), value: `\`\`\`${comBan}\`\`\``},
                    {name: lang(guild, "stu_econBan"), value: `\`\`\`${econBan}\`\`\``}
                )
            const RecentGames = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RANDOM")
                .setTitle(lang(guild, "stu_recent"))
                .setDescription(
                    recentGames.map((RecentGame ) => {
                        return  `\`\`\`${RecentGame.name  + `,\n${lang(guild, "stu_playtime")}` + Math.round(RecentGame.playTime / 60) + ` ${lang(guild, "gametime")}` }\`\`\`` 
                    })
                )
            pages = [userEmbed, userBan , RecentGames]
            page(message, pages)
        }
    }
}