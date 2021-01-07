const langSchema = require('../../../../db/schemas/language-schema')
const welcomeGSchema = require('../../../../db/schemas/wgmsg-schema')
const MemberLeftSchema = require('../../../../db/schemas/memberleft-schema')

module.exports = async(client, guild) => {

    const guildId = guild.id
    await langSchema.findOneAndRemove({_id: guildId,},{_id: guildId})
    const gleft = await MemberLeftSchema.findOneAndRemove({_id: guild.id,},{_id: guild.id})
    const gwelcome = await welcomeGSchema.findOneAndRemove({_id: guild.id,},{_id: guild.id})

    if(!gleft) return
    if(!gwelcome) return
}