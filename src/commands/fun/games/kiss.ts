import { CommandObject, CommandType } from "wokcommands";
import { CommandInteraction, EmbedBuilder, GuildMember } from "discord.js";
import { selectRandomImage } from "../../../configs/commands/misc/kiss";
import lang from "../../../configs/languages/languages";

export default {
    description: "Kisses someone.",
    category: "Games",
    type: CommandType.SLASH,
    nameLocalizations: {
        "en-US": "kiss",
        "pt-BR": "beijar",
    },
    descriptionLocalizations: {
        "en-US": "Kisses someone.",
        "pt-BR": "Beija alguém.",
    },
    options: [
        {
            name: "user",
            description: "User that is going to get kissed.",
            descriptionLocalizations: {
                "pt-BR": "Usuário que vai receber o beijo.",
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
        //Check guild.
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
                content: lang(interaction.user, "kiss", "self"),
                ephemeral: true,
            });
        }

        const embed = new EmbedBuilder()
            .setTitle(
                `${user!.user.username} ${lang(interaction.user, "kiss", "kissed")} **${
                    mentionedMember.displayName
                }**`
            )
            .setImage(selectRandomImage())
            .setColor("Random")
            .setTimestamp();

        return interaction.reply({
            embeds: [embed],
        });
    },
} as CommandObject;
