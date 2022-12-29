import { CommandObject, CommandType, CooldownTypes } from "@wokcommands/";
import {
    CommandInteraction,
    EmbedBuilder,
    GuildMember,
    MessageReaction,
    User,
} from "discord.js";
import { selectRandomImage } from "../../../../configs/commands/misc/divorce";
import userSchema from "../../../../configs/db/models/user";
import lang from "../../../../configs/languages/languages";
import moment from "moment"

export default {
    description: "Divorces the one you're married to.",
    category: "Roleplay",
    type: CommandType.SLASH,
    nameLocalizations: {
        "pt-BR": "divorciar",
    },
    descriptionLocalizations: {
        "pt-BR": "Se divorcia de quem você está casado.",
        "en-US": "Divorces the one you're married to."
    },
    options: [
        {
            name: "user",
            description: "User that you'll ask in marriage.",
            descriptionLocalizations: {
                "pt-BR": "Usuário que você irá pedir em casamento.",
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

        const userDb = await userSchema.findOne({
            _id: user!.user.id,
        });

        const nextDivorceTry: Date = userDb?.marriedTo?.nextDivorceTry as Date
        const now = new Date();
        const divorceTries: number = userDb?.marriedTo?.divorceTries as number

        if(divorceTries >= 3) {
            await userSchema.findOneAndUpdate(
                {
                    _id: mentionedMember.user.id,
                },
                {
                    $unset: {
                        marriedTo: {},
                    },
                    $push: {
                        wasMarriedTo: {
                            user_id: interaction.user.id,
                            user_name: interaction.user.username,
                        },
                    },
                }
            );

            await userSchema.findOneAndUpdate(
                {
                    _id: interaction.user.id,
                },
                {
                    $unset: {
                        marriedTo: {},
                    },
                    $push: {
                        wasMarriedTo: {
                            user_id: mentionedMember.user.id,
                            user_name: mentionedMember.user.username,
                        },
                    },
                }
            );

            return interaction.reply({
                content: lang(interaction.user, "divorce", "forceDivorce").replace("{0}", mentionedMember.user.username),
            });
        } else if(nextDivorceTry) {
            if(now < nextDivorceTry) {
                return interaction.reply({
                    content: lang(
                        interaction.user,
                        "divorce",
                        "cooldown"
                    ).replace("{0}", moment(nextDivorceTry).format("DD/MM/YYYY HH:mm:ss")),
                    ephemeral: true,
                });
            }
        }

        const mentionedUserDb = await userSchema.findOne({
            _id: mentionedMember.user.id,
        });

        if (mentionedMember.user.id === user!.user.id) {
            return interaction.reply({
                content: lang(interaction.user, "divorce", "self"),
                ephemeral: true,
            });
        }
        if (!userDb?.marriedTo?.user_id) {
            return interaction.reply({
                content: lang(
                    interaction.user,
                    "divorce",
                    "notMarried"
                ).replace("{0}", mentionedMember.user.username),
                ephemeral: true,
            });
        } else if (!mentionedUserDb?.marriedTo?.user_id) {
            return interaction.reply({
                content: lang(
                    interaction.user,
                    "divorce",
                    "mentionedNotMarried"
                )
                    .replace("{0}", mentionedMember.user.username)
                    .replace("{1}", interaction.user.username),
                ephemeral: true,
            });
        } else if(userDb?.marriedTo?.user_id !== mentionedMember.user.id) {
            return interaction.reply({
                content: lang(
                    interaction.user,
                    "divorce",
                    "notMarriedWith"
                ).replace("{0}", mentionedMember.user.username),
                ephemeral: true,
            });
        }

        //Ask the mentioned member if he/she wants to divorce the user
        const embed = new EmbedBuilder()
            .setTitle(lang(user!.user as User, "divorce", "divorceAskTitle"))
            .setDescription(
                `${user!.user.username} ${lang(
                    interaction.user,
                    "divorce",
                    "divorceAsk"
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
                            $unset: {
                                marriedTo: {},
                            },
                            $push: {
                                wasMarriedTo: {
                                    user_id: mentionedMember.user.id,
                                    user_name: mentionedMember.user.username,
                                },
                            },
                        }
                    );

                    await userSchema.findOneAndUpdate(
                        {
                            _id: mentionedMember.user.id,
                        },
                        {
                            $unset: {
                                marriedTo: {},
                            },
                            $push: {
                                wasMarriedTo: {
                                    user_id: interaction.user.id,
                                    user_name: interaction.user.username,
                                },
                            },
                        }
                    );

                    const embed = new EmbedBuilder()
                        .setTitle(lang(user, "divorce", "divorceAcceptedTitle"))
                        .setDescription(
                            `${lang(
                                interaction.user,
                                "divorce",
                                "divorceAccepted"
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

                    //Set the next divorce try date to 24 hours from now and increase the divorce tries by 1
                    let tries: number = userDb?.marriedTo?.divorceTries as number
                    if(!tries) {
                        tries = +1;
                    } else tries = tries + 1;

                    await userSchema.findOneAndUpdate(
                        {
                            _id: interaction.user.id,
                        },
                        {
                            $set: {
                                "marriedTo.nextDivorceTry": moment(now).add(24, "hours").toDate(),
                                "marriedTo.divorceTries": tries,
                            },
                        }
                    );

                    const embed = new EmbedBuilder()
                        .setTitle(lang(user, "divorce", "divorceDeniedTitle"))
                        .setDescription(
                            `${lang(
                                interaction.user,
                                "divorce",
                                "divorceDenied"
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
