async function unmuteUser(messageCreate, toUnmute, reason) {

    try {
        const 
            {MessageEmbed, Permissions} = require("discord.js"),
            lang = require("@lang"),
            {guild, author} = messageCreate,
            mutedRole = await guild.roles.cache.find(x => x.name === `${lang(author, 'muted-role')}`);
        if(!toUnmute) { throw new Error(`${lang(author, "no-args")}`) }
        if(!guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES && Permissions.FLAGS.MUTE_MEMBERS && Permissions.FLAGS.MANAGE_CHANNELS)) { throw new Error(`${lang(author, "missing-permissions-me").replace("{perms}", `${lang(author, "no-mute-perms")}`)}`) }
        if(!messageCreate.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES && Permissions.FLAGS.MUTE_MEMBERS && Permissions.FLAGS.MANAGE_CHANNELS)) { throw new Error(`${lang(author, "missing-permissions").replace("{perm}", `${lang(author, "no-mute-perms")}`)}`) }
        if(messageCreate.guild.me.roles.highest.position <= toUnmute.roles.highest.position && author.id !== guild.ownerId) throw new Error(`${lang(author, "tomute-has-higher-role-than-me").replace(`{tomute}`, `**${toUnmute.user.username}**`)}`)
        if(!toUnmute.roles.cache.find(x => x.name === `${lang(author, "muted-role")}`)) throw new Error(`${lang(author, "already-muted")}`)

        if(!mutedRole) {
            throw new Error(lang(author, "no-muted-role-to-unmute"))
        } else {
            try {
                await toUnmute.roles.remove(await mutedRole)
                const mutedEmbed = new MessageEmbed()
                    .setAuthor({name: author.username, iconURL: author.displayAvatarURL({dynamic: true})})
                    .setColor("RANDOM")
                    .setTitle(`${lang(author, "success")} ${lang(author, "unmuted-success").replace("{member}", toUnmute.user.username)}`)
                    .setDescription(`${lang(author, "reason")}\`\`\`${reason ? reason: lang(author, "no-reason")}\`\`\``)
                await messageCreate.reply({embeds: [mutedEmbed]})
                await guild.channels.cache.forEach(async(channel, id) => {await channel.permissionOverwrites.create(await mutedRole, {SEND_MESSAGES: false, SPEAK: false, ADD_REACTIONS: false}).catch(error => {})})
            } catch (error) {
                throw new Error(error)
            }
        }
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {unmuteUser}