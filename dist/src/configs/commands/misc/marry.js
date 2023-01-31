"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectRandomImage = void 0;
const married = [];
function selectRandomImage() {
    return married[Math.floor(Math.random() * married.length)];
}
exports.selectRandomImage = selectRandomImage;
