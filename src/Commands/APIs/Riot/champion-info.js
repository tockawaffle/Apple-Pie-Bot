
module.exports = {
    aliases: ["chinfo", "champ", "cinfo"],
    run: async(client, messageCreate, args) => {
        
        const 
            {filterChamps} = require("@configs/APIs/League API/Champions/champListFilter.js"),
            {reqDragon} = require("@configs/APIs/League API/Champions/reqDragon.js"),
            {errorHandle} = require("@configs/other/errorHandle"),

            filtered = await filterChamps(args)
        if(filtered === null) {
            await errorHandle(messageCreate, null, "champion not found")
        } else {
            const requisit_A_Dragon = await reqDragon(filtered, messageCreate)
            console.log(requisit_A_Dragon)
        }
    }
}