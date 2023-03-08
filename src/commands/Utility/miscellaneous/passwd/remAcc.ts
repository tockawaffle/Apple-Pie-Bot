import {
    CommandInteraction,
    User,
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
    StringSelectMenuBuilder,
    InteractionCollector,
    Client,
} from "discord.js";
import { CommandObject, CommandType } from "@wokcommands/";
import decr from "../../../../configs/db/models/passwd";
import lang from "../../../../configs/languages/languages";

export default {
    description: "Removes an account from the database (Restricted Command).",
    type: CommandType.SLASH,
    category: "Utility - Misc",
    nameLocalizations: {
        "pt-BR": "remover-conta",
    },
    descriptionLocalizations: {
        "pt-BR": "Remove uma conta da Base de Dados (Comando Restrito)",
        "en-US": "Removes an account from the database (Restricted Command)",
    },
    callback: async ({
        client,
        interaction,
        user,
    }: {
        client: Client;
        interaction: CommandInteraction;
        user: User;
    }) => {
        const allowed = ["876578406144290866"];
        if (!allowed.includes(user.id)) {
            return interaction.reply(lang(user, "decr", "decr_restricted"));
        }

        const checkSA = await decr.findOne({ _id: user.id });
        if (!checkSA) {
            return interaction.reply(lang(user, "decr", "decr_doesnt_exist"));
        }

        const accountsDbs = checkSA.accounts as [
            {
                account_name: string;
                account_passwd: string;
                masterKey: string;
                createdAt: string;
            }
        ];

        const accounts = accountsDbs.map((account) => {
            return account.account_name;
        });

        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("decr_slm_accountname")
                .setPlaceholder(
                    lang(
                        user,
                        "passwd_rem",
                        "rem_modal_accountname_placeholder"
                    )
                )
                .addOptions(
                    accounts.map((account) => {
                        return {
                            label: account,
                            value: account,
                        };
                    })
                )
        ) as ActionRowBuilder<StringSelectMenuBuilder>;

        await interaction.reply({
            components: [row],
        });

        const collector = new InteractionCollector(client, {
            filter: (i) => i.user.id === user.id,
            time: 180000,
        });

        collector.on("collect", async (i: any) => {
            const selectedAccountName = i.values[0];
            const modal = new ModalBuilder({
                title: lang(user, "passwd_rem", "rem_modal_title"),
                custom_id: "acc_rem_modal",
            });

            const masterKey = new ActionRowBuilder({
                components: [
                    new TextInputBuilder({
                        custom_id: "decr_modal_masterkey",
                        label: lang(user, "decr", "decr_modal_masterkey_label"),
                        placeholder: lang(
                            user,
                            "decr",
                            "decr_modal_masterkey_placeholder"
                        ),
                        required: true,
                        style: TextInputStyle.Short,
                        type: 4,
                    }),
                ],
            }) as ActionRowBuilder<TextInputBuilder>;

            const accountName = new ActionRowBuilder({
                components: [
                    new TextInputBuilder({
                        custom_id: "decr_modal_accountname",
                        label: lang(
                            user,
                            "decr",
                            "decr_modal_accountname_label"
                        ),
                        placeholder: selectedAccountName,
                        value: selectedAccountName,
                        required: true,
                        style: TextInputStyle.Short,
                        type: 4,
                    }),
                ],
            }) as ActionRowBuilder<TextInputBuilder>;

            const userSA = checkSA.dfa.enabled;
            if (userSA) {
                const code2fa = new ActionRowBuilder({
                    components: [
                        new TextInputBuilder({
                            custom_id: "decr_modal_2fa",
                            label: lang(user, "decr", "decr_modal_2fa_label"),
                            placeholder: lang(
                                user,
                                "decr",
                                "decr_modal_2fa_placeholder"
                            ),
                            required: true,
                            style: TextInputStyle.Short,
                            type: 4,
                        }),
                    ],
                }) as ActionRowBuilder<TextInputBuilder>;
                modal.addComponents(code2fa);
            }
            modal.addComponents(accountName);
            modal.addComponents(masterKey);
            await i.showModal(modal);
            collector.stop();
        });
    },
} as CommandObject;
