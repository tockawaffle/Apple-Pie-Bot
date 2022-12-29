import { Client, CommandInteraction, User } from "discord.js";
import { CommandObject, CommandType } from "@wokcommands/";  
import { embedCreator } from "../../../../configs/functions/embedCreator";
import lang from "../../../../configs/languages/languages";

export default {
    description:
        "Add emojis to your guild! You can use this command with a url or a custom emoji.",
    type: CommandType.SLASH,
    nameLocalizations: {
        "pt-BR": "emoji"
    },
    descriptionLocalizations: {
        "pt-BR": "Adicione emojis ao seu servidor! Você pode usar este comando com uma url ou um emoji customizado."
    },
    category: "Utility - Servers",
    options: [
        {
            name: "name",
            description: "Name your emoji!",
            required: true,
            type: 3,
        },
        {
            name: "choice",
            description: "Select between a url/emoji or an attachment!",
            descriptionLocalizations: {
                "en-US": "Select between a url/emoji or an attachment!",
                "pt-BR": "Selecione entre uma url/emoji ou um anexo!",
            },
            required: true,
            type: 3,
            choices: [
                {
                    name: "Url or Emoji",
                    value: "url",
                },
                {
                    name: "Attachment",
                    value: "attachment",
                }
            ]
        },
        {
            name: "attachment",
            description: "If you're using an attachment, use this.",
            required: false,
            type: 11,
        },
        {
            name: "emoji",
            description: "If you choose 'Url/Emoji', use this. Either a url or a custom emoji.",
            required: false,
            type: 3,
        }
    ],
    callback: async ({ interaction, args, user }: {interaction: CommandInteraction, args: string[], user: User}) => {
        
        const name = args[0] as string,
            guild = interaction.guild;
        try {
            if(args[1] === "url") {
                const emoji = args[1] as string
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
            } else if(args[1] === "attachment") {
                const attachment = interaction.options.resolved?.attachments!.first()!.attachment;
                const formatName = name.replace(/\s/g, "_"),
                    emoji = await interaction.guild?.emojis.create({
                        attachment: attachment as string,
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
            }
            
        } catch (error) {
            console.log(error)
        }
    },
} as CommandObject;
