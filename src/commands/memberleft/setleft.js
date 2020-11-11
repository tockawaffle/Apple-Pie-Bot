const MemberLeftSchema = require('../../../db/schemas/memberleft-schema')
const languages = require('../../util/languages/languages')

const cache = new Map()
const loadData = async() => {
    const results = await MemberLeftSchema.find()

    for(const result of results) {
        cache.set(result._id, result.channelId)
    }
}
loadData()

module.exports = {
    run: async(client, message, args) => {

        const { guild, channel } = message

        if(!message.member.hasPermission('ADMINISTRATOR')) {
            message.reply(`${languages(guild, 'LF_C')}`)
            return
        }

        await MemberLeftSchema.findOneAndUpdate(
            {
                _id: guild.id
            },
            { 
                _id: guild.id,
                channelId: channel.id
            },
            {
                upsert: true
            }
        )

        cache.set(guild.id, channel.id)
        
        message.delete()
        message.reply(`${languages(guild, 'LF_C2')}`).then((message) => {
            message.delete({ timeout: 5000})
        })
        //${languages(guild, 'GW_C2')}

    }, aliases:['lft', 'setlft'], description: 'Member Left Message!'
}

module.exports.getChannelId = (guildId) => {
    return cache.get(guildId)
}