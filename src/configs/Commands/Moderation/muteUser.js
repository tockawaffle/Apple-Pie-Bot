async function muteUser(client, messageCreate, toMute, reason) {

    try {
        const 
            {MessageEmbed, Permissions} = require("discord.js"),
            lang = require("@lang"),
            {guild, author} = messageCreate,
            mutedRole = await guild.roles.cache.find(x => x.name === `${lang(author, 'muted-role')}`);
        if(!toMute) { throw new Error(`${lang(author, "no-args")}`) }
        if(!guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES && Permissions.FLAGS.MUTE_MEMBERS && Permissions.FLAGS.MANAGE_CHANNELS)) { throw new Error(`${lang(author, "missing-permissions-me").replace("{perms}", `${lang(author, "no-mute-perms")}`)}`) }
        if(!messageCreate.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES && Permissions.FLAGS.MUTE_MEMBERS && Permissions.FLAGS.MANAGE_CHANNELS)) { throw new Error(`${lang(author, "missing-permissions").replace("{perm}", `${lang(author, "no-mute-perms")}`)}`) }
        if(author.id === toMute.id) throw new Error(`${lang(author, "same-id-mute")}`)
        if(toMute === guild.ownerId) throw new Error(`${lang(author, "owner-mute")}`)
        if(messageCreate.member.roles.highest.position <= toMute.roles.highest.position && author.id !== guild.ownerId) throw new Error(`${lang(author, "tomute-has-higher-role").replace(`{tomute}`, `**${toMute.user.username}**`)}`)
        if(messageCreate.guild.me.roles.highest.position <= toMute.roles.highest.position && author.id !== guild.ownerId) throw new Error(`${lang(author, "tomute-has-higher-role-than-me").replace(`{tomute}`, `**${toMute.user.username}**`)}`)
        if(toMute.id === client.user.id) throw new Error(`${lang(author, "mute-me")}`)
        if(toMute.roles.cache.find(x => x.name === `${lang(author, "muted-role")}`)) throw new Error(`${lang(author, "already-muted")}`)

        if(!mutedRole) {
            try {
                const createdRole = await guild.roles.create({name: lang(author, "muted-role"), color: "BLACK", reason: lang(author, "muted-role-reason")})
                await toMute.roles.add(await createdRole)
                const mutedEmbed = new MessageEmbed()
                    .setAuthor({name: author.username, iconURL: author.displayAvatarURL({dynamic: true})})
                    .setColor("RANDOM")
                    .setTitle(`${lang(author, "success").replace("{member}", toMute.user.username)}`)
                messageCreate.reply({embeds: [mutedEmbed]})
                await guild.channels.cache.forEach(async(channel, id) => {await channel.permissionOverwrites.create(await createdRole, {SEND_MESSAGES: false, SPEAK: false, ADD_REACTIONS: false})})
            } catch (error) {
                throw new Error(error)
            }
        } else {
            try {
                await toMute.roles.add(await mutedRole)
                const mutedEmbed = new MessageEmbed()
                    .setAuthor({name: author.username, iconURL: author.displayAvatarURL({dynamic: true})})
                    .setColor("RANDOM")
                    .setTitle(`${lang(author, "success")} ${lang(author, "muted-success").replace("{member}", toMute.user.username)}`)
                    .setDescription(`${lang(author, "reason")}\`\`\`${reason ? reason: lang(author, "no-reason")}\`\`\``)
                messageCreate.reply({embeds: [mutedEmbed]})
                await guild.channels.cache.forEach(async(channel, id) => {await channel.permissionOverwrites.create(await mutedRole, {SEND_MESSAGES: false, SPEAK: false, ADD_REACTIONS: false}).catch(error => {})})
            } catch (error) {
                throw new Error(error)
            }
    }
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {muteUser}