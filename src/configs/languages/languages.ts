import { Client, CommandInteraction, User } from "discord.js";
import { ICallbackObject } from "../../../modules/wokcommands"

import user from "../db/models/user";
import translations from "./translations.json";

const userLanguage: any = {};
async function loadUserSettings(client: Client): Promise<void> {
    for (const users of client.users.cache) {
        const userId = users[0],
            result = await user.findOne({ _id: userId });
        userLanguage[userId] = result
            ? result!.account_settings.language
            : await user.findOneAndUpdate(
                  { _id: userId },
                  {
                      _id: userId,
                      account_settings: {
                          language: "english",
                      },
                  },
                  { upsert: true }
              );
    }
}
function setUserLanguage(user: User, languages: string) {
    userLanguage[user.id] = languages;
}

export default (
    interaction: ICallbackObject["interaction"] | User,
    commandName: any,
    textId: any
): string => {
    const t = translations.traduzido as any;
    let u: User;
    if (interaction instanceof CommandInteraction) {
        const { member } = interaction,
            { user } = member!;
        u = user as User;
    } else if (interaction instanceof User) {
        u = interaction;
    }
    if (!t[commandName][textId]) {
        throw new Error(`Text ID: ${textId} is undefined`);
    }
    const selectedLanguage = userLanguage[u!.id];
    return t[commandName][textId][selectedLanguage];
};

export { loadUserSettings, setUserLanguage };
