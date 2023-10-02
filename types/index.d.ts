import { PlayerEvents } from "discord-player";
import { ChatInputApplicationCommandData } from "discord.js";

declare global {
    type Events = {
        name: string;
        execute: (...args: any[]) => void;
        once: boolean;
    };

    type PlayerEvent = {
        name: keyof PlayerEvents;
        execute: (...args: any[]) => void;
        once: boolean;
    };

    type CommandExecuteArgs = {
        interaction: CommandInteraction;
        client: Client;
        user: User;
        guild: Guild | null;
        mention?: User;
    };

    type SupportedLanguages = "en-US" | "pt-BR" | "epo";
    type UserLanguages = { [userId: string]: SupportedLanguages };

    type CommandTranslations = {
        [key in "en-US" | "pt-BR" | "epo"]: string;
    };

    type CommandTranslation = {
        [commandString: string]: CommandTranslations;
    };

    type TranslationsExport = {
        supportedLanguages: ["en-US", "pt-BR", "epo"];
        translations: {
            [commandName: string]: CommandTranslation;
        };
    };

    interface Command extends ChatInputApplicationCommandData {
        execute(args: CommandExecuteArgs): void;
    }
}
