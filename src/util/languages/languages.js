const mongoose = require('../../configs/db/db')
const langSchema = require('../../configs/db/schemas/language-schema')
const languages = require('./languages.json')

const guildLanguages = {}
const loadLangs = async(client) => {
    await mongoose.then(async mongoose => {
        for (const guild of client.guilds.cache) {
            const guildId = guild[0]

            const result = await langSchema.findOne({
                _id: guildId,
            })
            guildLanguages[guildId] = result ? result.language : await langSchema.findOneAndUpdate({_id: guildId, }, {_id: guildId, language: 'english',}, {upsert: true,})
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