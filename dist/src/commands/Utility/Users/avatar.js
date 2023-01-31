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
Object.defineProperty(exports, "__esModule", { value: true });
const _wokcommands_1 = require("@wokcommands/");
const embedCreator_1 = require("../../../configs/functions/embedCreator");
exports.default = {
    description: "Works with mentions, if none, it'll return your profile picture.",
    type: _wokcommands_1.CommandType.SLASH,
    category: "Utility - Users",
    nameLocalizations: {
        "pt-BR": "avatar",
    },
    descriptionLocalizations: {
        "en-US": "Works with mentions, if none, it'll return your profile picture.",
        "pt-BR": "Funciona com menções, se não tiver nenhuma, mostrará sua foto de perfil.",
    },
    options: [
        {
            name: "user",
            description: "The user you want to get the avatar of",
            descriptionLocalizations: {
                "en-US": "The user you want to get the avatar of",
                "pt-BR": "O usuário que você deseja obter o avatar",
            },
            nameLocalizations: {
                "en-US": "user",
                "pt-BR": "usuário",
            },
            required: false,
            type: 6,
        },
    ],
    callback: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        function sendAvatar(username, avatar) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield (0, embedCreator_1.embedCreator)({
                    embedData: {
                        description: `🔎${username}`,
                        image: {
                            url: avatar,
                        },
                    },
                    interactionObj: interaction,
                });
            });
        }
        const { member } = interaction, { user } = member, u = user;
        const options = interaction.options;
        if (options.data[0]) {
            const value = options.data[0].user;
            return yield sendAvatar(value.username, value.displayAvatarURL({
                forceStatic: false,
                size: 2048,
            }));
        }
        else {
            return yield (0, embedCreator_1.embedCreator)({
                embedData: {
                    description: `🔎${user.username}`,
                    image: {
                        url: u.displayAvatarURL({
                            forceStatic: false,
                            size: 2048,
                        }),
                    },
                },
                interactionObj: interaction,
            });
        }
    }),
};
