import { CommandObject, CommandType } from "@wokcommands/"
import { User, CommandInteractionOptionResolver, ClientUser, CommandInteraction, Client } from "discord.js";
import { embedCreator } from "../../../configs/functions/embedCreator";

export default {
    description:
        "Works with mentions, if none, it'll return your profile picture.",
    type: CommandType.SLASH,
    category: "Utility - Users",
    nameLocalizations: {
        "pt-BR": "avatar",
    },
    descriptionLocalizations: {
        "en-US": "Works with mentions, if none, it'll return your profile picture.",
        "pt-BR": "Funciona com menções, se não tiver nenhuma, mostrará sua foto de perfil.",
    },
    options: [
        {
            name: "user",
            description: "The user you want to get the avatar of",
            descriptionLocalizations: {
                "en-US": "The user you want to get the avatar of",
                "pt-BR": "O usuário que você deseja obter o avatar",
            },
            nameLocalizations: {
                "en-US": "user",
                "pt-BR": "usuário",
            },
            required: false,
            type: 6,
        },
    ],

    callback: async ({ interaction }: {interaction: CommandInteraction}) => {
        async function sendAvatar(username: string, avatar: string) {
            return await embedCreator({
                embedData: {
                    description: `🔎${username}`,
                    image: {
                        url: avatar,
                    },
                },
                interactionObj: interaction,
            });
        }
        const { user } = interaction,
            u = user
        const options = interaction.options as unknown as CommandInteractionOptionResolver;
        if (options!.data[0]) {
            const value = options!.data[0]!.user as User | ClientUser;
            return await sendAvatar(
                value.username,
                value.displayAvatarURL({
                    forceStatic: false,
                    size: 2048,
                }) as string
            );
        } else {
            return await embedCreator({
                embedData: {
                    description: `🔎${user.username}`,
                    image: {
                        url: u.displayAvatarURL({
                            forceStatic: false,
                            size: 2048,
                        }),
                    },
                },
                interactionObj: interaction,
            });
        }
    },
} as CommandObject;
