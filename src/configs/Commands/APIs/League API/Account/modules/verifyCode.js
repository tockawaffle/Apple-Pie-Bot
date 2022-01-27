const {default: fetch} = require("node-fetch")

async function verifyCode(encryptedSummonerId, verificationCode, messageCreate) {
    let errReq
    const
        {author} = messageCreate,
        lang = require("@lang"),
        req = await fetch(`https://br1.api.riotgames.com/lol/platform/v4/third-party-code/by-summoner/${encryptedSummonerId}?api_key=${process.env.RIOT_API_KEY}`)
    if(req.status !== 404)  {
        const reqjson = await req.json()
        if(reqjson === verificationCode) {
            return true
        } else return false
    } else throw new Error("Missing Verification Code")

}

module.exports = {verifyCode}