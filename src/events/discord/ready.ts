import { Events, Client } from "discord.js";
import Polyglot from "../../configs/handlers/language/LanguageHandler";
import OpenAI from "openai";

export default {
    name: Events.ClientReady,
    once: true,
    execute: async (client: Client) => {
        console.log(`[Info] > ${client.user?.tag} está online!`);

        const polyglot = new Polyglot();
        await polyglot.loadUserSettings(client);
        client.translation = (user, commandName, textId) => {
            return polyglot.getTranslation(user, commandName, textId);
        };

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_KEY,
        });

        client.openai = openai;

        console.log(`[Info] > ${client.user?.tag} está pronto!`);
    },
};
