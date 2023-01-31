"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectRandomImage = void 0;
const hugs = [
    "https://media.tenor.com/8o4fWGwBY1EAAAAd/aharensan-aharen.gif",
    "https://media.tenor.com/J7eGDvGeP9IAAAAC/enage-kiss-anime-hug.gif",
    "https://media.tenor.com/b3Qvt--s_i0AAAAC/hugs.gif",
    "https://media.tenor.com/uCYf6ApjTOoAAAAC/hug-animated.gif",
    "https://media.tenor.com/5Ob_5GPPdhwAAAAM/hug.gif",
    "https://media.tenor.com/XLWytMsrNy8AAAAC/kaioura-anime-girl.gif",
    "https://media.tenor.com/frwNjRFr_cYAAAAM/hugs-cute.gif",
    "https://media.tenor.com/g3arBv4Uek0AAAAd/anhe-nom.gif"
];
function selectRandomImage() {
    return hugs[Math.floor(Math.random() * hugs.length)];
}
exports.selectRandomImage = selectRandomImage;
