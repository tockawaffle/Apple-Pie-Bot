async function requestPancake(messageCreate, token, lang) {

    try {
        const 
            fetch = require("node-fetch"),
            options = {method: "get"},
            fetched = await fetch(`https://api.pancakeswap.info/api/v2/tokens/${token}`, options),
            fetchedJson = await fetched.json();
        return fetchedJson
    } catch (error) {
        throw new Error(`Algo de ruim aconteceu: ${error}`)   
    }
}
module.exports = {requestPancake}