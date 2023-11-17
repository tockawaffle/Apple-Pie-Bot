import { CommandInteraction, Client, Message } from "discord.js";

import GuildSchema from "../../../../configs/database/schemas/Guild";
import ChatBotHandler from "../../../../configs/handlers/commands/chat/ChatBotHandler";

export default class GuildChatBotHandler {

    private async isValidInteraction(
        interaction: CommandInteraction
    ): Promise<{
        error: boolean;
        errorCode?: ErrorCodes;
    }> {
        try {
            const { guild, user } = interaction;

            if (!guild) return { error: true, errorCode: "GUILD_NOT_FOUND" };

            const guildData = await GuildSchema.findById(guild.id);
            if (!guildData || !guildData.enabledAi)
                return { error: true, errorCode: "AI_DISABLED" };
            if (!guildData.categoryAi)
                return { error: true, errorCode: "CATEGORY_NOT_FOUND" };
            if (!guildData.channelsAi)
                return { error: true, errorCode: "CHANNELS_NOT_FOUND" };

            const userChannel = guildData.channelsAi[user.id];
            if (!userChannel || !userChannel.channelId)
                return { error: true, errorCode: "USER_CHANNEL_NOT_FOUND" };
            if (!guild.channels.cache.get(userChannel.channelId))
                return { error: true, errorCode: "GUILD_CHANNEL_NOT_FOUND" };

            return { error: false };
        } catch (error: any) {
            console.log(error);
            return { error: true };
        }
    }

    private static async replyToInteraction(
        interaction: CommandInteraction,
        textId: string
    ) {
        const method = interaction.isRepliable() ? "reply" : "followUp";
        return await interaction[method]({
            content: interaction.client.translation(
                interaction.user,
                "events::chatbot",
                textId
            ),
        });
    }

    private static async handleGuildNotFoundError(
        interaction: CommandInteraction
    ) {
        await GuildSchema.create(
            {
                _id: interaction.guildId,
                enabledAi: false,
                categoryAi: null,
                channelsAi: null,
                isPartner: false,
                tier: "free",
                localEconomy: null,
            },
            { validateBeforeSave: true }
        );

        return GuildChatBotHandler.replyToInteraction(
            interaction,
            "guildNotFound"
        );
    }

    private static async guildError(
        error: ErrorCodes,
        interaction: CommandInteraction
    ) {
        switch (error) {
            case "AI_DISABLED":
            case "CATEGORY_NOT_FOUND":
                return GuildChatBotHandler.replyToInteraction(
                    interaction,
                    error.toLowerCase()
                );
            case "GUILD_NOT_FOUND":
                return GuildChatBotHandler.handleGuildNotFoundError(
                    interaction
                );
        }
    }
}
