import { Client, CommandInteraction } from "discord.js";
import { dClip } from "@cliprxyz/";
import { embedCreator } from "../../../../configs/functions/embedCreator";
import { CommandObject, CommandType } from "@wokcommands/";
// import { modifyArgs } from "../../configs/functions/separateArgs"

export default {
    description: "Gives you a link to download a clip from Twitch",
    type: CommandType.SLASH,
    category: "Utility - Misc",
    descriptionLocalizations: {
        "en-US": "Gives you a link to download a clip from Twitch",
        "pt-BR": "Te dá um link para baixar um clip do Twitch",
    },
    nameLocalizations: {
        "pt-BR": "baixarclip",
    },
    options: [
        {
            name: "clip-url",
            description: "The url of the clip you want to download",
            descriptionLocalizations: {
                "en-US": "The url of the clip you want to download",
                "pt-BR": "A url do clip que você quer baixar",
            },
            nameLocalizations: {
                "en-US": "clip-url",
                "pt-BR": "url-do-clip",
            },
            required: true,
            type: 3,
        },
    ],

    callback: async ({ interaction, client, args }: {interaction: CommandInteraction, client: Client, args: string[]}) => {
        const down = await dClip({ clipId: args[0] });

        if (down.code !== 200)
            return interaction.reply(
                `Could not download clip: ${down.message}`
            );
        await interaction.reply("⏳ Downloading clip...");
        return await embedCreator({
            embedData: {
                title: `${down.clipName}`,
                description: `[Click here to download](${down.clipUrl})`,
                thumbnail: {
                    url: down.creatorPictureUrl as string,
                },
                fields: [
                    {
                        name: "Creator",
                        value: `[${down.creatorUsername}](${down.creatorUrl})`,
                    },
                    {
                        name: "Clipped on",
                        value: `${down.clippedOn}`,
                    },
                    {
                        name: "Was playing",
                        value: `${down.creatorWasPlaying}`,
                    },
                ],
            },
            interactionObj: interaction,
            followup: true,
        });
    },
} as CommandObject;
