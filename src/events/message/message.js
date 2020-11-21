const PREFIX = process.env.PREFIX

    const languages = require('../../util/languages/languages')
    // const userIdSchema = require('../../../db/schemas/userid-schema')

module.exports = async(client, message) => {

    if(message.author.bot) return;

    const { guild, channel } = message
    if(!channel.permissionsFor(client.user).has('SEND_MESSAGES')) return
    // No need to use it rn.
    // await userIdSchema.findOneAndUpdate({
    //     _id: message.author.id
    // },  
    // {
    //     $inc: {
    //         messageCount: 1,
    //     },
    // },
    // {
    //     upsert: true
    // })

    if(!message.content.startsWith(PREFIX)) return;
    let cmdName = message.content.substring(message.content.indexOf(PREFIX)+1).split(new RegExp(/\s+/)).shift()
    let argsToParse = message.content.substring(message.content.indexOf(' ')+1);

    if(client.commands.get(cmdName)) {
        client.commands.get(cmdName)(client, message, argsToParse)
    }
    else {
        message.reply(`${languages(guild, 'CMD_EV')}  **'-${cmdName}'** ${languages(guild, 'CMD_EV_2')}`);
        message.channel.send(process.env.NKCF);
    }
}