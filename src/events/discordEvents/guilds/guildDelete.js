const guildSchema = require('../../../configs/db/schemas/guildSchema')

module.exports = async(client, guild) => {
    const guildId = guild.id
    await guildSchema.findOneAndRemove({_id: guildId},{_id: guildId})
}