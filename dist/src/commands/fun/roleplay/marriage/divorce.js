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
const divorce_1 = require("../../../../configs/commands/misc/divorce");
const user_1 = __importDefault(require("../../../../configs/db/models/user"));
const languages_1 = __importDefault(require("../../../../configs/languages/languages"));
const moment_1 = __importDefault(require("moment"));
exports.default = {
    description: "Divorces the one you're married to.",
    category: "Roleplay",
    type: _wokcommands_1.CommandType.SLASH,
    nameLocalizations: {
        "pt-BR": "divorciar",
    },
    descriptionLocalizations: {
        "pt-BR": "Se divorcia de quem você está casado.",
        "en-US": "Divorces the one you're married to."
    },
    options: [
        {
            name: "user",
            description: "User that you'll ask in marriage.",
            descriptionLocalizations: {
                "pt-BR": "Usuário que você irá pedir em casamento.",
            },
            nameLocalizations: {
                "pt-BR": "usuário",
            },
            required: true,
            type: 6,
        },
    ],
    callback: ({ args, interaction, }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
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
        const nextDivorceTry = (_a = userDb === null || userDb === void 0 ? void 0 : userDb.marriedTo) === null || _a === void 0 ? void 0 : _a.nextDivorceTry;
        const now = new Date();
        const divorceTries = (_b = userDb === null || userDb === void 0 ? void 0 : userDb.marriedTo) === null || _b === void 0 ? void 0 : _b.divorceTries;
        if (divorceTries >= 3) {
            yield user_1.default.findOneAndUpdate({
                _id: mentionedMember.user.id,
            }, {
                $unset: {
                    marriedTo: {},
                },
                $push: {
                    wasMarriedTo: {
                        user_id: interaction.user.id,
                        user_name: interaction.user.username,
                    },
                },
            });
            yield user_1.default.findOneAndUpdate({
                _id: interaction.user.id,
            }, {
                $unset: {
                    marriedTo: {},
                },
                $push: {
                    wasMarriedTo: {
                        user_id: mentionedMember.user.id,
                        user_name: mentionedMember.user.username,
                    },
                },
            });
            return interaction.reply({
                content: (0, languages_1.default)(interaction.user, "divorce", "forceDivorce").replace("{0}", mentionedMember.user.username),
            });
        }
        else if (nextDivorceTry) {
            if (now < nextDivorceTry) {
                return interaction.reply({
                    content: (0, languages_1.default)(interaction.user, "divorce", "cooldown").replace("{0}", (0, moment_1.default)(nextDivorceTry).format("DD/MM/YYYY HH:mm:ss")),
                    ephemeral: true,
                });
            }
        }
        const mentionedUserDb = yield user_1.default.findOne({
            _id: mentionedMember.user.id,
        });
        if (mentionedMember.user.id === user.user.id) {
            return interaction.reply({
                content: (0, languages_1.default)(interaction.user, "divorce", "self"),
                ephemeral: true,
            });
        }
        if (!((_c = userDb === null || userDb === void 0 ? void 0 : userDb.marriedTo) === null || _c === void 0 ? void 0 : _c.user_id)) {
            return interaction.reply({
                content: (0, languages_1.default)(interaction.user, "divorce", "notMarried").replace("{0}", mentionedMember.user.username),
                ephemeral: true,
            });
        }
        else if (!((_d = mentionedUserDb === null || mentionedUserDb === void 0 ? void 0 : mentionedUserDb.marriedTo) === null || _d === void 0 ? void 0 : _d.user_id)) {
            return interaction.reply({
                content: (0, languages_1.default)(interaction.user, "divorce", "mentionedNotMarried")
                    .replace("{0}", mentionedMember.user.username)
                    .replace("{1}", interaction.user.username),
                ephemeral: true,
            });
        }
        else if (((_e = userDb === null || userDb === void 0 ? void 0 : userDb.marriedTo) === null || _e === void 0 ? void 0 : _e.user_id) !== mentionedMember.user.id) {
            return interaction.reply({
                content: (0, languages_1.default)(interaction.user, "divorce", "notMarriedWith").replace("{0}", mentionedMember.user.username),
                ephemeral: true,
            });
        }
        //Ask the mentioned member if he/she wants to divorce the user
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle((0, languages_1.default)(user.user, "divorce", "divorceAskTitle"))
            .setDescription(`${user.user.username} ${(0, languages_1.default)(interaction.user, "divorce", "divorceAsk")}`)
            .setColor("Random")
            .setImage((0, divorce_1.selectRandomImage)());
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
        const collector = msg.createReactionCollector({ filter, time: 15000 });
        collector.on("collect", (reaction, user) => __awaiter(void 0, void 0, void 0, function* () {
            var _f;
            if (reaction.emoji.name === "✅") {
                yield user_1.default.findOneAndUpdate({
                    _id: interaction.user.id,
                }, {
                    $unset: {
                        marriedTo: {},
                    },
                    $push: {
                        wasMarriedTo: {
                            user_id: mentionedMember.user.id,
                            user_name: mentionedMember.user.username,
                        },
                    },
                });
                yield user_1.default.findOneAndUpdate({
                    _id: mentionedMember.user.id,
                }, {
                    $unset: {
                        marriedTo: {},
                    },
                    $push: {
                        wasMarriedTo: {
                            user_id: interaction.user.id,
                            user_name: interaction.user.username,
                        },
                    },
                });
                const embed = new discord_js_1.EmbedBuilder()
                    .setTitle((0, languages_1.default)(user, "divorce", "divorceAcceptedTitle"))
                    .setDescription(`${(0, languages_1.default)(interaction.user, "divorce", "divorceAccepted").replace("{0}", interaction.user.username)}`)
                    .setColor("Random")
                    .setImage((0, divorce_1.selectRandomImage)());
                yield interaction.editReply({
                    content: `${interaction.user} 💘 ${user}`,
                    embeds: [embed],
                });
                return collector.stop();
            }
            else if (reaction.emoji.name === "❌") {
                //Set the next divorce try date to 24 hours from now and increase the divorce tries by 1
                let tries = (_f = userDb === null || userDb === void 0 ? void 0 : userDb.marriedTo) === null || _f === void 0 ? void 0 : _f.divorceTries;
                if (!tries) {
                    tries = +1;
                }
                else
                    tries = tries + 1;
                yield user_1.default.findOneAndUpdate({
                    _id: interaction.user.id,
                }, {
                    $set: {
                        "marriedTo.nextDivorceTry": (0, moment_1.default)(now).add(24, "hours").toDate(),
                        "marriedTo.divorceTries": tries,
                    },
                });
                const embed = new discord_js_1.EmbedBuilder()
                    .setTitle((0, languages_1.default)(user, "divorce", "divorceDeniedTitle"))
                    .setDescription(`${(0, languages_1.default)(interaction.user, "divorce", "divorceDenied").replace("{0}", mentionedMember.user.username)}`)
                    .setColor("Random")
                    .setImage((0, divorce_1.selectRandomImage)());
                yield interaction.editReply({
                    content: `${interaction.user} 💔 ${mentionedMember.user}`,
                    embeds: [embed],
                });
                return collector.stop();
            }
        }));
    }),
};
