import {
    CommandInteraction,
    User,
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
} from "discord.js";
import { CommandObject, CommandType } from "@wokcommands/";
import decr from "../../../../configs/db/models/passwd";
import lang from "../../../../configs/languages/languages";

export default {
    description:
        "Decrypts your password from a secure database (Restricted Command)",
    type: CommandType.SLASH,
    category: "Utility - Misc",
    nameLocalizations: {
        "pt-BR": "decrypt",
    },
    descriptionLocalizations: {
        "pt-BR":
            "Descriptografa sua senha de um banco de dados seguro (Comando Restrito)",
        "en-US":
            "Decrypts your password from a secure database (Restricted Command)",
    },
    callback: async ({
        interaction,
        user,
        args,
    }: {
        interaction: CommandInteraction;
        user: User;
        args: string[];
    }) => {
        const allowed = ["876578406144290866"];
        if (!allowed.includes(user.id)) {
            return interaction.reply(lang(user, "decr", "decr_restricted"));
        }

        const checkSA = await decr.findOne({ _id: user.id });
        if (!checkSA) {
            return interaction.reply(lang(user, "decr", "decr_doesnt_exist"));
        }

        const modal = new ModalBuilder({
            title: lang(user, "decr", "decr_modal_title"),
            custom_id: "decr_modal",
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
                    label: lang(user, "decr", "decr_modal_accountname_label"),
                    placeholder: lang(
                        user,
                        "decr",
                        "decr_modal_accountname_placeholder"
                    ),
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
        await interaction.showModal(modal);
    },
} as CommandObject;
