import { ICommand, ICallbackObject } from "../../../../modules/wokcommands/typings";
import { User } from "discord.js";
import { embedCreator } from "../../../configs/functions/embedCreator";
import lang, {
    setUserLanguage,
    loadUserSettings,
} from "../../../configs/languages/languages";
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
            type: 3,
        },
    ],

    callback: async ({ interaction, client, args, user }) => {
        const language = args[0].toLowerCase();
        if (!languages.languages.includes(language)) {
            return await embedCreator({
                embedData: {
                    title: "**❌ Error**",
                    description: `\n${lang(
                        user,
                        "languageCh",
                        "error-invalid-language"
                    )}`,
                },
                interactionObj: interaction,
            });
        }
        await userl.findOneAndUpdate(
            { _id: user.id },
            { _id: user.id, account_settings: { language: language } },
            { upsert: true }
        );
        setUserLanguage(user, language);
        await loadUserSettings(client);

        return await embedCreator({
            embedData: {
                title: "**✅ Success**",
                description: `\n${lang(
                    user,
                    "languageCh",
                    "success-language-changed"
                ).replace("{0}", language)}`,
                color: 32768,
            },
            interactionObj: interaction,
        });
    },
} as ICommand;
