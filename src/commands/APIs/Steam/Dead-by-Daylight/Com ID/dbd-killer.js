const { MessageEmbed } = require('discord.js'); const page = require('discord.js-pagination')
const lang = require('../../../../../util/languages/languages'); const steamSchema = require('../../../../../configs/db/schemas/steam-schema')

module.exports = {
    aliases: ['dbdk', 'killer'], description: '',
    run: async(client, message, args) => {
        const {guild} = message
            
        let steamDB = await steamSchema.findOne({userID: message.author.id})
        let fArg = args[0]; const s = client.steam; let id; let checker;
        try {
            if(!steamDB && !fArg) {
                return message.reply('Try again')
            } else if(!steamDB && fArg && isNaN(fArg) || steamDB.userID && fArg && isNaN(fArg)) {
                id = message.content.match('(?:https?:\/\/)?steamcommunity\.com\/(?:profiles|id)\/[a-zA-Z0-9]+'); checker = 'urlCheck'
            } else if(steamDB && !fArg) {
                id = steamDB._id; checker = 'dbCheck'
            } else if(fArg && !steamDB && !isNaN(fArg) || fArg && steamDB && !isNaN(fArg)) {
                id = fArg; checker = 'idCheck'
            }
            
            if(id) {
                let userStats; let userSum; let userRecen; let userGame; let steamSum; let steamStats; message.channel.startTyping()
                if(checker === 'dbCheck') {
                    userStats = s.getUserStats(`${id}`, '381210'); steamStats = await userStats
                    userSum = s.getUserSummary(`${id}`); steamSum = await userSum
                    userRecen = s.getUserRecentGames(`${id}`); userGame = await userRecen
                } else if (checker === 'urlCheck' || checker === 'idCheck') {
                    let dataResolver = s.resolve(`${id}`); let steamResolver = await dataResolver
                    userStats = s.getUserStats(`${steamResolver}`, '381210'); steamStats = await userStats
                    userSum = s.getUserSummary(`${steamResolver}`); steamSum = await userSum
                    userRecen = s.getUserRecentGames(`${steamResolver}`); userGame = await userRecen
                }

                let gameName = await userGame.find(x => x.name === 'Dead by Daylight')
                if(!gameName) {
                    const errEmbed = new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setDescription(lang(guild, "nogame"))
                        .addFields(
                            {name: lang(guild, "nogame2"), value: lang(guild, "nogame2")},
                        )
                        .setColor("#ff0000")
                    return message.reply(errEmbed);
                }
                let gData = steamStats.stats
                let rawGameTime = gameName.playTime; let realGameTime = Math.floor(rawGameTime / 60)
    
                //Killer stats
                let kll = gData.DBD_KilledCampers; let scf = gData.DBD_SacrificedCampers; let obs = gData.DBD_DLC7_Slasher_Stat2
                let ags = gData.DBD_DLC8_Slasher_Stat2; let hk3 = gData.DBD_Event1_Stat1; let aij = gData.DBD_Chapter14_Slasher_Stat1
                let gtk = gData.DBD_Chapter15_Slasher_Stat2; let grp = gData.DBD_Chapter12_Slasher_Stat1; let dmg = gData.DBD_DLC9_Slasher_Stat1
                let scg = gData.DBD_Chapter11_Slasher_Stat1; let dow = gData.DBD_Chapter11_Slasher_Stat2; let hcs = gData.DBD_Chapter13_Slasher_Stat1
                let hsc = gData.DBD_Chapter10_Slasher_Stat1; let krn = gData.DBD_KillerSkulls; let bll = gData.DBD_BloodwebPoints
                let kpf = gData.DBD_SlasherMaxScoreByCategory; let brt = gData.DBD_TrapPickup; let chs = gData.DBD_ChainsawHit
                let clk = gData.DBD_UncloakAttack; let blk = gData.DBD_SlasherChainAttack; let tpu = gData.DBD_SlasherTierIncrement
                let hag = gData.DBD_DLC3_Slasher_Stat1; let doc = gData.DBD_DLC4_Slasher_Stat1; let tri = gData.DBD_DLC4_Slasher_Stat2
                let htc = gData.DBD_DLC5_Slasher_Stat1; let ltf = gData.DBD_DLC6_Slasher_Stat1; let kru = gData.DBD_DLC7_Slasher_Stat1
                let bsh = gData.DBD_DLC6_Slasher_Stat2; let pig = gData.DBD_DLC8_Slasher_Stat1; let clo = gData.DBD_DLC9_Slasher_Stat2
                let spi = gData.DBD_Chapter9_Slasher_Stat2; let ghs = gData.DBD_Chapter12_Slasher_Stat2; let oni = gData.DBD_Chapter14_Slasher_Stat2
                let dsl = gData.DBD_Chapter15_Slasher_Stat1
                
                //Se os status retornarem indefinidos;
                if(kll === undefined) kll = '0'; if(scf === undefined) scf = '0'; if(obs === undefined) obs = '0';
                if(ags === undefined) ags = '0'; if(hk3 === undefined) hk3 = '0'; if(aij === undefined) aij = '0';
                if(gtk === undefined) gtk = '0'; if(grp === undefined) grp = '0'; if(dmg === undefined) dmg = '0';
                if(scg === undefined) scg = '0'; if(dow === undefined) dow = '0'; if(hcs === undefined) hcs = '0';
                if(hsc === undefined) hsc = '0'; if(krn === undefined) krn = '0'; if(bll === undefined) bll = '0';
                if(kpf === undefined) kpf = '0'; if(brt === undefined) brt = '0'; if(chs === undefined) chs = '0';
                if(clk === undefined) clk = '0'; if(blk === undefined) blk = '0'; if(tpu === undefined) tpu = '0';
                if(hag === undefined) hag = '0'; if(doc === undefined) doc = '0'; if(tri === undefined) tri = '0';
                if(htc === undefined) htc = '0'; if(ltf === undefined) ltf = '0'; if(kru === undefined) kru = '0';
                if(bsh === undefined) bsh = '0'; if(pig === undefined) pig = '0'; if(clo === undefined) clo = '0';
                if(spi === undefined) spi = '0'; if(ghs === undefined) ghs = '0'; if(oni === undefined) oni = '0';
                if(dsl === undefined) dsl = '0';
                
                const killerPage = new MessageEmbed()
                    .setAuthor(guild.name,guild.iconURL({dynamic: true}))
                    .setTitle(`${lang(guild, "DBD_KSS")} \`\`\`${steamSum.nickname}\`\`\``)
                    .setDescription(`\`\`\`${realGameTime} ${lang(guild, "gametime")}\`\`\``)
                    .setColor("RANDOM")
                    .addFields(
                        {name: lang(guild, "DBD_KRN"),  value: `\`\`\`${krn} ${lang(guild, "points")}\`\`\``},
                        {name: lang(guild, "DBD_BLD"),  value: `\`\`\`${bll} bloodpoints\`\`\``},
                        {name: lang(guild, "DBD_KPF"),  value: `\`\`\`${kpf} ${lang(guild, "games")}\`\`\``},
                        {name: lang(guild, "DBD_KLL"),  value: `\`\`\`${kll} ${lang(guild, "mortos")}\`\`\``},
                        {name: lang(guild, "DBD_SCF"),  value: `\`\`\`${scf} ${lang(guild, "sacrificed")}\`\`\``},
                        {name: lang(guild, "DBD_OBS"),  value: `\`\`\`${obs} ${lang(guild, "obssesão")}\`\`\``},
                        {name: lang(guild, "DBD_AGR"),  value: `\`\`\`${ags} ${lang(guild, "times")}\`\`\``},
                        {name: lang(guild, "DBD_3S"),   value: `\`\`\`${hk3} ${lang(guild, "times")}\`\`\``},
                        {name: lang(guild, "DBD_AIJ"),  value: `\`\`\`${aij} ${lang(guild, "times")}\`\`\``},
                        {name: lang(guild, "DBD_GTK"),  value: `\`\`\`${gtk} ${lang(guild, "times")}\`\`\``},
                        {name: lang(guild, "DBD_GRP"),  value: `\`\`\`${grp} ${lang(guild, "times")}\`\`\``},
                        {name: lang(guild, "DBD_DMG"),  value: `\`\`\`${dmg} ${lang(guild, "geradores")}\`\`\``},
                    )
                const killerPage2 = new MessageEmbed()
                    .setAuthor(guild.name,guild.iconURL({dynamic: true}))
                    .setColor("RANDOM")
                    .addFields(
                        {name: lang(guild, "DBD_SCG"),  value: `\`\`\`${scg} ${lang(guild, "times")}\`\`\``},
                        {name: lang(guild, "DBD_DOW"),  value: `\`\`\`${dow} ${lang(guild, "times")}\`\`\``},
                        {name: lang(guild, "DBD_HSC"),  value: `\`\`\`${hsc} ${lang(guild, "times")}\`\`\``},
                        {name: lang(guild, "DBD_BRT"),  value: `\`\`\`${brt} ${lang(guild, "times")}\`\`\``},
                        {name: lang(guild, "DBD_CHS"),  value: `\`\`\`${chs} ${lang(guild, "hits")}\`\`\``},
                        {name: lang(guild, "DBD_CLK"),  value: `\`\`\`${clk} ${lang(guild, "atks")}\`\`\``},
                        {name: lang(guild, "DBD_BLK"),  value: `\`\`\`${blk} ${lang(guild, "atks")}\`\`\``},
                        {name: lang(guild, "DBD_HAG"),  value: `\`\`\`${hag} ${lang(guild, "ftms")}\`\`\``},
                        {name: lang(guild, "DBD_DOC"),  value: `\`\`\`${doc} ${lang(guild, "shock")}\`\`\``},
                        {name: lang(guild, "DBD_TRI"),  value: `\`\`\`${tri} ${lang(guild, "trial")}\`\`\``},
                        {name: lang(guild, "DBD_HTC"),  value: `\`\`\`${htc} ${lang(guild, "htc")}\`\`\``},
                        {name: lang(guild, "DBD_KRU"),  value: `\`\`\`${kru} ${lang(guild, "sur")}\`\`\``}
                    )
                const killerPage3 = new MessageEmbed()
                    .setAuthor(guild.name,guild.iconURL({dynamic: true}))
                    .setColor("RANDOM")
                    .addFields(
                        {name: lang(guild, "DBD_BSH"),  value: `\`\`\`${bsh} ${lang(guild, "sur")}\`\`\``},
                        {name: lang(guild, "DBD_PIG"),  value: `\`\`\`${pig} ${lang(guild, "traps")}\`\`\``},
                        {name: lang(guild, "DBD_CLO"),  value: `\`\`\`${clo} ${lang(guild, "times")}\`\`\``},
                        {name: lang(guild, "DBD_SPI"),  value: `\`\`\`${spi} ${lang(guild, "times")}\`\`\``},
                        {name: lang(guild, "DBD_GHS"),  value: `\`\`\`${ghs} ${lang(guild, "times")}\`\`\``},
                        {name: lang(guild, "DBD_DSL"),  value: `\`\`\`${dsl} ${lang(guild, "times")}\`\`\``}
                    )
                pages = [killerPage, killerPage2, killerPage3]
                page(message, pages); message.channel.stopTyping()
            } 
        } catch (error) {
            const errEmbed = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setDescription(lang(guild, "err"))
                .setColor("#ff0000")
                .addFields(
                    {name: `${lang(guild, "err2")}  ${lang(guild, "err_dev")}`, value: `\`\`\`${error}\`\`\``},
                )
            message.reply(errEmbed).then(message.channel.stopTyping())
        }   
    }
}