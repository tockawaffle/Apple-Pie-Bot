"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const _wokcommands_1 = require("@wokcommands/");
const embedCreator_1 = require("../../../configs/functions/embedCreator");
const languages_1 = __importStar(require("../../../configs/languages/languages"));
const translations_json_1 = __importDefault(require("../../../configs/languages/translations.json"));
const user_1 = __importDefault(require("../../../configs/db/models/user"));
exports.default = {
    description: "Changes your language between portuguese and english",
    category: "Utility - User Config",
    nameLocalizations: {
        "pt-BR": "idioma",
    },
    descriptionLocalizations: {
        "en-US": "Changes your language between portuguese and english",
        "pt-BR": "Altera seu idioma entre português e inglês",
    },
    type: _wokcommands_1.CommandType.SLASH,
    options: [
        {
            name: "language",
            nameLocalizations: {
                "en-US": "language",
                "pt-BR": "idioma",
            },
            description: "Select your language",
            descriptionLocalizations: {
                "en-US": "Select your language",
                "pt-BR": "Selecione seu idioma.",
            },
            required: true,
            type: 3,
            choices: [
                {
                    name: "Português",
                    value: "portugues",
                },
                {
                    name: "English",
                    value: "english",
                }
            ]
        },
    ],
    callback: ({ interaction, client, args, user }) => __awaiter(void 0, void 0, void 0, function* () {
        const language = args[0].toLowerCase();
        if (!translations_json_1.default.languages.includes(language)) {
            return yield (0, embedCreator_1.embedCreator)({
                embedData: {
                    title: "**❌ Error**",
                    description: `\n${(0, languages_1.default)(user, "languageCh", "error-invalid-language")}`,
                },
                interactionObj: interaction,
            });
        }
        yield user_1.default.findOneAndUpdate({ _id: user.id }, { _id: user.id, account_settings: { language: language } }, { upsert: true });
        (0, languages_1.setUserLanguage)(user, language);
        yield (0, languages_1.loadUserSettings)(client);
        return yield (0, embedCreator_1.embedCreator)({
            embedData: {
                title: "**✅ Success**",
                description: `\n${(0, languages_1.default)(user, "languageCh", "success-language-changed").replace("{0}", language)}`,
                color: 32768,
            },
            interactionObj: interaction,
        });
    }),
};
