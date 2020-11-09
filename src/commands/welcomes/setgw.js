const welcomeGSchema = require('../../../db/schemas/wgmsg-schema')
const languages = require('../../languages/languages')

const cache = new Map()
const loadData = async() => {
    const results = await welcomeGSchema.find()

    for(const result of results) {
        cache.set(result._id, result.channelId)
    }
}
loadData()

module.exports = {
    run: async(client, message, args) => {

        const { guild, channel } = message

        if(!message.member.hasPermission('ADMINISTRATOR')) {
            message.reply(`${languages(guild, 'GW_C')}`)
            return
        }

        await welcomeGSchema.findOneAndUpdate(
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
        
        message.reply(`${languages(guild, 'GW_C2')}`)

    }, aliases:['sgw'], description: 'Welcome message!'
}

module.exports.getChannelId = (guildId) => {
    return cache.get(guildId)
}