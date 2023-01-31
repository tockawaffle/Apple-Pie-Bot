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
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
require("dotenv/config");
require("module-alias/register");
const discord_js_1 = require("discord.js");
const client_1 = require("./configs/bot/client");
const registerEvents_1 = require("./configs/bot/functions/registerEvents");
exports.client = new discord_js_1.Client(client_1.clientOptions);
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, registerEvents_1.registerDiscordEvents)(exports.client, "../events/discord");
    exports.client.login(process.env.DISCORD_TOKEN);
}))();
