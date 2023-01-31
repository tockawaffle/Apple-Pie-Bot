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
const marry_1 = require("../../../../configs/commands/misc/marry");
const user_1 = __importDefault(require("../../../../configs/db/models/user"));
const languages_1 = __importDefault(require("../../../../configs/languages/languages"));
const moment_1 = __importDefault(require("moment"));
exports.default = {
    description: "Case com alguém! Desde que a pessoa aceite...",
    category: "Roleplay",
    type: _wokcommands_1.CommandType.SLASH,
    nameLocalizations: {
        "pt-BR": "casar",
    },
    descriptionLocalizations: {
        "pt-BR": "Case com alguém! Desde que a pessoa aceite...",
        "en-US": "Marry someone! As long as the person accepts...",
    },
    options: [
        {
            name: "user",
            description: "User that you'll ask in marriage.",
            descriptionLocalizations: {
                "pt-BR": "Usuário que você irá pedir em casamento.",
            },
            required: true,
            type: 6,
        },
    ],
    callback: ({ args, interaction, }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
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
        const userDb = yield user_1.default.findOne({
            _id: user.user.id,
        });
        const mentionedUserDb = yield user_1.default.findOne({
            _id: mentionedMember.user.id,
        });
        if (mentionedMember.user.id === user.user.id) {
            return interaction.reply({
                content: (0, languages_1.default)(interaction.user, "marry", "self"),
                ephemeral: true,
            });
        }
        if ((_a = userDb === null || userDb === void 0 ? void 0 : userDb.marriedTo) === null || _a === void 0 ? void 0 : _a.user_id) {
            return interaction.reply({
                content: (0, languages_1.default)(interaction.user, "marry", "alreadyMarried").replace("{0}", userDb.marriedTo.user_name),
                ephemeral: true,
            });
        }
        else if ((_b = mentionedUserDb === null || mentionedUserDb === void 0 ? void 0 : mentionedUserDb.marriedTo) === null || _b === void 0 ? void 0 : _b.user_id) {
            return interaction.reply({
                content: (0, languages_1.default)(interaction.user, "marry", "mentionedAlreadyMarried").replace("{0}", mentionedMember.user.username).replace("{1}", mentionedUserDb.marriedTo.user_name),
                ephemeral: true,
            });
        }
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle((0, languages_1.default)(user.user, "marry", "askMarryTitle"))
            .setDescription(`${user.user.username} ${(0, languages_1.default)(interaction.user, "marry", "askMarry")}`)
            .setColor("Random")
            .setImage((0, marry_1.selectRandomImage)());
        const msg = yield interaction.reply({
            content: `${mentionedMember.user}`,
            embeds: [embed],
            fetchReply: true,
        });
        yield msg.react("✅");
        yield msg.react("❌");
        const filter = (reaction, user) => {
            return (["✅", "❌"].includes(reaction.emoji.name) &&
                user.id === mentionedMember.user.id);
        };
        const collector = msg.createReactionCollector({ filter, time: 120000 });
        collector.on("collect", (reaction, user) => __awaiter(void 0, void 0, void 0, function* () {
            if (reaction.emoji.name === "✅") {
                yield user_1.default.findOneAndUpdate({
                    _id: interaction.user.id,
                }, {
                    marriedTo: {
                        user_id: mentionedMember.id,
                        user_name: mentionedMember.user.username,
                        marryDate: (0, moment_1.default)().format("DD/MM/YYYY"),
                        marriedAt: {
                            guild_id: interaction.guild.id,
                            guild_name: interaction.guild.name,
                        }
                    },
                });
                yield user_1.default.findOneAndUpdate({
                    _id: mentionedMember.user.id,
                }, {
                    marriedTo: {
                        user_id: interaction.user.id,
                        user_name: interaction.user.username,
                        marryDate: (0, moment_1.default)().format("DD/MM/YYYY"),
                        marriedAt: {
                            guild_id: interaction.guild.id,
                            guild_name: interaction.guild.name,
                        }
                    },
                });
                const embed = new discord_js_1.EmbedBuilder()
                    .setTitle((0, languages_1.default)(user, "marry", "marryAcceptedTitle"))
                    .setDescription(`${(0, languages_1.default)(interaction.user, "marry", "marryAccepted").replace("{0}", interaction.user.username)}`)
                    .setColor("Random")
                    .setImage((0, marry_1.selectRandomImage)());
                yield interaction.editReply({
                    content: `${interaction.user} 💘 ${user}`,
                    embeds: [embed],
                });
                return collector.stop();
            }
            else if (reaction.emoji.name === "❌") {
                const embed = new discord_js_1.EmbedBuilder()
                    .setTitle((0, languages_1.default)(user, "marry", "marryDeniedTitle"))
                    .setDescription(`${(0, languages_1.default)(interaction.user, "marry", "marryDenied").replace("{0}", mentionedMember.user.username)}`)
                    .setColor("Random")
                    .setImage((0, marry_1.selectRandomImage)());
                yield interaction.editReply({
                    content: `${interaction.user} 💔 ${mentionedMember.user}`,
                    embeds: [embed],
                });
                return collector.stop();
            }
            //get timmeout
        }));
        collector.on("end", (collected, reason) => __awaiter(void 0, void 0, void 0, function* () {
            if (reason === "time") {
                const embed = new discord_js_1.EmbedBuilder()
                    .setTitle((0, languages_1.default)(interaction.user, "marry", "marryTimeoutTitle"))
                    .setDescription(`${(0, languages_1.default)(interaction.user, "marry", "marryTimeout").replace("{0}", mentionedMember.user.username)}`)
                    .setColor("Random")
                    .setImage((0, marry_1.selectRandomImage)());
                yield interaction.editReply({
                    content: `${interaction.user} 💔 ${mentionedMember.user}`,
                    embeds: [embed],
                });
            }
        }));
    }),
};
