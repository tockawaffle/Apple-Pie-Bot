import { Player, GuildQueue } from "discord-player";

export default {
    name: "playerError",
    once: false,
    async execute(
        queue: GuildQueue<any>,
        error: any,
        player: Player
    ) {
        await queue.metadata.followUp({
            content: `O player encontrou um erro: ${error.message}`,
        });
    },
};
