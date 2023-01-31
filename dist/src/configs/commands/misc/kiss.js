"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectRandomImage = void 0;
const kisses = [
    "https://media.tenor.com/fiafXWajQFoAAAAC/kiss-anime.gif",
    "https://media.tenor.com/ffvFDpgRJZUAAAAC/cute-cute-kiss.gif",
    "https://media.tenor.com/jnndDmOm5wMAAAAC/kiss.gif",
    "https://media.tenor.com/OjcDtiEDUvMAAAAM/friendly-kiss.gif",
    "https://media.tenor.com/wQyttVAvkF0AAAAd/forehead-kiss-anime.gif",
    "https://media.tenor.com/iugZzSdGdqMAAAAM/anime-couple-kiss-anime.gif",
    "https://media.tenor.com/vmrR0VoDVRkAAAAC/blow-kiss-anime-blow-kiss.gif",
    "https://media.tenor.com/pHp4ht0fO4YAAAAC/yuri.gif",
    "https://media.tenor.com/jN35LrknUpkAAAAC/test.gif",
    "https://media.tenor.com/h1ISd1PmG0sAAAAC/surrender-kiss.gif",
    "https://media.tenor.com/rb7MVUBNdQMAAAAC/gay-kiss.gif"
];
function selectRandomImage() {
    return kisses[Math.floor(Math.random() * kisses.length)];
}
exports.selectRandomImage = selectRandomImage;
