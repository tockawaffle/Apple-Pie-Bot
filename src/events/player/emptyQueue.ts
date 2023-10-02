import { Player, GuildQueue, Track } from "discord-player";

export default {
    name: "emptyQueue",
    once: false,
    async execute(
        queue: GuildQueue<any>,
        player: Player
    ) {
        await queue.metadata.followUp({
            content: `A fila de músicas está vazia, então eu sai!`,
        });
    },
};
