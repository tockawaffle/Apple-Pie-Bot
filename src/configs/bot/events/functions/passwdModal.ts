import { ModalSubmitInteraction, Interaction, EmbedBuilder } from "discord.js";
import { encryptAesGcm } from "../../../functions/vault";
import passwd from "../../../db/models/passwd";
import lang from "../../../languages/languages";
import moment from "moment";
import { hash } from "bcrypt";

export async function passwd_modal(
    interaction: Interaction,
    modalInteraction: ModalSubmitInteraction
) {
    const mInteraction = modalInteraction;
    const user = interaction.user;
    await mInteraction.deferReply({ephemeral: true});

    const accountNameInput = mInteraction.fields.fields.map(
        (fields) => fields.value
    )[0];
    const accountPasswdInput = mInteraction.fields.fields.map(
        (fields) => fields.value
    )[1];
    const masterKeyInput = mInteraction.fields.fields.map(
        (fields) => fields.value
    )[2];

    const accountsDb = await passwd.findOne({ _id: interaction.user.id }, {});
    if(accountsDb) {
        const accounts = accountsDb!.accounts.map((account: any) => {
            return account.account_name;
        });
        if (accounts.includes(accountNameInput)) {
            return await mInteraction.editReply({
                content: lang(interaction.user, "passwd", "passwd_account_exists"),
            });
        }
    }

    try {
        const passwdEnc = encryptAesGcm(accountPasswdInput, masterKeyInput);
        const passwdHash = await hash(masterKeyInput, 16);
        const createdMoment = moment(new Date()).format("L");
        await passwd.findOneAndUpdate(
            { _id: user.id },
            {
                _id: user,
                $push: {
                    accounts: {
                        account_name: accountNameInput,
                        account_passwd: passwdEnc,
                        masterKey: passwdHash,
                        createdAt: createdMoment,
                    },
                },
            },
            { upsert: true }
        );

        const updtAcc = await passwd.findOne(
            { _id: user.id },
            {
                accounts: {
                    $elemMatch: {
                        account_name: accountNameInput,
                    },
                },
            }
        );

        if (!updtAcc) {
            return await mInteraction.editReply({
                content: lang(interaction.user, "passwd", "passwd_error_db"),
            });
        }

        return await mInteraction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: interaction.user.username,
                        iconURL: interaction.user.displayAvatarURL({
                            forceStatic: false,
                        }),
                    })
                    .setTitle(
                        lang(interaction.user, "passwd", "passwd_success_title_embed") as string
                    )
                    .setDescription(
                        lang(interaction.user, "passwd", "passwd_success_desc_embed")
                            .replace("{0}", accountNameInput)
                    )
                    .setColor("Random")
                    .setTimestamp()
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
    } catch (error) {
        console.log(error)
        return await mInteraction.editReply({
            content: lang(interaction.user, "passwd", "passwd_error"),
        });
    }
}
