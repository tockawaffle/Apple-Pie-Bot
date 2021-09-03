const userSchema = require("@db/schemas/userSchema")
const languages = require('./languages.json')

const userLanguage = {}
const loadUserLangs = async(client) => {
    for (const users of client.users.cache) {
        const userId = users[0]
        const result = await userSchema.findOne({_id: userId})
        userLanguage[userId] = result ? result.language : await userSchema.findOneAndUpdate({_id: userId, }, {_id: userId, language: 'english', prefix: process.env.PREFIX}, {upsert: true,})
    }
}

const setUserLanguage = (user, languages) => {
    userLanguage[user.id] = languages
}

module.exports = (user, textId) => {
    if(!languages.traduções[textId]) {throw new Error(`ID de texto não definido: ${textId}`)}

    const selectedLanguage = userLanguage[user.id]

    return languages.traduções[textId][selectedLanguage]
}

module.exports.loadUserLangs = loadUserLangs
module.exports.setUserLanguage = setUserLanguage