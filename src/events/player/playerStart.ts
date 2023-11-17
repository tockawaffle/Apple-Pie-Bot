import { Player, GuildQueue, Track } from "discord-player";
import { Client, EmbedBuilder } from "discord.js";

export default {
    name: "playerStart",
    once: false,
    async execute(
        queue: GuildQueue<any>,
        track: Track<unknown>,
        player: Player,
        client: Client
    ) {
        await queue.metadata.followUp({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: queue.guild.name,
                        iconURL: queue.guild.iconURL()!,
                    })
                    .setColor("Random")
                    .setDescription(
                        `
                            ${client
                                .translation(
                                    queue.metadata.user,
                                    "events::music",
                                    "startedPlaying"
                                )
                                .replace(
                                    "{track}",
                                    `[${track.title}](${track.url})`
                                )
                                .replace("{length}", `${track.duration}`)
                                .replace("{duration}", `${track.duration}`)}
                        `
                    )
                    .setImage(track.thumbnail),
            ],
        });
    },
};
