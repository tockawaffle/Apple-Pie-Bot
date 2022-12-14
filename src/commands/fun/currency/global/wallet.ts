import { CommandObject, CommandType } from "wokcommands";
import { CommandInteraction, Client, User, EmbedBuilder } from "discord.js";
import user from "../../../../configs/db/models/user";
import lang from "../../../../configs/languages/languages";

export default {
    category: "Currency",
    description: "Shows the amount of money you have in your wallet!",
    nameLocalizations: {
        "en-US": "wallet",
        "pt-BR": "carteira",
    },
    descriptionLocalizations: {
        "en-US": "Shows the amount of money you have in your wallet!",
        "pt-BR":
            "Mostra a quantidade de dinheiro que você tem na sua carteira!",
    },
    type: CommandType.SLASH,
    callback: async ({ interaction }: { interaction: CommandInteraction }) => {
        const thisUser = interaction.user as User;
        const thisUserDB = await user.findOne({ _id: thisUser.id });

        if (!thisUserDB)
            return interaction.reply({
                content: lang(thisUser, "defaults", "no_user_found"),
                ephemeral: true,
            });

        const wallet = thisUserDB.currency,
            walletAmount = wallet.coinsAmount,
            nextDailyReward = wallet.nextDailyReward
                ? wallet.nextDailyReward
                : lang(thisUser, "currency", "rewardNow"),
            nextWeeklyReward = wallet.nextWeeklyReward
                ? wallet.nextWeeklyReward
                : lang(thisUser, "currency", "rewardNow"),
            nextMonthlyReward = wallet.nextMonthlyReward
                ? wallet.nextMonthlyReward
                : lang(thisUser, "currency", "rewardNow"),
            premium = wallet.premium
                ? wallet.premium
                : lang(thisUser, "currency", "noPremium");

        const embed = new EmbedBuilder()
            .setTitle(lang(thisUser, "currency", "walletTitle"))
            .setColor("Random")
            .setFooter({
                text: lang(thisUser, "currency", "walletFooter"),
                iconURL: thisUser.avatarURL() as string,
            })
            .setTimestamp()
            .addFields([
                {
                    name: lang(thisUser, "currency", "walletAmount"),
                    value: `**A$${walletAmount}**`,
                    inline: true,
                },
                {
                    name: lang(thisUser, "currency", "nextDailyReward"),
                    value: `**${nextDailyReward}**`,
                    inline: true,
                },
                {
                    name: lang(thisUser, "currency", "nextWeeklyReward"),
                    value: `**${nextWeeklyReward}**`,
                    inline: true,
                },
                {
                    name: lang(thisUser, "currency", "nextMonthlyReward"),
                    value: `**${nextMonthlyReward}**`,
                    inline: true,
                },
                {
                    name: lang(thisUser, "currency", "premium"),
                    value: `**${premium}**`,
                    inline: true,
                }
            ])
            .setDescription(lang(thisUser, "currency", "walletDescription"))

        return interaction.reply({ embeds: [embed] });
    },
} as CommandObject;
