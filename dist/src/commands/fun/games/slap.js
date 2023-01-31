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
const hug_1 = require("../../../configs/commands/misc/hug");
const languages_1 = __importDefault(require("../../../configs/languages/languages"));
exports.default = {
    description: "Slaps someone.",
    category: "Games",
    type: _wokcommands_1.CommandType.SLASH,
    nameLocalizations: {
        "pt-BR": "tapa",
    },
    descriptionLocalizations: {
        "pt-BR": "Da um tapa em alguém.",
    },
    options: [
        {
            name: "user",
            description: "User that is going to get slapped.",
            descriptionLocalizations: {
                "pt-BR": "Usuário que vai receber o tapa.",
            },
            nameLocalizations: {
                "pt-BR": "usuário",
            },
            required: true,
            type: 6,
        },
    ],
    callback: ({ args, interaction, }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!interaction.guild)
            return interaction.reply({
                content: (0, languages_1.default)(interaction.user, "defaults", "guildOnly"),
                ephemeral: true,
            });
        const mentionedUser = args[0];
        const mentionedMember = interaction.guild.members.cache.get(mentionedUser);
        const user = interaction.member;
        if (!mentionedMember) {
            return interaction.reply({
                content: (0, languages_1.default)(interaction.user, "defaults", "noMemberFound"),
                ephemeral: true,
            });
        }
        if (mentionedMember.user.id === user.user.id) {
            return interaction.reply({
                content: (0, languages_1.default)(interaction.user, "slap", "self"),
                ephemeral: true,
            });
        }
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle(`${user.user.username} ${(0, languages_1.default)(interaction.user, "slap", "slapped")} ${mentionedMember.displayName}`)
            .setImage((0, hug_1.selectRandomImage)())
            .setColor("Random")
            .setTimestamp();
        return interaction.reply({
            embeds: [embed],
        });
    }),
};
