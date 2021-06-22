const {RateLimiter} = require('discord.js-rate-limiter'); let limiter = new RateLimiter(2, 2000)
const guildSchema = require('../../../configs/db/schemas/guildSchema')

module.exports = async(client, message) => {
    
    if(message.author.bot) return
    const {guild, author} = message

    let dbPrefix = await guildSchema.findOne({_id: guild.id})
    let PREFIX;
    if(!dbPrefix.prefix) {
        PREFIX = process.env.PREFIX
    } else {PREFIX = dbPrefix.prefix}

    if(!dbPrefix.name) {
        await guildSchema.findOneAndUpdate({_id: guild.id}, {_id: guild.id, name: guild.name, language: 'english', prefix: process.env.PREFIX}, {upsert: true})
    }
    message.prefix = PREFIX

    let limited = limiter.take(author.id)
    
    if(message.channel.type === 'dm' && !ids) return
    if(message.content.startsWith(PREFIX)) {
        if (limited) return 
        else {
            try {
               const [cmdName, ...cmdArgs] = message.content
                    .slice(PREFIX.length)
                    .trim()
                    .split(/\s+/);
                if(client.commands.get(cmdName)) {client.commands.get(cmdName)(client, message, cmdArgs)}
                else return message.react('<:Command_Not_Found:853407507682295849>') 
            } catch (error) {
                console.log(`Algo estranho aconteceu:\n\n${error}`)
            }
            
        }
    }
}
