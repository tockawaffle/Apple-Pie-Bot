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
exports.setUserLanguage = exports.loadUserSettings = void 0;
const discord_js_1 = require("discord.js");
const user_1 = __importDefault(require("../db/models/user"));
const translations_json_1 = __importDefault(require("./translations.json"));
const userLanguage = {};
function loadUserSettings(client) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const users of client.users.cache) {
            const userId = users[0], result = yield user_1.default.findOne({ _id: userId });
            userLanguage[userId] = result
                ? result.account_settings.language
                : yield user_1.default.findOneAndUpdate({ _id: userId }, {
                    _id: userId,
                    account_settings: {
                        language: "english",
                    },
                }, { upsert: true });
        }
    });
}
exports.loadUserSettings = loadUserSettings;
function setUserLanguage(user, languages) {
    userLanguage[user.id] = languages;
}
exports.setUserLanguage = setUserLanguage;
exports.default = (user, commandName, textId) => {
    const t = translations_json_1.default.traduzido;
    let u;
    if (!user)
        throw new Error(`argument "user" missing`);
    if (user instanceof discord_js_1.User) {
        u = user;
    }
    else
        throw new Error(`Invalid argument: user, not an instance of the class "User"`);
    if (!t[commandName][textId]) {
        throw new Error(`Text ID: ${textId} is undefined`);
    }
    const selectedLanguage = userLanguage[u.id];
    return t[commandName][textId][selectedLanguage];
};
