async function filterAliases(messageCreate, tokenToFilter, author) {
    const 
        aliases = require('./aliases.json'),
        lang = require("@lang");
    if(!tokenToFilter) {
        const noAlias = new MessageEmbed()
            .setAuthor(author.username, author.displayAvatarURL({dynamic:true}))
            .setColor("DARK_RED")
            .setDescription(`${lang(author, "noAlias")}`)
        return messageCreate.reply({embeds: [noAlias]})
    }
    const filtered = aliases.filter(alias => (
        tokenToFilter.includes(alias.aliases)
    )).map(alias => alias.api)
    if(filtered) return filtered
    else return tokenToFilter
}

module.exports = {filterAliases}