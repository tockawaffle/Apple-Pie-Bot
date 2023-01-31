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
exports.embedCreator = void 0;
const discord_js_1 = require("discord.js");
function embedCreator({ embedData, interactionObj, followup, ephemeral }) {
    return __awaiter(this, void 0, void 0, function* () {
        // If there is not any of the required parameters, return error
        if (!embedData)
            throw new Error("No embed data provided");
        const { title, description, color, fields, image, thumbnail, footer } = embedData;
        if (!interactionObj)
            throw new Error("interactionObj is required for interaction");
        const { member } = interactionObj;
        const { user } = member;
        const u = user;
        if (followup) {
            yield interactionObj.followUp({
                // Mention the user who sent the message
                content: `<@${u.id}>`,
                embeds: [
                    new discord_js_1.EmbedBuilder({
                        author: {
                            name: u.username,
                            iconURL: u.avatarURL({ forceStatic: false }),
                        },
                        title: title !== null && title !== void 0 ? title : "",
                        description,
                        color: color ? color : 7419530,
                        fields: fields ? fields : [],
                        image: image !== null && image !== void 0 ? image : undefined,
                        thumbnail: thumbnail !== null && thumbnail !== void 0 ? thumbnail : undefined,
                        footer: footer ? footer : undefined,
                    }),
                ],
                ephemeral: ephemeral !== null && ephemeral !== void 0 ? ephemeral : false,
            });
        }
        else {
            yield interactionObj.reply({
                embeds: [
                    new discord_js_1.EmbedBuilder({
                        author: {
                            name: u.username,
                            icon_url: u.avatarURL({ forceStatic: false }),
                        },
                        title: title !== null && title !== void 0 ? title : "",
                        description,
                        color: color ? color : 7419530,
                        fields: fields ? fields : [],
                        image: image !== null && image !== void 0 ? image : undefined,
                        thumbnail: thumbnail !== null && thumbnail !== void 0 ? thumbnail : undefined,
                        footer: footer ? footer : undefined,
                    }),
                ],
                ephemeral: ephemeral !== null && ephemeral !== void 0 ? ephemeral : false,
            });
        }
    });
}
exports.embedCreator = embedCreator;
