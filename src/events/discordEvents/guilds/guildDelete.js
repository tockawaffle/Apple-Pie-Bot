const langSchema = require('../../../configs/db/schemas/language-schema')
const prefixSchema = require('../../../configs/db/schemas/prefix-schema')

module.exports = async(client, guild) => {

    const guildId = guild.id
    await langSchema.findOneAndRemove({_id: guildId,},{_id: guildId})
    await prefixSchema.findOneAndRemove({_id: guild.id}, {_id: guildId})

}