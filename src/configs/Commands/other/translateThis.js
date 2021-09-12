async function translateThis(messageCreate, toTranslate) { // translate this, bitch

    const lang = require("@lang")
    const {author} = messageCreate; let from;
    const translate = require("@vitalets/google-translate-api")
    if(messageCreate.lang === "portugues") {from = "pt"}
    else from = messageCreate.lang
    const translator = await translate(toTranslate, {to: from})
    let result = [{
        text: translator.text,
        rawText: translator.raw[0][0],
        pronunciation: translator.pronunciation ? translator.pronunciation: lang(author, "not-provided"),
        autoCorrected: translator.from.text.value ? translator.from.text.value: lang(author, "not-provided")
    }]
    return result
}

module.exports = {translateThis}