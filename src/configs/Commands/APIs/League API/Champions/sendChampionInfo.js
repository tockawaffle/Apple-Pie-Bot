async function sendChampionInfo(messageCreate, args) {
    const 
        {filterChamps} = require("./champListFilter.js"),
        {reqDragon} = require("./reqDragon.js"),
        {errorHandle} = require("@configs/other/errorHandle"),

        filtered = await filterChamps(args)
    if(filtered === null) {
        await errorHandle(messageCreate, null, lang(author, "champ-err-char-notfound").replace("{name}", args[0]))
    } else {
        const requisit_A_Dragon = await reqDragon(filtered, messageCreate)
        console.log(requisit_A_Dragon)
    }
}

module.exports = {sendChampionInfo}