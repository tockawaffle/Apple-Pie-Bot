const langSchema = require('../../../../db/schemas/language-schema')

module.exports = async(client, guild) => {
    const guildId = guild.id
    await langSchema.findOneAndUpdate(
      {
        _id: guildId,
      },
      {
        _id: guildId,
        language: 'english',
      },
      {
        upsert: true,
      }
    )
}