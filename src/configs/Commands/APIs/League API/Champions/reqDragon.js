async function reqDragon(champion, messageCreate) {

    const  
        { default: fetch } = require('node-fetch'),
        {author, nominalLang} = messageCreate,
        lang = require("@lang"),
        not_found_error = lang(author, "champ-err-notfound"),
        req = await fetch(`https://ddragon.leagueoflegends.com/cdn/12.1.1/data/${nominalLang}/champion/${champion}.json`),
        reqJson = await req.json(),
        data = reqJson.data[champion],
        dragonResponse = {
            presentation: {
                name: data.name ? data.name : not_found_error,
                title: data.title ? data.title : not_found_error,
                lore: data.lore ? data.lore : not_found_error,
                allytips: data.allytips ? data.allytips : not_found_error,
                enemytips: data.enemytips ? data.enemytips : not_found_error,
            },
            stats: {
                hp: data.stats.hp ? data.stats.hp : not_found_error,
                hpperlevel: data.stats.hpperlevel ? data.stats.hpperlevel : not_found_error,
                hpregen: data.stats.hpregen ? data.stats.hpregen : not_found_error,
                hpregenperlevel: data.stats.hpregenperlevel ? data.stats.hpregenperlevel : not_found_error,
                mp: data.stats.mp ? data.stats.mp : not_found_error,
                mpperlevel: data.stats.mpperlevel ? data.stats.mpperlevel : not_found_error,
                mpregen: data.stats.mpregen ? data.stats.mpregen : not_found_error,
                mpregenperlevel: data.stats.mpregenperlevel ? data.stats.mpregenperlevel : not_found_error,
                movespeed: data.stats.movespeed ? data.stats.movespeed : not_found_error,
                armor: data.stats.armor ? data.stats.armor : not_found_error,
                armorperlevel: data.stats.armorperlevel ? data.stats.armorperlevel : not_found_error,
                spellblock: data.stats.spellblock ? data.stats.spellblock : not_found_error,
                spellblockperlevel: data.stats.spellblockperlevel ? data.stats.spellblockperlevel : not_found_error,
                attackdamage: data.stats.attackdamage ? data.stats.attackdamage : not_found_error,
                attackdamageperlevel: data.stats.attackdamageperlevel ? data.stats.attackdamageperlevel : not_found_error,
            },
            spells: {
                q: {
                    name: data.spells[0].name ? data.spells[0].name : not_found_error,
                    description: data.spells[0].description ? data.spells[0].description : not_found_error,
                },
                w: {
                    name: data.spells[1].name ? data.spells[1].name : not_found_error,
                    description: data.spells[1].description ? data.spells[1].description : not_found_error,
                },
                e: {
                    name: data.spells[2].name ? data.spells[2].name : not_found_error,
                    description: data.spells[2].description ? data.spells[2].description : not_found_error,
                },
                r: {
                    name: data.spells[3].name ? data.spells[3].name : not_found_error,
                    description: data.spells[3].description ? data.spells[3].description : not_found_error,
                },
                passive: {
                    name: data.passive.name ? data.passive.name : not_found_error,
                    description: data.passive.description ? data.passive.description : not_found_error,
                }
            }
        }
    return dragonResponse
}

module.exports = {reqDragon}