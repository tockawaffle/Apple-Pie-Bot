import { CommandObject, CommandType } from "@wokcommands/";
import { Client, CommandInteraction } from "discord.js";
import { marriageCanva } from "../../../../configs/commands/misc/canva";
import user from "../../../../configs/db/models/user";
import lang from "../../../../configs/languages/languages";
import { User } from "discord.js";

export default {
    description: "Shows your marriage in a cute image.",
    category: "Roleplay",
    type: CommandType.SLASH,
    nameLocalizations: {
        "pt-BR": "meu-casamento",
    },
    descriptionLocalizations: {
        "pt-BR": "Mostra seu casamento em uma imagem fofa",
    },
    callback: async ({
        client,
        interaction,
    }: {
        client: Client
        args: string[];
        interaction: CommandInteraction;
    }) => {
        const thisUser = interaction.user;
        const checkMarriage = await user.findOne({ _id: thisUser.id });
        if (!checkMarriage?.marriedTo?.user_name) {
            return interaction.reply({
                content: lang(thisUser, "myMarriage", "notMarried"),
            });
        }

        const marriedToId = checkMarriage.marriedTo.user_id
        const getMarried = client.users.cache.get(marriedToId) as User
        const attachment = await marriageCanva(thisUser, getMarried, client)

        return await interaction.reply({
            files: [attachment],
        });

    },
} as CommandObject;
