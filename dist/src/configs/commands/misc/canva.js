"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInfoCanva = exports.marriageCanva = void 0;
const canvas_1 = require("@napi-rs/canvas");
const discord_js_1 = require("discord.js");
const undici_1 = require("undici");
const user_1 = __importDefault(require("../../db/models/user"));
const path_1 = __importDefault(require("path"));
function selectRandomColor() {
    const colorsHexes = [
        "#25b5af",
        "#111111",
        "#85144b",
        "#f012be",
        "#b10dc9",
        "#39cccc",
        "#7fdbff",
        "#110378",
        "#006666",
        "#c6093b",
        "#e2b8ff",
        "#c67cfb",
        "#b76aed",
        "#fb8a8a",
        "#ffa4a4"
    ];
    return colorsHexes[Math.floor(Math.random() * colorsHexes.length)];
}
function marriageCanva(user1, user2, client) {
    return __awaiter(this, void 0, void 0, function* () {
        const canvas = (0, canvas_1.createCanvas)(1920, 1080);
        const context = canvas.getContext("2d");
        const userDb = yield user_1.default.findOne({ _id: user1.id });
        const customBackground = userDb.account_settings.customMarriageBackgroundName;
        let bg;
        if (customBackground) {
            bg = path_1.default.join("src/configs/images/custom/marriages/" + customBackground + ".jpg");
        }
        else {
            bg = path_1.default.join("src/configs/images/defaults/marriedBackground.jpg");
        }
        const background = yield (0, canvas_1.loadImage)(bg);
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        context.strokeStyle = selectRandomColor();
        context.strokeRect(0, 0, canvas.width, canvas.height);
        const { body: user1Avatar } = yield (0, undici_1.request)(client.users.cache.get(user1.id).displayAvatarURL({ forceStatic: true, size: 1024 }));
        const { body: user2Avatar } = yield (0, undici_1.request)(client.users.cache.get(user2.id).displayAvatarURL({ forceStatic: true, size: 1024 }));
        const userOneAvatar = new canvas_1.Image();
        userOneAvatar.src = Buffer.from(yield user1Avatar.arrayBuffer());
        const userTwoAvatar = new canvas_1.Image();
        userTwoAvatar.src = Buffer.from(yield user2Avatar.arrayBuffer());
        yield (0, canvas_1.loadImage)(userTwoAvatar).then((image) => {
            context.restore();
            context.beginPath();
            context.arc(1620, 540, 200, 0, Math.PI * 2, true);
            context.save();
            context.clip();
            context.drawImage(image, 1420, 340, 400, 400);
        });
        yield (0, canvas_1.loadImage)(userOneAvatar).then((image) => {
            context.restore();
            context.beginPath();
            context.arc(300, 540, 200, 0, Math.PI * 2, true);
            context.closePath();
            context.save();
            context.clip();
            context.drawImage(image, 100, 340, 400, 400);
        });
        canvas_1.GlobalFonts.registerFromPath(path_1.default.join("src/configs/fonts/DancingScript/DancingScript-Bold.ttf"), "dancing");
        context.restore();
        context.font = "bold 100px dancing";
        context.fillStyle = "#ff3377";
        context.textAlign = "center";
        context.fillText(user1.username, 300, 900);
        context.fillText(user2.username, 1620, 900);
        context.fillText(userDb.marriedTo.marryDate, 960, 700);
        context.font = "bold 150px dancing";
        context.fillText("💘", 960, 540);
        return new discord_js_1.AttachmentBuilder(canvas.toBuffer("image/jpeg"), {
            name: "marriage.jpg",
        });
    });
}
exports.marriageCanva = marriageCanva;
function userInfoCanva(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const canvas = (0, canvas_1.createCanvas)(1920, 1080);
        const context = canvas.getContext("2d");
        const userDb = yield user_1.default.findOne({ _id: user.id });
        const customBackground = userDb.account_settings.customMarriageBackgroundName;
        let bg;
        if (customBackground) {
            bg = path_1.default.join("src/configs/images/custom/profiles/" + customBackground + ".jpg");
        }
        else {
            bg = path_1.default.join("src/configs/images/defaults/profileBackground.jpg");
        }
        const background = yield (0, canvas_1.loadImage)(bg);
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        context.strokeStyle = selectRandomColor();
        context.strokeRect(0, 0, canvas.width, canvas.height);
    });
}
exports.userInfoCanva = userInfoCanva;
