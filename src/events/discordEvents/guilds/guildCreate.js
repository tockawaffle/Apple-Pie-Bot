
const prefixSchema = require('../../../configs/db/schemas/prefix-schema')
const langSchema = require('../../../configs/db/schemas/language-schema')
const { loadLangs } = require('../../../util/languages/languages')

module.exports = async(client, guild) => {
    const guildId = guild.id
    await langSchema.findOneAndUpdate({_id: guildId,},{_id: guildId, language: 'english',},{upsert: true,})
    await prefixSchema.findOneAndUpdate({_id: guild.id}, {_id: guildId, prefix: process.env.PREFIX}, {upsert:true})
    loadLangs(client)
}