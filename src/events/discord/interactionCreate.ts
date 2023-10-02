import {
    Events,
    Client,
    Interaction,
    User,
} from "discord.js";

export default {
    name: Events.InteractionCreate,
    once: false,
    execute: async (interaction: Interaction, client: Client) => {},
};
