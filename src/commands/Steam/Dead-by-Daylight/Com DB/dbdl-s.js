const {MessageEmbed} = require('discord.js'); const page = require('discord.js-pagination')
const lang = require('../../../../util/languages/languages')
const dbdSchema = require('../../../../configs/db/schemas/dbd-id-schema')

module.exports = {
    aliases: ['dbdl-survivor', 'dbdl-s', 'dbdls'],
    description: '',
    run: async(client, message, args) => {
        const s = client.steam
        const {guild} = message
        await dbdSchema.findOne({userID: message.author.id}).then(async(result) => {
            let id = result._id
            s.getUserStats(`${id}`, '381210').then((data) => {
                s.getUserSummary(`${id}`).then(summary => {
                    s.getUserRecentGames(`${id}`).then(recent => {
                        let gameName = recent.find(x => x.name === 'Dead by Daylight')
                            if(!gameName) {
                                const errEmbed = new MessageEmbed()
                                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                                    .setDescription(lang(guild, "nogame"))
                                    .addFields(
                                        {name: lang(guild, "nogame2"), value: lang(guild, "nogame2")},
                                    )
                                    .setColor("#ff0000")
                                message.reply(errEmbed); return
                            }
                            let gData = data.stats
                            let rawGameTime = gameName.playTime; let realGameTime = Math.floor(rawGameTime / 60)

                            //Status de Sobrevivente
                            let scpKO = data.stats.DBD_EscapeKO; let scpH = data.stats.DBD_HookedAndEscape; let scpHa = gData.DBD_EscapeThroughHatch;
                            let scpAllH = gData.DBD_AllEscapeThroughHatch; let scpdD = gData.DBD_DLC8_Camper_Stat1; let realRankingSurv = data.stats.DBD_CamperSkulls
                            let scpAs = gData.DBD_EscapeNoBlood_MapAsy_Asylum; let scpHTC = gData.DBD_Chapter12_Camper_Stat2; let scpSH = gData.DBD_HealPct_float;
                            let scpGH = gData.DBD_Camper8_Stat1; let scpGR = gData.DBD_GeneratorPct_float; let scpHS = gData.DBD_Chapter11_Camper_Stat1_float;
                            let scpPT = gData.DBD_HitNearHook; let scpPH = gData.DBD_Chapter14_Camper_Stat1; let scpUNK = gData.DBD_Chapter9_Camper_Stat1;
                            let scpSKC = gData.DBD_SkillCheckSuccess; let scpEXT = gData.DBD_DLC7_Camper_Stat2; let scpHBR = gData.DBD_Chapter10_Camper_Stat1
                            let scpTK = gData.DBD_DLC3_Camper_Stat1;

                            //Caso o status retorne não-existente
                            if(scpKO === undefined) scpKO = '0'; if(scpH === undefined) scpH = '0'; if(scpHa === undefined) scpHa = '0';
                            if(scpAllH === undefined) scpAllH = '0'; if(scpdD === undefined) scpdD = '0'; if(scpHBR === undefined) scpHBR = '0'
                            if(scpAs === undefined) scpAS = '0'; if(scpHTC === undefined) scpHTC = '0'; if(scpH === undefined) scpH = '0'
                            if(scpGH === undefined) scpGH = '0'; if(scpGR === undefined) scpGR = '0'; if(scpHS === undefined) scpHS = '0'
                            if(scpPT === undefined) scpPT = '0'; if(scpPH === undefined) scpPH = '0'; if(scpUNK === undefined) scpUNK = '0'
                            if(scpSKC === undefined) scpSKC = '0'; if(scpTK === undefined) scpTK = '0'; if(scpEXT === undefined) scpEXT = '0'
                            
                            //Status de Mapa do Sobrevivente - Cara, eu n aguento mais, é quase 7 da noite e eu to fazeno isso aqui vsf AAAAAAAAA
                            let dds = gData.DBD_FixSecondFloorGenerator_MapUkr_Saloon; let dw = gData.DBD_FixSecondFloorGenerator_MapAsy_Asylum
                            let my = gData.DBD_FixSecondFloorGenerator_MapSub_Street; let pr = gData.DBD_FixSecondFloorGenerator_MapFin_Hideout
                            let chp = gData.DBD_FixSecondFloorGenerator_MapAsy_Chapel; let fr = gData.DBD_FixSecondFloorGenerator_MapHti_Manor
                            let or = gData.DBD_FixSecondFloorGenerator_MapKny_Cottage; let sr = gData.DBD_FixSecondFloorGenerator_MapHti_Shrine
                            let ms = gData.DBD_FixSecondFloorGenerator_MapBrl_MaHouse; let top = gData.DBD_FixSecondFloorGenerator_MapBrl_Temple
                            let und = gData.DBD_FixSecondFloorGenerator_MapQat_Lab

                            //Caso o status retorne não-existente
                            if(dds === undefined) dds = '0'; if(dw === undefined) dw = '0'; if(my === undefined) my = '0';
                            if(pr === undefined) pr = '0'; if(chp === undefined) chp = '0'; if(fr === undefined) fr = '0';
                            if(sr === undefined) sr = '0'; if(ms === undefined) ms = '0'; if(top === undefined) top = '0';
                            if(und === undefined) und = '0'

                            const survivalPage = new MessageEmbed()
                                .setAuthor(guild.name,guild.iconURL({dynamic: true}))
                                .setTitle(`${lang(guild, "DBD_S")} \`\`\`${summary.nickname}\`\`\``)
                                .setDescription(`${realGameTime} ${lang(guild, "gametime")}`)
                                .addFields(
                                    {name: `${lang(guild, "DBD_P")}`,       value: `\`\`\`${realRankingSurv} ${lang(guild, "points")}\`\`\``},
                                    {name: `${lang(guild, "DBD_R")}`,       value: `\`\`\`${scpKO} ${lang(guild, "times")}\`\`\``},
                                    {name: `${lang(guild, "DBD_H")}`,       value: `\`\`\`${scpH} ${lang(guild, "times")}\`\`\``},
                                    {name: `${lang(guild, "DBD_HT")}`,      value: `\`\`\`${scpHa} ${lang(guild, "times")}\`\`\``},
                                    {name: `${lang(guild, "DBD_ALL")}`,     value: `\`\`\`${scpAllH} ${lang(guild, "times")}\`\`\``},
                                    {name: `${lang(guild, "DBD_INJ")}`,     value: `\`\`\`${scpdD} ${lang(guild, "times")}\`\`\``},
                                    {name: `${lang(guild, "DBD_EI")}`,      value: `\`\`\`${scpAs} ${lang(guild, "times")}\`\`\``},
                                    {name: `${lang(guild, "DBD_HC")}`,      value: `\`\`\`${scpHTC} ${lang(guild, "times")}\`\`\``},
                                    {name: `${lang(guild, "DBD_GH")}`,      value: `\`\`\`${Math.round(scpGR)} ${lang(guild, "times")}\`\`\``},
                                    {name: `${lang(guild, "DBD_HB")}`,      value: `\`\`\`${scpGH} ${lang(guild, "times")}\`\`\``},    
                                    {name: `${lang(guild, "DBD_UNK")}`,     value: `\`\`\`${scpUNK} ${lang(guild, "times")}\`\`\``},
                                    {name: `${lang(guild, "DBD_SKC")}`,     value: `\`\`\`${scpSKC} ${lang(guild, "times")}\`\`\``},
                                )
                                .setColor("RANDOM")
                            const survivalPage2 = new MessageEmbed()
                                .setAuthor(guild.name,guild.iconURL({dynamic: true}))
                                .setTitle(`${lang(guild, "DBD_S")} \`\`\`${summary.nickname}\`\`\``)
                                .setColor("RANDOM")
                                .addFields(
                                    {name: `${lang(guild, "DBD_SH")}`,      value: `\`\`\`${Math.round(scpSH)} ${lang(guild, "times")}\`\`\``},
                                    {name: `${lang(guild, "DBD_HS")}`,      value: `\`\`\`${Math.round(scpHS)} ${lang(guild, "times")}\`\`\``},
                                    {name: `${lang(guild, "DBD_PT")}`,      value: `\`\`\`${scpPT} ${lang(guild, "times")}\`\`\``},
                                    {name: `${lang(guild, "DBD_PHT")}`,     value: `\`\`\`${scpPH} ${lang(guild, "times")}\`\`\``},
                                    {name: `${lang(guild, "DBD_TK")}`,      value: `\`\`\`${scpTK} ${lang(guild, "totens")}\`\`\``},
                                    {name: `${lang(guild, "DBD_EXT")}`,     value: `\`\`\`${scpEXT} ${lang(guild, "times")}\`\`\``},
                                    {name: `${lang(guild, "DBD_HBR")}`,     value: `\`\`\`${scpHBR} ${lang(guild, "times")}\`\`\``},
                                    {name: `${lang(guild, "DBD_DDS")}`,     value: `\`\`\`${dds} ${lang(guild, "times")}\`\`\``},
                                    {name: `${lang(guild, "DBD_PR")}`,      value: `\`\`\`${pr} ${lang(guild,"times")}\`\`\``},
                                    {name: `${lang(guild, "DBD_DW")}`,      value: `\`\`\`${dw} ${lang(guild, "times")}\`\`\``},
                                    {name: `${lang(guild, "DBD_MY")}`,      value: `\`\`\`${my} ${lang(guild, "times")}\`\`\``}, 
                                    {name: `${lang(guild, "DBD_FR")}`,      value: `\`\`\`${fr} ${lang(guild, "times")}\`\`\``}
                                )
                            const survivalPage3 = new MessageEmbed()
                                .setAuthor(guild.name,guild.iconURL({dynamic: true}))
                                .setTitle(`${lang(guild, "DBD_S")} \`\`\`${summary.nickname}\`\`\``)
                                .setColor("RANDOM")
                                .addFields(
                                    {name: lang(guild, "DBD_OR"),           value: `\`\`\`${or} ${lang(guild, "times")}\`\`\``},
                                    {name: lang(guild, "DBD_MS"),           value: `\`\`\`${ms} ${lang(guild, "times")}\`\`\``},
                                    {name: lang(guild, "DBD_ToP"),          value: `\`\`\`${top} ${lang(guild, "times")}\`\`\``},
                                    {name: lang(guild, "DBD_UnD"),          value: `\`\`\`${und} ${lang(guild, "times")}\`\`\``}
                                )
                            pages = [survivalPage, survivalPage2, survivalPage3]
                            page(message, pages)
                    }).catch(err => {
                        const errEmbed = new MessageEmbed()
                            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                            .setDescription(lang(guild, "err"))
                            .setColor("#ff0000")
                            .addFields(
                                {name: `${lang(guild, "err2")}  ${lang(guild, "err_dev")}`, value: `\`\`\`${err}\`\`\``},
                            )
                        message.reply(errEmbed)
                    })
                }).catch(err => {
                    const errEmbed = new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setDescription(lang(guild, "err"))
                        .setColor("#ff0000")
                        .addFields(
                            {name: `${lang(guild, "err2")}  ${lang(guild, "err_dev")}`, value: `\`\`\`${err}\`\`\``},
                        )
                    message.reply(errEmbed)
                })
            }).catch(err => {
                const errEmbed = new MessageEmbed()
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setDescription(lang(guild, "err"))
                    .setColor("#ff0000")
                    .addFields(
                        {name: `${lang(guild, "err2")}  ${lang(guild, "err_dev")}`, value: `\`\`\`${err}\`\`\``},
                    )
                message.reply(errEmbed)
            })
        }).catch(err => {
            const errEmbed = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setDescription(lang(guild, "err"))
                .setColor("#ff0000")
                .addFields(
                    {name: `${lang(guild, "err2")}  ${lang(guild, "err_dev")}`, value: `\`\`\`${err}\`\`\``},
                )
            message.reply(errEmbed)
        })
    }
}