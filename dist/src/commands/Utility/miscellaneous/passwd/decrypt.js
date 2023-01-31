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
const discord_js_1 = require("discord.js");
const _wokcommands_1 = require("@wokcommands/");
const passwd_1 = __importDefault(require("../../../../configs/db/models/passwd"));
const languages_1 = __importDefault(require("../../../../configs/languages/languages"));
exports.default = {
    description: "Decrypts your password from a secure database (Restricted Command)",
    type: _wokcommands_1.CommandType.SLASH,
    category: "Utility - Misc",
    nameLocalizations: {
        "pt-BR": "decrypt",
    },
    descriptionLocalizations: {
        "pt-BR": "Descriptografa sua senha de um banco de dados seguro (Comando Restrito)",
        "en-US": "Decrypts your password from a secure database (Restricted Command)",
    },
    callback: ({ client, interaction, user, args, }) => __awaiter(void 0, void 0, void 0, function* () {
        const allowed = ["876578406144290866"];
        if (!allowed.includes(user.id)) {
            return interaction.reply((0, languages_1.default)(user, "decr", "decr_restricted"));
        }
        const checkSA = yield passwd_1.default.findOne({ _id: user.id });
        if (!checkSA) {
            return interaction.reply((0, languages_1.default)(user, "decr", "decr_doesnt_exist"));
        }
        const accountsDbs = checkSA.accounts;
        const accounts = accountsDbs.map((account) => {
            return account.account_name;
        });
        const row = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.StringSelectMenuBuilder()
            .setCustomId("decr_slm_accountname")
            .setPlaceholder((0, languages_1.default)(user, "decr", "decr_modal_accountname_placeholder"))
            .addOptions(accounts.map((account) => {
            return {
                label: account,
                value: account,
            };
        })));
        yield interaction.reply({
            components: [row],
        });
        const collector = new discord_js_1.InteractionCollector(client, {
            filter: (i) => i.user.id === user.id,
            time: 180000
        });
        collector.on("collect", (i) => __awaiter(void 0, void 0, void 0, function* () {
            const selectedAccountName = i.values[0];
            const modal = new discord_js_1.ModalBuilder({
                title: (0, languages_1.default)(user, "decr", "decr_modal_title"),
                custom_id: "decr_modal",
            });
            const masterKey = new discord_js_1.ActionRowBuilder({
                components: [
                    new discord_js_1.TextInputBuilder({
                        custom_id: "decr_modal_masterkey",
                        label: (0, languages_1.default)(user, "decr", "decr_modal_masterkey_label"),
                        placeholder: (0, languages_1.default)(user, "decr", "decr_modal_masterkey_placeholder"),
                        required: true,
                        style: discord_js_1.TextInputStyle.Short,
                        type: 4,
                    }),
                ],
            });
            const accountName = new discord_js_1.ActionRowBuilder({
                components: [
                    new discord_js_1.TextInputBuilder({
                        custom_id: "decr_modal_accountname",
                        label: (0, languages_1.default)(user, "decr", "decr_modal_accountname_label"),
                        placeholder: selectedAccountName,
                        value: selectedAccountName,
                        required: true,
                        style: discord_js_1.TextInputStyle.Short,
                        type: 4,
                    }),
                ],
            });
            const userSA = checkSA.dfa.enabled;
            if (userSA) {
                const code2fa = new discord_js_1.ActionRowBuilder({
                    components: [
                        new discord_js_1.TextInputBuilder({
                            custom_id: "decr_modal_2fa",
                            label: (0, languages_1.default)(user, "decr", "decr_modal_2fa_label"),
                            placeholder: (0, languages_1.default)(user, "decr", "decr_modal_2fa_placeholder"),
                            required: true,
                            style: discord_js_1.TextInputStyle.Short,
                            type: 4,
                        }),
                    ],
                });
                modal.addComponents(code2fa);
            }
            modal.addComponents(accountName);
            modal.addComponents(masterKey);
            yield i.showModal(modal);
            collector.stop();
        }));
    }),
};
