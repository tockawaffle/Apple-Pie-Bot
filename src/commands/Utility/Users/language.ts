import { ICommand } from "wokcommands";
import { User } from "discord.js";
import { embedCreator } from "../../../configs/functions/embedCreator";
import lang, { setUserLanguage, loadUserSettings } from "../../../configs/languages/languages";
import languages from "../../../configs/languages/translations.json";
import userl from "../../../configs/db/models/user";

export default {
    category: "Utility - Users",
    description: "Changes your language between portuguese and english",
    name: "language",
    slash: true,
    options: [
        {
            name: "language",
            description: "Language to use (Portugues | English",
            required: true,
            type: "STRING",
        },
    ],

    callback: async ({ interaction, client, args }) => {
        const language = args[0].toLowerCase();
        if (!languages.languages.includes(language)) {
            return await embedCreator({
                embedData: {
                    title: "**❌ Error**",
                    description: `\n${lang(
                        interaction,
                        "languageCh",
                        "error-invalid-language"
                    )}`,
                    color: "RED",
                },
                interactionObj: interaction,
            });
        }
        const { member } = interaction,
            { user } = member!,
            u = user as User;
        await userl.findOneAndUpdate(
            { _id: u.id },
            { _id: u.id, account_settings: { language: language } },
            { upsert: true }
        );
        setUserLanguage(u, language);
        await loadUserSettings(client);

        return await embedCreator({
            embedData: {
                title: "**✅ Success**",
                description: `\n${lang(
                    interaction,
                    "languageCh",
                    "success-language-changed"
                ).replace("{0}", language)}`,
                color: "GREEN",
            },
            interactionObj: interaction,
        });
    },
} as ICommand;
