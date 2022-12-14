import { CommandObject, CommandType } from "wokcommands";
import { CommandInteraction, EmbedBuilder, GuildMember } from "discord.js";
import { selectRandomImage } from "../../../configs/commands/misc/hug";
import lang from "../../../configs/languages/languages";

export default {
    description: "Slaps someone.",
    category: "Games",
    type: CommandType.SLASH,
    nameLocalizations: {
        "pt-BR": "tapa",
    },
    descriptionLocalizations: {
        "pt-BR": "Da um tapa em alguém.",
    },
    options: [
        {
            name: "user",
            description: "User that is going to get slapped.",
            descriptionLocalizations: {
                "pt-BR": "Usuário que vai receber o tapa.",
            },
            nameLocalizations: {
                "pt-BR": "usuário",
            },
            required: true,
            type: 6,
        },
    ],
    callback: async ({
        args,
        interaction,
    }: {
        args: string[];
        interaction: CommandInteraction;
    }) => {
        if (!interaction.guild)
            return interaction.reply({
                content: lang(interaction.user, "defaults", "guildOnly"),
                ephemeral: true,
            });

        const mentionedUser = args[0] as string;
        const mentionedMember = interaction.guild.members.cache.get(
            mentionedUser
        ) as GuildMember;
        const user = interaction.member;

        if (!mentionedMember) {
            return interaction.reply({
                content: lang(interaction.user, "defaults", "noMemberFound"),
                ephemeral: true,
            });
        }

        if (mentionedMember.user.id === user!.user.id) {
            return interaction.reply({
                content: lang(interaction.user, "slap", "self"),
                ephemeral: true,
            });
        }

        const embed = new EmbedBuilder()
            .setTitle(
                `${user!.user.username} ${lang(interaction.user, "slap", "slapped")} ${
                    mentionedMember.displayName
                }`
            )
            .setImage(selectRandomImage())
            .setColor("Random")
            .setTimestamp();

        return interaction.reply({
            embeds: [embed],
        });
    },
} as CommandObject;
