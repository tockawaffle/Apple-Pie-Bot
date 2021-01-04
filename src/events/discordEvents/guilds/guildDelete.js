const langSchema = require('../../../../db/schemas/language-schema')

module.exports = async(client, guild) => {
    const guildId = guild.id
    await langSchema.findOneAndRemove(
      {
        _id: guildId,
      },
      {
        _id: guildId,
        language: 'english',
      }
    )
}