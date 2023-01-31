import { Events, Interaction } from "discord.js";
import { decr_modal } from "../functions/decrModal";
import { passwd_modal } from "../functions/passwdModal";

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction: Interaction) {
        if(interaction.user.bot) return;
        
        if(interaction.isModalSubmit()) {
            const modalId = interaction.customId;
            const thisModalInteraction = interaction;
            switch(modalId) {
                case "decr_modal": {
                    return await decr_modal(interaction, thisModalInteraction)
                }
                case "passwd_modal": {
                    return await passwd_modal(interaction, thisModalInteraction)
                }
            }
        }
    },
};