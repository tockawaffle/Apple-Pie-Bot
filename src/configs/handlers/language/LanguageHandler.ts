import { Client, User } from "discord.js";
import UserSchema from "../../database/schemas/User";
import translationsData from "./translations";

export default class Polyglot {
    private userLanguage: UserLanguages = {};
    private readonly defaultLanguage: SupportedLanguages = "en-US";
    private translations = translationsData.translations;

    public async loadUserSettings(client: Client): Promise<void> {
        const userIds = client.users.cache.map((user) => user.id);

        const foundUsers = await UserSchema.find({ _id: { $in: userIds } });

        for (const foundUser of foundUsers) {
            this.userLanguage[foundUser._id] =
                (foundUser?.language as SupportedLanguages) ||
                this.defaultLanguage;
        }

        const newUsers = userIds.filter(
            (userId) =>
                !foundUsers.some((user: { _id: string }) => user._id === userId)
        );

        for (const newUser of newUsers) {
            if (client.users.cache.get(newUser)?.bot) continue;

            this.userLanguage[newUser] = this.defaultLanguage;
            await UserSchema.create({
                _id: newUser,
                username: client.users.cache.get(newUser)?.username,
                language: this.defaultLanguage,
            });
        }

        for (const [_, user] of client.users.cache) {
            user.lang = this.userLanguage[user.id];
        }
    }

    public setUserLanguage(user: User, language: SupportedLanguages): void {
        this.userLanguage[user.id] = language;
        user.lang = language;
    }

    public getTranslation(
        user: User,
        commandName: string,
        textId: string
    ): string {
        if (!translationsData.translations[commandName]?.[textId]) {
            throw new Error(`Text ID: ${textId} is undefined`);
        }

        const selectedLanguage = this.userLanguage[user.id];
        return this.translations[commandName][textId][selectedLanguage];
    }
}
