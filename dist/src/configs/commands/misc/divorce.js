"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectRandomImage = void 0;
const divorce = [];
function selectRandomImage() {
    return divorce[Math.floor(Math.random() * divorce.length)];
}
exports.selectRandomImage = selectRandomImage;
