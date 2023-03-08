import { CommandInteraction, User, Client, EmbedBuilder } from "discord.js";
import { CommandObject, CommandType } from "@wokcommands/";
import accs from "../../../../configs/db/models/passwd";
import lang from "../../../../configs/languages/languages";

export default {
    description:
        "Shows the accounts you have registered in the database (Restricted Command)",
    type: CommandType.SLASH,
    category: "Utility - Misc",
    nameLocalizations: {
        "pt-BR": "minhas-contas",
    },
    descriptionLocalizations: {
        "pt-BR":
            "Mostra as contas que você tem registradas no banco de dados (Comando Restrito)",
        "en-US":
            "Shows the accounts you have registered in the database (Restricted Command)",
    },
    callback: async ({
        interaction,
        user,
    }: {
        client: Client;
        interaction: CommandInteraction;
        user: User;
        args: string[];
    }) => {
        const allowed = ["876578406144290866"];
        if (!allowed.includes(user.id)) {
            return interaction.reply(lang(user, "decr", "decr_restricted"));
        }

        const db = await accs.findOne({ _id: user.id });

        if (!db)
            return interaction.reply(
                lang(user, "passwd_accs", "accs_doesnt_exist")
            );

        const accountsDbs = db.accounts as [
            {
                account_name: string;
                account_passwd: string;
                masterKey: string;
                createdAt: string;
            }
        ];

        if(accountsDbs.length !<= 0) {
            return interaction.reply(lang(user, "passwd_accs", "accs_doesnt_exist"));
        }

        const accounts = accountsDbs.map((account) => {
            return account.account_name;
        });

        return await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        iconURL: user.displayAvatarURL(),
                        name: user.username,
                    })
                    .setDescription(
                        `
                            **${lang(user, "passwd_accs", "accs_title")}**
                            _${accounts.join("\n")}_
                        `
                    )
                    .setColor("Random")
                    .setFooter({
                        text: lang(interaction.user, "help", "help-footer"),
                        iconURL: interaction.client.users.cache
                            .find((user) => user.id === "876578406144290866")
                            ?.displayAvatarURL({
                                forceStatic: false,
                            }),
                    }),
            ],
        });
    },
} as CommandObject;
