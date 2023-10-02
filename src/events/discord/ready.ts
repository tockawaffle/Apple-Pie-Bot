import { Events, Client } from "discord.js";
import Polyglot from "../../configs/handlers/language/LanguageHandler";

export default {
    name: Events.ClientReady,
    once: true,
    execute: async (client: Client) => {
        console.log(`[Info] > ${client.user?.tag} está online!`);

        const polyglot = new Polyglot();
        await polyglot.loadUserSettings(client);
        client.translation = polyglot.getTranslation.bind(polyglot);
    },
};
