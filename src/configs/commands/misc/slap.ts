const slaps = [
    "https://media.tenor.com/XiYuU9h44-AAAAAC/anime-slap-mad.gif",
    "https://media.tenor.com/HueTCrExODkAAAAC/slap.gif",
    "https://media.tenor.com/Ao52XTMY1RcAAAAM/slap.gif",
    "https://media.tenor.com/8f8ciLp9_T0AAAAM/anime-slap.gif",
    "https://media.tenor.com/E3OW-MYYum0AAAAC/no-angry.gif",
    "https://media.tenor.com/WYmal-WAnksAAAAd/yuzuki-mizusaka-nonoka-komiya.gif",
    "https://media.tenor.com/qvvKGZhH0ysAAAAC/anime-girl.gif",
    "https://media.tenor.com/rVXByOZKidMAAAAM/anime-slap.gif"
]

export function selectRandomImage(): string {
    return slaps[Math.floor(Math.random() * slaps.length)]
}