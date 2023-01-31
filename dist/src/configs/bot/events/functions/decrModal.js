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
exports.decr_modal = void 0;
const discord_js_1 = require("discord.js");
const vault_1 = require("../../../functions/vault");
const bcrypt_1 = require("bcrypt");
const passwd_1 = __importDefault(require("../../../db/models/passwd"));
const languages_1 = __importDefault(require("../../../languages/languages"));
function decr_modal(interaction, modalInteraction) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const mInteraction = modalInteraction;
        yield mInteraction.deferReply();
        const masterKeyInput = mInteraction.fields.fields.map((fields) => fields.value)[1];
        const accountNameInput = mInteraction.fields.fields.map((fields) => fields.value)[0];
        const accountsDb = yield passwd_1.default.findOne({
            _id: interaction.user.id,
        }, {
            accounts: {
                $elemMatch: {
                    account_name: accountNameInput,
                },
            },
        });
        if (!accountsDb) {
            return yield mInteraction.editReply({
                content: (0, languages_1.default)(interaction.user, "decr", "decr_account_doesnt_exist"),
            });
        }
        const accountDb = accountsDb.accounts[0];
        const masterKeyCompare = yield (0, bcrypt_1.compare)(masterKeyInput, accountDb.masterKey);
        if (!masterKeyCompare) {
            return yield mInteraction.editReply({
                content: (0, languages_1.default)(interaction.user, "decr", "decr_invalid_masterkey"),
            });
        }
        const decryptedPasswd = (0, vault_1.decryptAesGcm)(accountDb.account_passwd, masterKeyInput);
        if (!decryptedPasswd) {
            return yield mInteraction.editReply({
                content: (0, languages_1.default)(interaction.user, "decr", "decr_invalid_masterkey"),
            });
        }
        const { username } = interaction.user;
        return yield mInteraction.editReply({
            embeds: [
                new discord_js_1.EmbedBuilder()
                    .setAuthor({
                    name: username,
                    iconURL: interaction.user.displayAvatarURL({
                        forceStatic: false,
                    }),
                })
                    .setTitle((0, languages_1.default)(interaction.user, "decr", "decr_success"))
                    .setDescription((0, languages_1.default)(interaction.user, "decr", "decr_success_desc")
                    .replace("{0}", accountNameInput)
                    .replace("{1}", decryptedPasswd))
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
    });
}
exports.decr_modal = decr_modal;
