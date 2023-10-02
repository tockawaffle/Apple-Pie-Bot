import { Client, CommandInteraction, GuildMember } from "discord.js";
import { useMainPlayer } from "discord-player";

export default async function play(
    interaction: CommandInteraction,
    client: Client,
    url: string
) {
    await interaction.deferReply();

    try {
        const channel = (interaction.member as GuildMember).voice.channel;

        if (!channel) {
            return await interaction.followUp({
                content: client.translation(
                    interaction.user,
                    "music::play",
                    "notConnected"
                ),
            });
        }

        const meConnected = (
            interaction.guild!.members.cache.get(client.user!.id) as GuildMember
        ).voice.channel;

        if (meConnected) {
            if (meConnected.id !== channel.id) {
                return await interaction.followUp({
                    content: client.translation(
                        interaction.user,
                        "music::play",
                        "connectedOnAnotherChannel"
                    ),
                });
            }
        }

        const player = useMainPlayer();
        await player!.play(channel, url, {
            nodeOptions: {
                metadata: interaction,
            },
        });
    } catch (error: any) {
        console.log(error);
        await interaction.followUp({
            content: client
                .translation(interaction.user, "music::play", "error")
                .replace("{error}", error.message),
        });
    }
}
