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
const user_1 = __importDefault(require("../../../../configs/db/models/user"));
const languages_1 = __importDefault(require("../../../../configs/languages/languages"));
exports.default = {
    category: "Currency",
    description: "Shows the amount of money you have in your wallet!",
    nameLocalizations: {
        "pt-BR": "carteira",
    },
    descriptionLocalizations: {
        "en-US": "Shows the amount of money you have in your wallet!",
        "pt-BR": "Mostra a quantidade de dinheiro que você tem na sua carteira!",
    },
    type: _wokcommands_1.CommandType.SLASH,
    callback: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        const thisUser = interaction.user;
        const thisUserDB = yield user_1.default.findOne({ _id: thisUser.id });
        if (!thisUserDB)
            return interaction.reply({
                content: (0, languages_1.default)(thisUser, "defaults", "no_user_found"),
                ephemeral: true,
            });
        const wallet = thisUserDB.currency, walletAmount = wallet.coinsAmount, nextDailyReward = wallet.nextDailyReward
            ? wallet.nextDailyReward
            : (0, languages_1.default)(thisUser, "currency", "rewardNow"), nextWeeklyReward = wallet.nextWeeklyReward
            ? wallet.nextWeeklyReward
            : (0, languages_1.default)(thisUser, "currency", "rewardNow"), nextMonthlyReward = wallet.nextMonthlyReward
            ? wallet.nextMonthlyReward
            : (0, languages_1.default)(thisUser, "currency", "rewardNow"), premium = wallet.premium
            ? wallet.premium
            : (0, languages_1.default)(thisUser, "currency", "noPremium");
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle((0, languages_1.default)(thisUser, "currency", "walletTitle"))
            .setColor("Random")
            .setFooter({
            text: (0, languages_1.default)(thisUser, "currency", "walletFooter"),
            iconURL: thisUser.avatarURL(),
        })
            .setTimestamp()
            .addFields([
            {
                name: (0, languages_1.default)(thisUser, "currency", "walletAmount"),
                value: `**A$${walletAmount}**`,
                inline: true,
            },
            {
                name: (0, languages_1.default)(thisUser, "currency", "nextDailyReward"),
                value: `**${nextDailyReward}**`,
                inline: true,
            },
            {
                name: (0, languages_1.default)(thisUser, "currency", "nextWeeklyReward"),
                value: `**${nextWeeklyReward}**`,
                inline: true,
            },
            {
                name: (0, languages_1.default)(thisUser, "currency", "nextMonthlyReward"),
                value: `**${nextMonthlyReward}**`,
                inline: true,
            },
            {
                name: (0, languages_1.default)(thisUser, "currency", "premium"),
                value: `**${premium}**`,
                inline: true,
            }
        ])
            .setDescription((0, languages_1.default)(thisUser, "currency", "walletDescription"));
        return interaction.reply({ embeds: [embed] });
    }),
};
