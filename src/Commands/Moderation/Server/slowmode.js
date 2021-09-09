const lang = require("@lang")
const {errorHandle} = require("@configs/other/errorHandle")
const {slowmodeAdd} = require("@configs/other/slowmodeAdd")
module.exports = {
    aliases: [],
    run: async(client, messageCreate, args) => {

        const {author, guild} = messageCreate
        const {checkGuild} = require("@configs/other/checkGuild")
        const verify = await checkGuild(messageCreate, author)
        if(verify.verify !== true) return 
        let channel,
            mentionedChannel = messageCreate.mentions.channels.first(),
            channelId = guild.channels.cache.get(args[1]),
            reason = args.slice(3).join(' ')
        if(mentionedChannel) {channel = mentionedChannel}
        else if(channelId) {channel = channelId}

        if(args[0] === "add") {
            try {
                await slowmodeAdd(messageCreate, channel, author, args[2], reason)
            } catch (error) {
                await errorHandle(messageCreate, author, error)
            }
        } else if(args[0] === lang(author, "slowmode-remove")) {
            try {
                await slowmodeAdd(messageCreate, channel, author, `0`, reason)
            } catch (error) {
                await errorHandle(messageCreate, author, error)
            }
        }
    }
}