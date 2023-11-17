import { Player, GuildQueue, Track } from "discord-player";

export default {
    name: "error",
    once: false,
    async execute(queue: GuildQueue<any>, error: any, player: Player) {
        await queue.metadata.followUp({
            content: `Ocorreu um erro ao tocar a música: ${error.message}`,
        });
    },
};
