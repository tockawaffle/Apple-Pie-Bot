import { ICommand } from "../../../../../modules/wokcommands/typings";
import { encryptAesGcm } from "../../../../configs/functions/vault";
import { totp } from "speakeasy";
import { User } from "discord.js";
import { hash } from "bcrypt";
import moment from "moment";
import passwdSchema from "../../../../configs/db/models/passwd";
import lang from "../../../../configs/languages/languages";

async function store(
    user: User["id"],
    masterKey: string,
    accName: string,
    passwd: string
) {
    if (!user || !passwd) throw new Error("Missing user or passwd");
    try {
        const passwdEnc = encryptAesGcm(masterKey, passwd);
        const passwdHash = await hash(passwd, 16);
        const createdMoment = moment(new Date()).format("L");
        await passwdSchema.findOneAndUpdate(
            { _id: user },
            {
                _id: user,
                $push: {
                    accounts: {
                        account_name: accName,
                        account_passwd: passwdEnc,
                        masterKey: passwdHash,
                        createdAt: createdMoment,
                    },
                },
            },
            { upsert: true }
        );
        return {
            code: 200,
            account_name: accName,
            account_passwd: passwdEnc,
            masterKey: passwdHash,
            createdAt: createdMoment,
        };
    } catch (error: any) {
        return {
            code: 500,
            message: error.message,
        };
    }
}

export default {
    category: "Utility - Password Manager",
    description:
        "Stores your password in a secure database (Restricted Command)",
    name: "passwd",
    slash: true,
    options: [
        {
            name: "master_key",
            description: "The Key You'll use to encrypt the password you want",
            type: 3,
            required: true,
        },
        {
            name: "account_name",
            description: "The name of the account you want to store.",
            type: 3,
            required: true,
        },
        {
            name: "password",
            description: "The password you want to store.",
            type: 3,
            required: true,
        },
        {
            name: "second_authentication_code",
            description: "If you have any, the code it'll show you.",
            type: 10,
            required: false,
        },
    ],
    callback: async ({ interaction, user, args }) => {
        const allowed = ["876578406144290866"];
        if (!allowed.includes(user.id)) {
            interaction.reply(lang(user, "passwd", "restricted"));
        }

        const masterKey = args[0];
        const passwd = args[1];
        const secondAuth = args[2];
        const dbUser = await passwdSchema.findOne({ _id: user.id });
        if (dbUser?.dfa.enabled) {
            const verify = totp.verify({
                secret: dbUser.dfa.b32Secret,
                encoding: "base32",
                token: secondAuth,
            });
            if (!verify)
                return interaction.reply(
                    lang(user, "passwd", "invalid-dfa-code")
                );
            else {
                await interaction.reply(lang(user, "passwd", "waiting"));
                const s = await store(user.id, masterKey, passwd, passwd);
                if (s.code !== 200)
                    return interaction.editReply(
                        `${lang(user, "defaults", "error")} ${lang(
                            user,
                            "passwd",
                            "error"
                        )}\n${s.message}`
                    );
                else {
                    return await interaction.editReply({
                        embeds: [
                            {
                                title: lang(
                                    user,
                                    "passwd",
                                    "success"
                                ) as string,
                                description: lang(
                                    user,
                                    "passwd",
                                    "success-desc"
                                ),
                                fields: [
                                    {
                                        name: lang(
                                            user,
                                            "passwd",
                                            "account-name"
                                        ),
                                        value: s.account_name as string,
                                    },
                                    {
                                        name: lang(
                                            user,
                                            "passwd",
                                            "account-passwd"
                                        ),
                                        value: s.account_passwd as string,
                                    },
                                    {
                                        name: lang(
                                            user,
                                            "passwd",
                                            "master-key"
                                        ),
                                        value: s.masterKey as string,
                                    },
                                    {
                                        name: lang(
                                            user,
                                            "passwd",
                                            "created-at"
                                        ),
                                        value: s.createdAt as string,
                                    },
                                ],
                                color: 7419530,
                            },
                        ],
                    });
                }
            }
        }
        interaction.reply(lang(user, "passwd", "waiting"));
        const s = await store(user.id, masterKey, passwd, passwd);
        if (s.code !== 200) {
            return await interaction.editReply(
                lang(user, "passwd", "error") + `\n${s.message}`
            );
        } else {
            return interaction.editReply({
                embeds: [
                    {
                        author: {
                            icon_url: user.displayAvatarURL({forceStatic: false}),
                            name: user.username
                        },
                        title: lang(user, "passwd", "success") as string,
                        description: lang(user, "passwd", "success-desc"),
                        fields: [
                            {
                                name: lang(user, "passwd", "account-name"),
                                value: s.account_name as string,
                            },
                            {
                                name: lang(user, "passwd", "account-passwd"),
                                value: s.account_passwd as string,
                            },
                            {
                                name: lang(user, "passwd", "master-key"),
                                value: s.masterKey as string,
                            },
                            {
                                name: lang(user, "passwd", "created-at"),
                                value: s.createdAt as string,
                            },
                        ],
                        color: 7419530,
                    },
                ],
            });
        }
    },
} as ICommand;
