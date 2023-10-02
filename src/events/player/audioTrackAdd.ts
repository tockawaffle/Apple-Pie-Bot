import { Player, GuildQueue, Track } from "discord-player";

export default {
    name: "audioTrackAdd",
    once: false,
    async execute(
        queue: GuildQueue<any>,
        track: Track<unknown>,
        player: Player
    ) {
        const { client } = player;
        const { tracks, metadata } = queue;
        const trackLength = tracks.toArray().length;

        if (trackLength > 1) return;

        await metadata.followUp({
            content: client
                .translation(
                    metadata.user,
                    "music::audioTrackAdd",
                    "trackAdded"
                )
                .replace("{track}", track.title)
                .replace("{length}", trackLength.toString()),
        });
    },
};
