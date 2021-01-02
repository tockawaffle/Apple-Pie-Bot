const PREFIX = process.env.PREFIX
const {RateLimiter} = require('discord.js-rate-limiter')
const languages = require('../../util/languages/languages')
const ids = process.env.ID || process.env.ID2
let rateLimiter = new RateLimiter(1, 3000)

module.exports = async(client, message) => {

    const { guild, channel } = message
    let limited = rateLimiter.take(message.author.id)

    if(message.author.bot) return;
    if(message.channel.type === 'dm' && !ids) return
    if(!channel.permissionsFor(client.user).has('SEND_MESSAGES' && 'EMBED_LINKS')) return

    if(message.content.startsWith(PREFIX)) {
        
        if (limited) {
            return
        } else {
            const [cmdName, ...cmdArgs] = message.content
                .slice(PREFIX.length)
                .trim()
                .split(/\s+/);
            if(client.commands.get(cmdName)) {
                client.commands.get(cmdName)(client, message, cmdArgs)
            }else {
                message.reply(`${languages(guild, 'CMD_EV')}  **'-${cmdName}'** ${languages(guild, 'CMD_EV_2')}`);
                message.channel.send(process.env.NKCF);
            }
        }

    }
}