import { Client, CommandInteraction, User } from "discord.js";
import { CommandObject, CommandType } from "wokcommands";  
import { embedCreator } from "../../../../configs/functions/embedCreator";
import lang from "../../../../configs/languages/languages";

export default {
    category: "Utility - Servers",
    description:
        "Add emojis to your guild! You can use this command with a url or a custom emoji.",
    type: CommandType.SLASH,
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
    callback: async ({ interaction, args, user }: {interaction: CommandInteraction, args: string[], user: User}) => {
        const name = args[0] as string,
            emoji = args[1] as string,
            guild = interaction.guild;

        try {
            const emojiC = await guild?.emojis.create({attachment: emoji, name});

            await embedCreator({
                embedData: {
                    title: `${lang(
                        user,
                        "defaults",
                        "success"
                    )} - ${lang(user, "emoji", "success")}`,
                    description: `${emojiC}`,
                },
                interactionObj: interaction,
            });
        } catch (error) {}
    },
} as CommandObject;
