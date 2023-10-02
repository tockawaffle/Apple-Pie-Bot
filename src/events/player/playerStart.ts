import { Player, GuildQueue, Track } from "discord-player";
import { EmbedBuilder } from "discord.js";

export default {
    name: "playerStart",
    once: false,
    async execute(
        queue: GuildQueue<any>,
        track: Track<unknown>,
        player: Player
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
                            Tocando agora: [${track.title}](${track.url}) - ${track.author}
                            Duração: ${track.duration}
                        `
                    )
                    .setImage(track.thumbnail),
            ],
        });
    },
};
