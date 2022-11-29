import { Client, CommandInteraction, User } from "discord.js";
import { CommandObject, CommandType } from "wokcommands";
import { embedCreator } from "../../../../configs/functions/embedCreator";
import lang from "../../../../configs/languages/languages";

export default {
    category: "Utility - Servers",
    description: "Works only with image attachments.",
    type: CommandType.SLASH,
    name: "emojiattach",
    guildOnly: true,
    options: [
        {
            name: "name",
            description: "The name of the emoji.",
            required: true,
            type: 3,
        },
        {
            name: "attachment",
            description: "If you're using an attachment, use this.",
            required: true,
            type: 11,
        },
    ],

    callback: async ({ interaction, args, user }: {interaction: CommandInteraction, args: string[], user: User}) => {
        const name = args[0] as string,
            attachment =
                interaction.options.resolved?.attachments?.first()!.attachment;

        try {
            const formatName = name.replace(/\s/g, "_"),
                emoji = await interaction.guild?.emojis.create({
                    attachment: attachment as Buffer,
                    name: formatName,
                });

            await embedCreator({
                embedData: {
                    title: `${lang(user, "defaults", "success")} - ${lang(
                        user,
                        "emoji",
                        "success"
                    )}`,
                    description: `${emoji}`,
                },
                interactionObj: interaction,
            });
        } catch (error) {
            console.log(error);
        }
    },
} as CommandObject;
