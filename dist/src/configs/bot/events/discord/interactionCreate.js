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
const discord_js_1 = require("discord.js");
const decrModal_1 = require("../functions/decrModal");
const passwdModal_1 = require("../functions/passwdModal");
module.exports = {
    name: discord_js_1.Events.InteractionCreate,
    once: false,
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (interaction.user.bot)
                return;
            if (interaction.isModalSubmit()) {
                const modalId = interaction.customId;
                const thisModalInteraction = interaction;
                switch (modalId) {
                    case "decr_modal": {
                        return yield (0, decrModal_1.decr_modal)(interaction, thisModalInteraction);
                    }
                    case "passwd_modal": {
                        return yield (0, passwdModal_1.passwd_modal)(interaction, thisModalInteraction);
                    }
                }
            }
        });
    },
};
