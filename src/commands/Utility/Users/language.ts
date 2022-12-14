import { CommandObject, CommandType } from "wokcommands";
import { Client, CommandInteraction, User } from "discord.js";
import { embedCreator } from "../../../configs/functions/embedCreator";
import lang, {
    setUserLanguage,
    loadUserSettings,
} from "../../../configs/languages/languages";
import languages from "../../../configs/languages/translations.json";
import userl from "../../../configs/db/models/user";

export default {
    description: "Changes your language between portuguese and english",
    category: "Utility - User Config",
    nameLocalizations: {
        "en-US": "language",
        "pt-BR": "idioma",
    },
    descriptionLocalizations: {
        "en-US": "Changes your language between portuguese and english",
        "pt-BR": "Altera seu idioma entre português e inglês",
    },
    type: CommandType.SLASH,
    options: [
        {
            name: "language",
            nameLocalizations: {
                "en-US": "language",
                "pt-BR": "idioma",
            },
            description: "Select your language",
            descriptionLocalizations: {
                "en-US": "Select your language",
                "pt-BR": "Selecione seu idioma.",
            },
            required: true,
            type: 3,
            choices: [
                {
                    name: "Português",
                    value: "portugues",
                },
                {
                    name: "English",
                    value: "english",
                }
            ]
        },
    ],

    callback: async ({ interaction, client, args, user }: {interaction: CommandInteraction, client: Client, args: string[], user: User} ) => {
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
} as CommandObject;
