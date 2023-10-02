import { Player, GuildQueue, Track } from "discord-player";

export default {
    name: "playerSkip",
    once: false,
    async execute(
        queue: GuildQueue<any>,
        track: Track<unknown>,
        player: Player
    ) {
        await queue.metadata.followUp({
            content: `Uma música foi pulada: [${track.title}](${track.url}).`,
        });
    },
};
