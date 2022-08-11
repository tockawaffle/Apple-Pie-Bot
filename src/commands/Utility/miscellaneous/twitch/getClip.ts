import { dClip } from "../../../../../modules/cliprxyz";
import { embedCreator } from "../../../../configs/functions/embedCreator";
import { ICommand } from "../../../../../modules/wokcommands";
// import { modifyArgs } from "../../configs/functions/separateArgs"

export default {
    category: "Utility - Misc",
    description: "Gives you a link to download a clip from Twitch",
    slash: true,
    name: "twitch-clip",
    options: [
        {
            name: "clip-url",
            description: "The url of the clip you want to download",
            required: true,
            type: 3,
        },
    ],

    callback: async ({ interaction, client, args }) => {
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
} as ICommand;
