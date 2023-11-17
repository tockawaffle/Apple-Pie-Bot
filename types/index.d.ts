import { PlayerEvents } from "discord-player";
import {
    ChatInputApplicationCommandData,
    CommandInteraction,
    Guild,
    User,
    Client,
    Message,
    Interaction,
} from "discord.js";

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
        guildOnly?: boolean;
    }

    type Models = "GPT-4" | "GPT-4-VISION" | "GPT-3.5-16k" | "GPT-3.5";

    type ImageHandler = {
        type: "DM" | "GUILD";
    } & (
        | {
              type: "DM";
              interaction: Message;
          }
        | {
              type: "GUILD";
              interaction: Interaction;
          }
    );

    type MessageHandler = {
        model: Models;
    } & (
        | {
              type: "DM";
              interaction: Message;
          }
        | {
              type: "GUILD";
              interaction: CommandInteraction;
          }
        | {
              type: "GUILD_CONTINUATION";
              interaction: Message;
          }
    );

    type ErrorCodes =
        | "GUILD_NOT_FOUND"
        | "AI_DISABLED"
        | "CATEGORY_NOT_FOUND"
        | "CHANNELS_NOT_FOUND"
        | "USER_CHANNEL_NOT_FOUND"
        | "GUILD_CHANNEL_NOT_FOUND";

    type GuildErrors = "GUILD_NOT_FOUND" | "AI_DISABLED" | "CATEGORY_NOT_FOUND";
}

// Database types/interfaces

declare global {
    interface UserTier {
        has: boolean;
        memoryAmount: number;
        validUntil: number;
        priceTag: number;
    }

    interface IUser extends Document {
        _id: string;
        username: string;
        language: string;
        tier: {
            free: UserTier;
            basic: UserTier;
            premium: UserTier;
            ultimate: UserTier;
            enterprise: UserTier;
        };
        defaultDmModel: Models;
        economy: {
            ai: {
                gpt4: number;
                gpt3: number;
                gpt316k: number;
                gpt4Vision: number;
            };
            global: {
                amount: number;
                dailyReward: {
                    lastClaimed: number;
                    claimed: boolean;
                };
            };
            local: {
                [guildId: string]: {
                    amount: number;
                    dailyReward: {
                        lastClaimed: number;
                        claimed: boolean;
                    };
                };
            };
        };
    }

    type GuildTiers =
        | "free"
        | "basic"
        | "premium"
        | "ultimate"
        | "enterprise"
        | "partner";

    interface GuildSchema extends Document {
        _id: string;
        enabledAi: boolean;
        categoryAi?: string;
        channelsAi?: {
            [userId: string]: {
                channelId: string;
                model: Models;
            };
        };
        isPartner?: boolean;
        tier: GuildTiers;
        localEconomy?: {
            enabled: boolean;
            currencyName: string;
            dailyReward: {
                isActive: boolean;
                lastClaimed: number;
                amount: number;
            };
            icon?: string;
        };
    }
}
