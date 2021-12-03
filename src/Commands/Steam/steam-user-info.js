const 
    { errorHandle } = require("@configs/other/errorHandle"),
    { getInfoWithURL } = require("@configs/APIs/Steam/GetInfo/getInfoWithURL"),
    { getInfoWithId } = require("@configs/APIs/Steam/GetInfo/getInfoWithID"),
    { getInfoWithDB } = require("@configs/APIs/Steam/GetInfo/getInfoWithDB");

module.exports = {
    aliases: ["sinfo"],
    run: async (client, messageCreate, args) => {
        const 
            {author} = messageCreate;
            input = args[0]

        if(!input) {
            try { return await getInfoWithDB(client, messageCreate) }
            catch (error) {
                if(error.message === "Unauthorized") { return await errorHandle(messageCreate, author, "Either this profile is private or doesn't exist!"); } 
                else { return await errorHandle(messageCreate, author, error); }
            }
        }else if(input.match(/(?:https?:\/\/)?steamcommunity\.com\/(?:profiles|id)\/[a-zA-Z0-9]+/g)) {
            try { await getInfoWithURL(client, messageCreate, args[0]); } 
            catch (error) {
                if(error.message === "Unauthorized") { return await errorHandle(messageCreate, author, "Either this profile is private or doesn't exist!"); } 
                else { return await errorHandle(messageCreate, author, error); }
            }
        } else {
            try { await getInfoWithId(client, messageCreate, args[0]); }
            catch (error) {
                if(error.message === "Unauthorized") { return await errorHandle(messageCreate, author, "Either this profile is private or doesn't exist!"); } 
                else { return await errorHandle(messageCreate, author, error); }
            }
        }
    }
}