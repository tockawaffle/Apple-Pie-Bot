
const kisses = [
    "https://cdn.discordapp.com/attachments/883861241838317618/883861328354238476/kiss.gif",
    "https://cdn.discordapp.com/attachments/883861241838317618/883861332645019688/kiss1.gif",
    "https://cdn.discordapp.com/attachments/883861241838317618/883861330858238012/kiss2.gif",
    "https://cdn.discordapp.com/attachments/883861241838317618/883861331944570900/kiss3.gif",
    "https://cdn.discordapp.com/attachments/883861241838317618/883861333097996298/kiss4.gif",
    "https://cdn.discordapp.com/attachments/883861241838317618/883861332858900510/kiss5.gif",
    "https://cdn.discordapp.com/attachments/883861241838317618/883861334675038208/kiss6.gif",
    "https://cdn.discordapp.com/attachments/883861241838317618/883861335711035423/kiss7.gif",
    "https://cdn.discordapp.com/attachments/883861241838317618/883861336369537054/kiss8.gif",
    "https://cdn.discordapp.com/attachments/883861241838317618/883861381835804692/kiss9.gif",
    "https://cdn.discordapp.com/attachments/883861241838317618/883861367067648030/kiss10.gif",
    "https://cdn.discordapp.com/attachments/883861241838317618/883861324466106398/kiss11.gif",
    "https://cdn.discordapp.com/attachments/883861241838317618/883862482467311626/kiss12.gif"
]



function selectRandomImage() {
    return kisses[Math.floor(Math.random() * kisses.length)]
}
function selectRandomQuotes(author, mentioned) {
    const lang = require("@lang")
    const quotes = [
        lang(author, "kiss-quote-1").replace("{author}", author.username).replace("{mention}", mentioned.username),
        lang(author, "kiss-quote-2").replace("{author}", author.username).replace("{mention}", mentioned.username),
        lang(author, "kiss-quote-3").replace("{author}", author.username).replace("{mention}", mentioned.username),
        lang(author, "kiss-quote-4").replace("{author}", author.username).replace("{mention}", mentioned.username),
        lang(author, "kiss-quote-5").replace("{author}", author.username).replace("{mention}", mentioned.username), 
    ]
    return quotes[Math.floor(Math.random() * quotes.length)]
}
module.exports = {selectRandomImage, selectRandomQuotes}