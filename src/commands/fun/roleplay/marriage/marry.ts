import { CommandObject, CommandType } from "wokcommands";
import {
    CommandInteraction,
    EmbedBuilder,
    GuildMember,
    MessageReaction,
    User,
} from "discord.js";
import { selectRandomImage } from "../../../../configs/commands/misc/marry";
import userSchema from "../../../../configs/db/models/user";
import lang from "../../../../configs/languages/languages";
import moment from "moment";

export default {
    description: "Case com alguém! Desde que a pessoa aceite...",
    category: "Roleplay",
    type: CommandType.SLASH,
    nameLocalizations: {
        "pt-BR": "casar",
    },
    descriptionLocalizations: {
        "pt-BR": "Case com alguém! Desde que a pessoa aceite...",
        "en-US": "Marry someone! As long as the person accepts...",
    },
    options: [
        {
            name: "user",
            description: "User that you'll ask in marriage.",
            descriptionLocalizations: {
                "pt-BR": "Usuário que você irá pedir em casamento.",
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

        const userDb = await userSchema.findOne({
            _id: user!.user.id,
        });

        const mentionedUserDb = await userSchema.findOne({
            _id: mentionedMember.user.id,
        })

        if (mentionedMember.user.id === user!.user.id) {
            return interaction.reply({
                content: lang(interaction.user, "marry", "self"),
                ephemeral: true,
            });
        } 
        if (userDb?.marriedTo?.user_id) {
            return interaction.reply({
                content: lang(interaction.user, "marry", "alreadyMarried").replace("{0}", userDb!.marriedTo!.user_name! as string),
                ephemeral: true,
            });
        } else if(mentionedUserDb?.marriedTo?.user_id) {
            return interaction.reply({
                content: lang(interaction.user, "marry", "mentionedAlreadyMarried").replace("{0}", mentionedMember.user.username).replace("{1}", mentionedUserDb!.marriedTo!.user_name! as string),
                ephemeral: true,
            });
        }

        //Ask the mentioned member if he/she wants to marry the user
        const embed = new EmbedBuilder()
            .setTitle(lang(user!.user as User, "marry", "askMarryTitle"))
            .setDescription(
                `${user!.user.username} ${lang(
                    interaction.user,
                    "marry",
                    "askMarry"
                )}`
            )
            .setColor("Random")
            .setImage(selectRandomImage());

        const msg = await interaction.reply({
            content: `${mentionedMember.user}`,
            embeds: [embed],
            fetchReply: true,
        });

        await msg.react("✅");
        await msg.react("❌");

        const filter = (reaction: any, user: any) => {
            return (
                ["✅", "❌"].includes(reaction.emoji.name) &&
                user.id === mentionedMember.user.id
            );
        };

        const collector = msg.createReactionCollector({ filter, time: 15000 });

        collector.on(
            "collect",
            async (reaction: MessageReaction, user: User) => {
                if (reaction.emoji.name === "✅") {
                    await userSchema.findOneAndUpdate(
                        {
                            _id: interaction.user.id,
                        },
                        {
                            marriedTo: {
                                user_id: mentionedMember.id,
                                user_name: mentionedMember.user.username,
                                marryDate: moment().format("DD/MM/YYYY"),
                                marriedAt: {
                                    guild_id: interaction.guild!.id,
                                    guild_name: interaction.guild!.name,
                                }
                            },
                        }
                    );

                    await userSchema.findOneAndUpdate(
                        {
                            _id: mentionedMember.user.id,
                        },
                        {
                            marriedTo: {
                                user_id: interaction.user.id,
                                user_name: interaction.user.username,
                                marryDate: moment().format("DD/MM/YYYY"),
                                marriedAt: {
                                    guild_id: interaction.guild!.id,
                                    guild_name: interaction.guild!.name,
                                }
                            },
                        }
                    );

                    const embed = new EmbedBuilder()
                        .setTitle(lang(user, "marry", "marryAcceptedTitle"))
                        .setDescription(
                            `${lang(
                                interaction.user,
                                "marry",
                                "marryAccepted"
                            ).replace("{0}", interaction.user.username)}`
                        )
                        .setColor("Random")
                        .setImage(selectRandomImage());

                    await interaction.editReply({
                        content: `${interaction.user} 💘 ${user}`,
                        embeds: [embed],
                    });

                    return collector.stop();
                } else if (reaction.emoji.name === "❌") {
                    const embed = new EmbedBuilder()
                        .setTitle(lang(user, "marry", "marryDeniedTitle"))
                        .setDescription(
                            `${lang(
                                interaction.user,
                                "marry",
                                "marryDenied"
                            ).replace("{0}", mentionedMember.user.username)}`
                        )
                        .setColor("Random")
                        .setImage(selectRandomImage());

                    await interaction.editReply({
                        content: `${interaction.user} 💔 ${mentionedMember.user}`,
                        embeds: [embed],
                    });

                    return collector.stop();
                }
            }
        );
    },
} as CommandObject;
