import { CommandObject, CommandType } from "@wokcommands/";
import { ActionRowBuilder, CommandInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, User } from "discord.js";
import passwdSchema from "../../../../configs/db/models/passwd";
import lang from "../../../../configs/languages/languages";

export default {
    description: "Stores your password in a secure database. (Restricted Command)",
    type: CommandType.SLASH,
    category: "Utility - Misc",
    nameLocalizations: {
        "pt-BR": "passwd",
    },
    descriptionLocalizations: {
        "pt-BR": "Armazena sua senha em um banco de dados seguro. (Comando Restrito)",
        "en-US": "Stores your password in a secure database (Restricted Command)",
    },
    callback: async ({ interaction, user, args }: {interaction: CommandInteraction, user: User, args: string[]}) => {
        const allowed = ["876578406144290866"];
        if (!allowed.includes(user.id)) {
            interaction.reply(lang(user, "passwd", "restricted"));
        }

        const masterKey = new ActionRowBuilder().addComponents(
            new TextInputBuilder({
                custom_id: "master_key",
                placeholder: lang(user, "passwd", "master-key"),
                label: lang(user, "passwd", "master-key"),
                required: true,
                style: TextInputStyle.Short,
            })
        ) as ActionRowBuilder<TextInputBuilder>;

        const accName = new ActionRowBuilder().addComponents(
            new TextInputBuilder({
                custom_id: "account_name",
                placeholder: lang(user, "passwd", "account-name"),
                label: lang(user, "passwd", "account-name"),
                required: true,
                style: TextInputStyle.Short,
            })
        ) as ActionRowBuilder<TextInputBuilder>;

        const passwd = new ActionRowBuilder().addComponents(
            new TextInputBuilder({
                custom_id: "account_password",
                placeholder: lang(user, "passwd", "account-passwd"),
                label: lang(user, "passwd", "account-passwd"),
                required: true,
                style: TextInputStyle.Short,
            })
        ) as ActionRowBuilder<TextInputBuilder>;

        const secondAuth = new ActionRowBuilder().addComponents(
            new TextInputBuilder({
                custom_id: "second_authentication_code",
                placeholder: lang(user, "passwd", "second-auth"),
                label: lang(user, "passwd", "second-auth"),
                required: true,
                style: TextInputStyle.Short,
            })
        ) as ActionRowBuilder<TextInputBuilder>;

        const modal = new ModalBuilder({
            title: lang(user, "passwd", "modal-title"),
            custom_id: "passwd_modal",
        })

        modal.addComponents(accName)
        modal.addComponents(passwd)
        modal.addComponents(masterKey)

        const userDb = await passwdSchema.findOne({ _id: user.id });
        if(userDb) {
            if(userDb!.dfa.enabled) {
                modal.addComponents(secondAuth)
            }
        }

        await interaction.showModal(modal)
        
    },
} as CommandObject;
