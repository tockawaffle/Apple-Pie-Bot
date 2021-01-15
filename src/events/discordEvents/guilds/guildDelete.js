const langSchema = require('../../../configs/db/schemas/language-schema')
const welcomeGSchema = require('../../../configs/db/schemas/wgmsg-schema')
const MemberLeftSchema = require('../../../configs/db/schemas/memberleft-schema')

module.exports = async(client, guild) => {

    const guildId = guild.id
    await langSchema.findOneAndRemove({_id: guildId,},{_id: guildId})
    const gleft = await MemberLeftSchema.findOneAndRemove({_id: guild.id,},{_id: guild.id})
    const gwelcome = await welcomeGSchema.findOneAndRemove({_id: guild.id,},{_id: guild.id})

    if(!gleft) return
    if(!gwelcome) return
}