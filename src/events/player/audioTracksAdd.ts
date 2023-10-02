import { Player, GuildQueue, Track } from "discord-player";
import { Client } from "discord.js";

export default {
    name: "audioTracksAdd",
    once: false,
    async execute(
        queue: GuildQueue<any>,
        track: Track<unknown>,
        player: Player,
        client: Client
    ) {
        const { tracks, metadata } = queue;
        const trackLength = tracks.toArray().length;

        if (trackLength <= 1) return;

        const isPlaylist = track.playlist ? true : false;
        console.log(isPlaylist);
        let message: string = "";
        if (isPlaylist) {
            message = client.translation(
                metadata.user,
                "events::music",
                "playlistAdded"
            );
        } else {
            message = client.translation(
                metadata.user,
                "events::music",
                "tracksAdded"
            );
        }

        await metadata.followUp({
            content: message
                .replace("{track}", track.title)
                .replace("{length}", trackLength.toString()),
        });
    },
};
