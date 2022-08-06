import {
    MessageEmbed,
    MessageEmbedOptions,
    CommandInteraction,
    User,
} from "discord.js";

export async function embedCreator({
    embedData,
    interactionObj,
    followup,
}: {
    embedData: {
        title?: string;
        description: string;
        color?: string;
        image?: { url: string; height?: number; width?: number };
        thumbnail?: { url: string };
        fields?: { name: string; value: string }[];
        footer?: { text: string; icon_url?: string };
    };
    interactionObj?: CommandInteraction;
    followup?: boolean;
}): Promise<void> {
    // If there is not any of the required parameters, return error
    if (!embedData) throw new Error("No embed data provided");
    const { title, description, color, fields, image, thumbnail, footer } =
        embedData;

    if (!interactionObj)
        throw new Error("interactionObj is required for interaction");
    const { member } = interactionObj;
    const { user } = member!;
    const u = user as User;

    if (followup) {
        await interactionObj!.followUp({
            // Mention the user who sent the message
            content: `<@${u.id}>`,
            embeds: [
                new MessageEmbed({
                    author: {
                        name: u.username,
                        iconURL: u.avatarURL({ format: "png", dynamic: true }),
                    },
                    title: title ?? "",
                    description,
                    color: color ? color : 7419530,
                    fields: fields ? fields : [],
                    image: image ?? undefined,
                    thumbnail: thumbnail ?? undefined,
                    footer: footer ? footer : undefined,
                } as MessageEmbedOptions),
            ],
        });
    } else {
        await interactionObj!.reply({
            embeds: [
                new MessageEmbed({
                    author: {
                        name: u.username,
                        iconURL: u.avatarURL({ format: "png", dynamic: true }),
                    },
                    title: title ?? "",
                    description,
                    color: color ? color : 7419530,
                    fields: fields ? fields : [],
                    image: image ?? undefined,
                    thumbnail: thumbnail ?? undefined,
                    footer: footer ? footer : undefined,
                } as MessageEmbedOptions),
            ],
        });
    }
}
