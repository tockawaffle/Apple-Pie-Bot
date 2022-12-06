import { EmbedBuilder, Embed, EmbedAuthorData } from "discord.js";
import { CommandUsage } from "wokcommands";

export async function embedCreator({
    embedData,
    interactionObj,
    followup,
    ephemeral
}: {
    embedData: {
        title?: string;
        description: string;
        color?: Embed["color"];
        image?: { url: string; height?: number; width?: number };
        thumbnail?: { url: string };
        fields?: { name: string; value: string }[];
        footer?: { text: string; icon_url?: string };
    };
    interactionObj?: CommandUsage["interaction"];
    followup?: boolean;
    ephemeral?: boolean;
}): Promise<void> {
    // If there is not any of the required parameters, return error
    if (!embedData) throw new Error("No embed data provided");
    const { title, description, color, fields, image, thumbnail, footer } =
        embedData;
    if (!interactionObj)
        throw new Error("interactionObj is required for interaction");
    const { member } = interactionObj;
    const { user } = member!;
    const u = user as CommandUsage["user"];

    if (followup) {
        await interactionObj!.followUp({
            // Mention the user who sent the message
            content: `<@${u.id}>`,
            embeds: [
                new EmbedBuilder({
                    author: {
                        name: u.username,
                        iconURL: u.avatarURL({ forceStatic: false }) as string,
                    },
                    title: title ?? "",
                    description,
                    color: color ? color : 7419530,
                    fields: fields ? fields : [],
                    image: image ?? undefined,
                    thumbnail: thumbnail ?? undefined,
                    footer: footer ? footer : undefined,
                }),
            ],
            ephemeral: ephemeral ?? false,
        });
    } else {
        
        await interactionObj!.reply({
            embeds: [
                new EmbedBuilder({
                    author: {
                        name: u.username,
                        icon_url: u.avatarURL({ forceStatic: false }),
                    } as EmbedAuthorData,
                    title: title ?? "",
                    description,
                    color: color ? color : 7419530,
                    fields: fields ? fields : [],
                    image: image ?? undefined,
                    thumbnail: thumbnail ?? undefined,
                    footer: footer ? footer : undefined,
                }),
            ],
            ephemeral: ephemeral ?? false,
        });
    }
}
