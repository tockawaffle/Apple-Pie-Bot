import { Client } from "discord.js";
import WOKCommands from "../../../modules/wokcommands";
import { loadUserSettings } from "../../configs/languages/languages";

export default (client: Client, instance: WOKCommands) => {
    client.on("interactionCreate", async (interaction) => {
        await loadUserSettings(client);
    });
};

const config = {
    displayName: "Handles some things for the interaction to work.",
    dbName: "InteractionHandler",
};

export { config };
