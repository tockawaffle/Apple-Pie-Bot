const PREFIX = process.env.PREFIX
const languages = require('../../util/languages/languages')
const ids = process.env.ID || process.env.ID2

module.exports = async(client, message) => {

    if(message.author.bot) return;
    const { guild, channel } = message
    if(message.channel.type === 'dm' && !ids) {
        message.reply('Sorry, I might not be able do to something here, so please, invoke my commands in a server!')
        return
    }
    if(!channel.permissionsFor(client.user).has('SEND_MESSAGES' && 'EMBED_LINKS')) return

    if(message.content.startsWith(PREFIX)) {
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