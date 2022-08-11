import { ICommand } from "../../../../../modules/wokcommands";  
import { embedCreator } from "../../../../configs/functions/embedCreator";
import lang from "../../../../configs/languages/languages";

export default {
    category: "Utility - Servers",
    description:
        "Add emojis to your guild! You can use this command with a url or a custom emoji.",
    slash: true,
    name: "emoji",
    guildOnly: true,
    options: [
        {
            name: "name",
            description: "Name your emoji!",
            required: true,
            type: 3,
        },
        {
            name: "value",
            description: "Either use a url, or a custom emoji.",
            required: true,
            type: 3,
        },
    ],
    testOnly: true,
    callback: async ({ interaction, client, args }) => {
        const name = args[0] as string,
            emoji = args[1] as string,
            guild = interaction.guild;

        try {
            const emojiC = await guild?.emojis.create({attachment: emoji, name});

            await embedCreator({
                embedData: {
                    title: `${lang(
                        interaction,
                        "defaults",
                        "success"
                    )} - ${lang(interaction, "emoji", "success")}`,
                    description: `${emojiC}`,
                },
                interactionObj: interaction,
            });
        } catch (error) {}
    },
} as ICommand;
