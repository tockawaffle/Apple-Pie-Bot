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
const canva_1 = require("../../../../configs/commands/misc/canva");
const user_1 = __importDefault(require("../../../../configs/db/models/user"));
const languages_1 = __importDefault(require("../../../../configs/languages/languages"));
exports.default = {
    description: "Shows your marriage in a cute image.",
    category: "Roleplay",
    type: _wokcommands_1.CommandType.SLASH,
    nameLocalizations: {
        "pt-BR": "meu-casamento",
    },
    descriptionLocalizations: {
        "pt-BR": "Mostra seu casamento em uma imagem fofa",
    },
    callback: ({ client, args, interaction, }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const thisUser = interaction.user;
        const checkMarriage = yield user_1.default.findOne({ _id: thisUser.id });
        if (!((_a = checkMarriage === null || checkMarriage === void 0 ? void 0 : checkMarriage.marriedTo) === null || _a === void 0 ? void 0 : _a.user_name)) {
            return interaction.reply({
                content: (0, languages_1.default)(thisUser, "myMarriage", "notMarried"),
            });
        }
        const marriedToId = checkMarriage.marriedTo.user_id;
        const getMarried = client.users.cache.get(marriedToId);
        const attachment = yield (0, canva_1.marriageCanva)(thisUser, getMarried, client);
        return yield interaction.reply({
            files: [attachment],
        });
    }),
};
