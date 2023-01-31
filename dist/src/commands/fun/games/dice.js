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
const _wokcommands_1 = require("@wokcommands/");
const languages_1 = __importDefault(require("../../../configs/languages/languages"));
exports.default = {
    category: "Games",
    description: "Rolls a dice.",
    nameLocalizations: {
        "pt-BR": "dado",
    },
    descriptionLocalizations: {
        "en-US": "Rolls a dice.",
        "pt-BR": "Rola um dado.",
    },
    type: _wokcommands_1.CommandType.SLASH,
    callback: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        yield interaction.reply({ content: (0, languages_1.default)(interaction.user, "dice", "rolling") });
        setTimeout(() => {
            return interaction.editReply({
                content: (0, languages_1.default)(interaction.user, "dice", "rolled").replace("{0}", (Math.floor(Math.random() * 25) + 1).toString()),
            });
        }, 2000);
    }),
};
