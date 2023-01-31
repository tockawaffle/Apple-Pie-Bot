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
const embedCreator_1 = require("../../../../configs/functions/embedCreator");
const languages_1 = __importDefault(require("../../../../configs/languages/languages"));
exports.default = {
    description: "Add emojis to your guild! You can use this command with a url or a custom emoji.",
    type: _wokcommands_1.CommandType.SLASH,
    nameLocalizations: {
        "pt-BR": "emoji"
    },
    descriptionLocalizations: {
        "pt-BR": "Adicione emojis ao seu servidor! Você pode usar este comando com uma url ou um emoji customizado."
    },
    category: "Utility - Servers",
    options: [
        {
            name: "name",
            description: "Name your emoji!",
            required: true,
            type: 3,
        },
        {
            name: "choice",
            description: "Select between a url/emoji or an attachment!",
            descriptionLocalizations: {
                "en-US": "Select between a url/emoji or an attachment!",
                "pt-BR": "Selecione entre uma url/emoji ou um anexo!",
            },
            required: true,
            type: 3,
            choices: [
                {
                    name: "Url or Emoji",
                    value: "url",
                },
                {
                    name: "Attachment",
                    value: "attachment",
                }
            ]
        },
        {
            name: "attachment",
            description: "If you're using an attachment, use this.",
            required: false,
            type: 11,
        },
        {
            name: "emoji",
            description: "If you choose 'Url/Emoji', use this. Either a url or a custom emoji.",
            required: false,
            type: 3,
        }
    ],
    callback: ({ interaction, args, user }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const name = args[0], guild = interaction.guild;
        try {
            if (args[1] === "url") {
                const emoji = args[1];
                const emojiC = yield (guild === null || guild === void 0 ? void 0 : guild.emojis.create({ attachment: emoji, name }));
                yield (0, embedCreator_1.embedCreator)({
                    embedData: {
                        title: `${(0, languages_1.default)(user, "defaults", "success")} - ${(0, languages_1.default)(user, "emoji", "success")}`,
                        description: `${emojiC}`,
                    },
                    interactionObj: interaction,
                });
            }
            else if (args[1] === "attachment") {
                const attachment = (_a = interaction.options.resolved) === null || _a === void 0 ? void 0 : _a.attachments.first().attachment;
                const formatName = name.replace(/\s/g, "_"), emoji = yield ((_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.emojis.create({
                    attachment: attachment,
                    name: formatName,
                }));
                yield (0, embedCreator_1.embedCreator)({
                    embedData: {
                        title: `${(0, languages_1.default)(user, "defaults", "success")} - ${(0, languages_1.default)(user, "emoji", "success")}`,
                        description: `${emoji}`,
                    },
                    interactionObj: interaction,
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
};
