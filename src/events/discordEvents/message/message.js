const {RateLimiter} = require('discord.js-rate-limiter')
let limiter = new RateLimiter(2, 2000)
const newPrefixSchema = require('../../../configs/db/schemas/prefix-schema')
module.exports = async(client, message) => {
    
    if(message.author.bot) return
    const {guild, author} = message
    let settings = await newPrefixSchema.findOne({_id: guild.id,}, (err, _id) => {if(!_id) {
        const newGuild = new newPrefixSchema({_id:message.guild.id, prefix: process.env.PREFIX})
        newGuild.save()
        return
    }})
    let PREFIX = settings.prefix

    let limited = limiter.take(author.id)

    const clientMention = message.mentions.has(client.user)
    
    if(message.channel.type === 'dm' && !ids) return
    if(message.content.startsWith(PREFIX)) {
        if (limited) return
        else {
            const [cmdName, ...cmdArgs] = message.content
                .slice(PREFIX.length)
                .trim()
                .split(/\s+/);
            if(client.commands.get(cmdName)) {client.commands.get(cmdName)(client, message, cmdArgs)}
            else return
        }
    }
}