import {
    ApplicationCommandOptionType,
    Client,
    CommandInteraction,
    User,
    EmbedBuilder,
} from "discord.js";

function createEmbed(
    author: User,
    footerText: string,
    imageUrl: string
): EmbedBuilder {
    return new EmbedBuilder()
        .setAuthor({
            name: author.username,
            iconURL: author.displayAvatarURL() ?? undefined,
        })
        .setFooter({
            text: footerText,
            iconURL: author.displayAvatarURL() ?? undefined,
        })
        .setColor("Random")
        .setImage(imageUrl);
}

export default {
    name: "avatar",
    description: "Shows yours or someone's avatar.",
    options: [
        {
            name: "user",
            description: "The user to show the avatar.",
            type: ApplicationCommandOptionType.User,
            required: false,
        },
    ],
    execute: async ({
        client,
        interaction,
        user,
        mention,
    }: {
        client: Client;
        interaction: CommandInteraction;
        user: User;
        mention: User;
    }) => {
        try {
            if (mention) {
                const getUser = client.users.cache.get(mention.id);
                if (getUser) {
                    const footerText = client
                        .translation(user, "avatar", "footerMentioned")
                        .replace("{mention}", mention.username);
                    const embed = createEmbed(
                        user,
                        footerText,
                        getUser.displayAvatarURL({ size: 2048 })
                    );
                    return await interaction.reply({ embeds: [embed] });
                } else {
                    const errorMessage = client
                        .translation(user, "avatar", "error")
                        .replace("{error}", "User not found on client cache.");
                    return await interaction.reply({ content: errorMessage });
                }
            } else {
                const footerText = client.translation(
                    user,
                    "avatar",
                    "footerSelf"
                );
                const embed = createEmbed(
                    user,
                    footerText,
                    user.displayAvatarURL({ size: 2048 })
                );
                return await interaction.reply({ embeds: [embed] });
            }
        } catch (error: any) {
            console.error("An error occurred in the avatar command:", error);
            await interaction.reply({
                content:
                    "An unexpected error occurred. Please try again later.",
                ephemeral: true,
            });
        }
    },
} as Command;
