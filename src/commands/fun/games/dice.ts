import { CommandObject, CommandType } from "@wokcommands/";
import { CommandInteraction, Client } from "discord.js";
import lang from "../../../configs/languages/languages";

export default {
    category: "Games",
    description: "Rolls a dice.",
    nameLocalizations: {
        "pt-BR": "dado",
    },
    descriptionLocalizations: {
        "en-US": "Rolls a dice.",
        "pt-BR": "Rola um dado.",
    },
    type: CommandType.SLASH,
    callback: async ({ interaction }: { interaction: CommandInteraction }) => {
        await interaction.reply({ content: lang(interaction.user, "dice", "rolling") });
        setTimeout(() => {
            return interaction.editReply({
                content: lang(interaction.user, "dice", "rolled").replace("{0}", (Math.floor(Math.random() * 25) + 1).toString()),
            });
        }, 2000);
    },
} as CommandObject;
