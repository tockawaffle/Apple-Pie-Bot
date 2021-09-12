const userSchema = require("@db/schemas/userSchema")
const {RateLimiter} = require('discord.js-rate-limiter'); let limiter = new RateLimiter(2, 2000)
const {loadUserLangs} = require("@lang");
module.exports = async(client, messageCreate) => {

    const {author, guild} = messageCreate
    if(author.bot) return

    const checker = await userSchema.findOne({_id: author.id})
    let prefix;
    if(!checker) {
        await userSchema.findOneAndUpdate({_id: author.id, }, {_id: author.id, language: 'english', prefix: process.env.PREFIX}, {upsert: true,})
        await loadUserLangs(client)
        prefix = process.env.PREFIX
    } else { prefix = checker.prefix }
    messageCreate.prefix = prefix
    
    let limited = limiter.take(author.id)
    if(messageCreate.content.startsWith(prefix)) {
        if(limited) return
        else {
            try {
                const [cmdName, ...cmdArgs] = messageCreate.content
                    .slice(prefix.length)
                    .trim()
                    .split(/\s+/);
                if(client.commands.get(cmdName)) {
                    messageCreate.lang = checker.language
                    client.commands.get(cmdName)(client, messageCreate, cmdArgs)
                }
                else return messageCreate.react('<:Command_Not_Found:853407507682295849>') 
            } catch (error) {
                console.log(`Algo estranho aconteceu:\n\n${error}`)
            }
        }
    }
}