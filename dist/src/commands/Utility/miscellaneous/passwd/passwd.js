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
const discord_js_1 = require("discord.js");
const passwd_1 = __importDefault(require("../../../../configs/db/models/passwd"));
const languages_1 = __importDefault(require("../../../../configs/languages/languages"));
exports.default = {
    description: "Stores your password in a secure database. (Restricted Command)",
    type: _wokcommands_1.CommandType.SLASH,
    category: "Utility - Misc",
    nameLocalizations: {
        "pt-BR": "passwd",
    },
    descriptionLocalizations: {
        "pt-BR": "Armazena sua senha em um banco de dados seguro. (Comando Restrito)",
        "en-US": "Stores your password in a secure database (Restricted Command)",
    },
    callback: ({ interaction, user, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const allowed = ["876578406144290866"];
        if (!allowed.includes(user.id)) {
            interaction.reply((0, languages_1.default)(user, "passwd", "restricted"));
        }
        const masterKey = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.TextInputBuilder({
            custom_id: "master_key",
            placeholder: (0, languages_1.default)(user, "passwd", "master-key"),
            label: (0, languages_1.default)(user, "passwd", "master-key"),
            required: true,
            style: discord_js_1.TextInputStyle.Short,
        }));
        const accName = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.TextInputBuilder({
            custom_id: "account_name",
            placeholder: (0, languages_1.default)(user, "passwd", "account-name"),
            label: (0, languages_1.default)(user, "passwd", "account-name"),
            required: true,
            style: discord_js_1.TextInputStyle.Short,
        }));
        const passwd = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.TextInputBuilder({
            custom_id: "account_password",
            placeholder: (0, languages_1.default)(user, "passwd", "account-passwd"),
            label: (0, languages_1.default)(user, "passwd", "account-passwd"),
            required: true,
            style: discord_js_1.TextInputStyle.Short,
        }));
        const secondAuth = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.TextInputBuilder({
            custom_id: "second_authentication_code",
            placeholder: (0, languages_1.default)(user, "passwd", "second-auth"),
            label: (0, languages_1.default)(user, "passwd", "second-auth"),
            required: true,
            style: discord_js_1.TextInputStyle.Short,
        }));
        const modal = new discord_js_1.ModalBuilder({
            title: (0, languages_1.default)(user, "passwd", "modal-title"),
            custom_id: "passwd_modal",
        });
        modal.addComponents(accName);
        modal.addComponents(passwd);
        modal.addComponents(masterKey);
        const userDb = yield passwd_1.default.findOne({ _id: user.id });
        if (userDb) {
            if (userDb.dfa.enabled) {
                modal.addComponents(secondAuth);
            }
        }
        yield interaction.showModal(modal);
    }),
};
