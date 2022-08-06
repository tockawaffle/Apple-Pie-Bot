import { ICommand } from "wokcommands";
import { MessageAttachment } from "discord.js";
import { embedCreator } from "../../../../configs/functions/embedCreator";
import lang from "../../../../configs/languages/languages";

export default {
    category: "Utility - Servers",
    description: "Works only with image attachments.",
    slash: true,
    name: "emojiattach",
    guildOnly: true,
    options: [
        {
            name: "name",
            description: "The name of the emoji.",
            required: true,
            type: "STRING",
        },
        {
            name: "attachment",
            description: "If you're using an attachment, use this.",
            required: true,
            type: "ATTACHMENT",
        },
    ],

    callback: async ({ interaction, client, args }) => {
        const name = args[0] as string,
            attachment = interaction.options.getAttachment(
                "attachment"
            ) as MessageAttachment,
            { url } = attachment;

        try {
            const formatName = name.replace(/\s/g, "_"),
                emoji = await interaction.guild?.emojis.create(url, formatName);

            await embedCreator({
                embedData: {
                    title: `${lang(
                        interaction,
                        "defaults",
                        "success"
                    )} - ${lang(interaction, "emoji", "success")}`,
                    description: `${emoji}`,
                },
                interactionObj: interaction,
            });
        } catch (error) {
            console.log(error);
        }
    },
} as ICommand;
