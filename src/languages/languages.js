const mongoose = require('../../db/db')
const langSchema = require('../../db/schemas/language-schema')
const languages = require('./languages.json')

const guildLanguages = {}
const loadLangs = async(client) => {
    await mongoose.then(async mongoose => {
        try {
            for (const guild of client.guilds.cache) {
                const guildId = guild[0]

                const result = await langSchema.findOne({
                    _id: guildId,
                })
                guildLanguages[guildId] = result ? result.language: 'portugues'
            }
        } catch(err) {
            console.log(err)
        }
    })
}

const setLanguage = (guild, languages) => {
    guildLanguages[guild.id] = languages
}

module.exports = (guild, textId) => {
    if(!languages.traduções[textId]) {
        throw new Error(`ID de texto não definido: ${textId}`)
    }

    const selectedLanguage = guildLanguages[guild.id]

    return languages.traduções[textId][selectedLanguage]
}

module.exports.loadLangs = loadLangs
module.exports.setLanguage = setLanguage