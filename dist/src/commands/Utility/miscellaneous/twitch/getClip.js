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
const _cliprxyz_1 = require("@cliprxyz/");
const embedCreator_1 = require("../../../../configs/functions/embedCreator");
const _wokcommands_1 = require("@wokcommands/");
// import { modifyArgs } from "../../configs/functions/separateArgs"
exports.default = {
    description: "Gives you a link to download a clip from Twitch",
    type: _wokcommands_1.CommandType.SLASH,
    category: "Utility - Misc",
    descriptionLocalizations: {
        "en-US": "Gives you a link to download a clip from Twitch",
        "pt-BR": "Te dá um link para baixar um clip do Twitch",
    },
    nameLocalizations: {
        "pt-BR": "baixarclip",
    },
    options: [
        {
            name: "clip-url",
            description: "The url of the clip you want to download",
            descriptionLocalizations: {
                "en-US": "The url of the clip you want to download",
                "pt-BR": "A url do clip que você quer baixar",
            },
            nameLocalizations: {
                "en-US": "clip-url",
                "pt-BR": "url-do-clip",
            },
            required: true,
            type: 3,
        },
    ],
    callback: ({ interaction, client, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const down = yield (0, _cliprxyz_1.dClip)({ clipId: args[0] });
        if (down.code !== 200)
            return interaction.reply(`Could not download clip: ${down.message}`);
        yield interaction.reply("⏳ Downloading clip...");
        return yield (0, embedCreator_1.embedCreator)({
            embedData: {
                title: `${down.clipName}`,
                description: `[Click here to download](${down.clipUrl})`,
                thumbnail: {
                    url: down.creatorPictureUrl,
                },
                fields: [
                    {
                        name: "Creator",
                        value: `[${down.creatorUsername}](${down.creatorUrl})`,
                    },
                    {
                        name: "Clipped on",
                        value: `${down.clippedOn}`,
                    },
                    {
                        name: "Was playing",
                        value: `${down.creatorWasPlaying}`,
                    },
                ],
            },
            interactionObj: interaction,
            followup: true,
        });
    }),
};
