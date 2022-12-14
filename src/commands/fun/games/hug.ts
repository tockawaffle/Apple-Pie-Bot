import { CommandObject, CommandType } from "wokcommands";
import {
    Client,
    CommandInteraction,
    EmbedBuilder,
    GuildMember,
} from "discord.js";
import { selectRandomImage } from "../../../configs/commands/misc/hug";
import lang from "../../../configs/languages/languages";

export default {
    description: "Hugs someone.",
    type: CommandType.SLASH,
    nameLocalizations: {
        "en-US": "hug",
        "pt-BR": "abraçar",
    },
    descriptionLocalizations: {
        "en-US": "Hugs someone.",
        "pt-BR": "Abraça alguém.",
    },
    category: "Games",
    options: [
        {
            name: "user",
            description: "User that'll get hugged.",
            descriptionLocalizations: {
                "en-US": "User that'll get hugged.",
                "pt-BR": "Usuário que receberá o abraço.",
            },
            nameLocalizations: {
                "en-US": "user",
                "pt-BR": "usuário",
            },
            required: true,
            type: 6,
        },
    ],
    callback: async ({
        client,
        args,
        interaction,
    }: {
        client: Client;
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
            const embed = new EmbedBuilder()
                .setTitle(
                    `${client.user!.username} ${lang(
                        interaction.user,
                        "hug",
                        "hugged"
                    )} **${mentionedMember.displayName}**`
                )
                .setImage(selectRandomImage())
                .setColor("Random")
                .setTimestamp();

            return interaction.reply({
                content: lang(interaction.user, "hug", "self"),
                embeds: [embed],
            });
        }

        const embed = new EmbedBuilder()
            .setTitle(
                `${user!.user.username} deu um abraço em ${
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
