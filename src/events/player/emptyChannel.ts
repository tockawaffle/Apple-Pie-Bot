import { Player, GuildQueue, Track } from "discord-player";

export default {
    name: "emptyChannel",
    once: false,
    async execute(queue: GuildQueue<any>, player: Player) {
        await queue.metadata.followUp({
            content: `Não há mais ninguém no canal de voz, então eu sai!`,
        });
    },
};
