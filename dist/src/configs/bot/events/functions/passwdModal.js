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
exports.passwd_modal = void 0;
const discord_js_1 = require("discord.js");
const vault_1 = require("../../../functions/vault");
const passwd_1 = __importDefault(require("../../../db/models/passwd"));
const languages_1 = __importDefault(require("../../../languages/languages"));
const moment_1 = __importDefault(require("moment"));
const bcrypt_1 = require("bcrypt");
function passwd_modal(interaction, modalInteraction) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const mInteraction = modalInteraction;
        const user = interaction.user;
        yield mInteraction.deferReply();
        const accountNameInput = mInteraction.fields.fields.map((fields) => fields.value)[0];
        const accountPasswdInput = mInteraction.fields.fields.map((fields) => fields.value)[1];
        const masterKeyInput = mInteraction.fields.fields.map((fields) => fields.value)[2];
        const accountsDb = yield passwd_1.default.findOne({ _id: interaction.user.id }, {});
        if (accountsDb) {
            const accounts = accountsDb.accounts.map((account) => {
                return account.account_name;
            });
            if (accounts.includes(accountNameInput)) {
                return yield mInteraction.editReply({
                    content: (0, languages_1.default)(interaction.user, "passwd", "passwd_account_exists"),
                });
            }
        }
        try {
            const passwdEnc = (0, vault_1.encryptAesGcm)(accountPasswdInput, masterKeyInput);
            const passwdHash = yield (0, bcrypt_1.hash)(masterKeyInput, 16);
            const createdMoment = (0, moment_1.default)(new Date()).format("L");
            yield passwd_1.default.findOneAndUpdate({ _id: user.id }, {
                _id: user,
                $push: {
                    accounts: {
                        account_name: accountNameInput,
                        account_passwd: passwdEnc,
                        masterKey: passwdHash,
                        createdAt: createdMoment,
                    },
                },
            }, { upsert: true });
            const updtAcc = yield passwd_1.default.findOne({ _id: user.id }, {
                accounts: {
                    $elemMatch: {
                        account_name: accountNameInput,
                    },
                },
            });
            if (!updtAcc) {
                return yield mInteraction.editReply({
                    content: (0, languages_1.default)(interaction.user, "passwd", "passwd_error_db"),
                });
            }
            return yield mInteraction.editReply({
                embeds: [
                    new discord_js_1.EmbedBuilder()
                        .setAuthor({
                        name: interaction.user.username,
                        iconURL: interaction.user.displayAvatarURL({
                            forceStatic: false,
                        }),
                    })
                        .setTitle((0, languages_1.default)(interaction.user, "passwd", "passwd_success_title_embed"))
                        .setDescription((0, languages_1.default)(interaction.user, "passwd", "passwd_success_desc_embed")
                        .replace("{0}", accountNameInput))
                        .setColor("Random")
                        .setTimestamp()
                        .setFooter({
                        text: (0, languages_1.default)(interaction.user, "help", "help-footer"),
                        iconURL: (_a = interaction.client.users.cache
                            .find((user) => user.id === "876578406144290866")) === null || _a === void 0 ? void 0 : _a.displayAvatarURL({
                            forceStatic: false,
                        }),
                    }),
                ],
            });
        }
        catch (error) {
            console.log(error);
            return yield mInteraction.editReply({
                content: (0, languages_1.default)(interaction.user, "passwd", "passwd_error"),
            });
        }
    });
}
exports.passwd_modal = passwd_modal;
