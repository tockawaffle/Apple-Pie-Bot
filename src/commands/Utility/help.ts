import {
    Client,
    MessageActionRow,
    MessageSelectMenu,
    MessageSelectOptionData,
} from "discord.js";
import WOKCommands, { ICommand } from "wokcommands";
import lang from "../../configs/languages/languages";

export default {
    slash: true,
    name: "help",
    category: "Utility - Help",
    description: "Shows the help menu",
    init: (client: Client, instance: WOKCommands) => {
        client.on("interactionCreate", async (interaction) => {
            if (!interaction.isSelectMenu()) return;

            let utilUsers: string[] = [],
                utilServers: string[] = [],
                misc: string[] = [];
            async function getCommands(): Promise<{
                utilUsersPage: string;
                utilServersPage: string;
                miscPage: string;
            }> {
                await instance.commandHandler.commands.forEach(
                    (command: any) => {
                        if (command.category === "Utility - Users") {
                            utilUsers.push(command);
                        } else if (command.category === "Utility - Servers") {
                            utilServers.push(command);
                        } else if (command.category === "Utility - Misc") {
                            misc.push(command);
                        }
                    }
                );

                const utilUsersPage = utilUsers
                    .map((command: any) => {
                        return `/${command.names[0]} - **${command.description}**`;
                    })
                    .join("\n");
                const utilServersPage = utilServers
                    .map((command: any) => {
                        return `/${command.names[0]} - **${command.description}**`;
                    })
                    .join("\n");
                const miscPage = misc
                    .map((command: any) => {
                        return `/${command.names[0]} - **${command.description}**`;
                    })
                    .join("\n");
                return {
                    utilUsersPage,
                    utilServersPage,
                    miscPage,
                };
            }
            const { customId, values } = interaction;
            if (customId === "help_menu") {
                const uAvatar = interaction.user.displayAvatarURL({
                    dynamic: true,
                });
                switch (values[0]) {
                    case "util_users": {
                        const { utilUsersPage } = await getCommands();
                        await interaction.update({
                            embeds: [
                                {
                                    author: {
                                        name: interaction.user.username,
                                        icon_url: uAvatar,
                                    },
                                    title: lang(
                                        interaction.user,
                                        "help",
                                        "help-util-users-title"
                                    ),
                                    description: utilUsersPage,
                                    color: "RANDOM",
                                    footer: {
                                        text: lang(
                                            interaction.user,
                                            "help",
                                            "help-footer"
                                        ),
                                        iconURL: client.users.cache
                                            .find(
                                                (user) =>
                                                    user.id ===
                                                    "876578406144290866"
                                            )
                                            ?.displayAvatarURL({
                                                dynamic: true,
                                            }),
                                    },
                                },
                            ],
                        });
                        break;
                    }
                    case "util_servers": {
                        const { utilServersPage } = await getCommands();
                        await interaction.update({
                            embeds: [
                                {
                                    author: {
                                        name: interaction.user.username,
                                        icon_url: uAvatar,
                                    },
                                    title: lang(
                                        interaction.user,
                                        "help",
                                        "help-util-servers-title"
                                    ),
                                    description: utilServersPage,
                                    color: "RANDOM",
                                    footer: {
                                        text: lang(
                                            interaction.user,
                                            "help",
                                            "help-footer"
                                        ),
                                        iconURL: client.users.cache
                                            .find(
                                                (user) =>
                                                    user.id ===
                                                    "876578406144290866"
                                            )
                                            ?.displayAvatarURL({
                                                dynamic: true,
                                            }),
                                    },
                                },
                            ],
                        });
                        break;
                    }
                    case "misc": {
                        const { miscPage } = await getCommands();
                        await interaction.update({
                            embeds: [
                                {
                                    author: {
                                        name: interaction.user.username,
                                        icon_url:
                                            interaction.user.displayAvatarURL({
                                                dynamic: true,
                                            }),
                                    },
                                    title: lang(
                                        interaction.user,
                                        "help",
                                        "help-misc-title"
                                    ),
                                    description: miscPage,
                                    color: "RANDOM",
                                    footer: {
                                        text: lang(
                                            interaction.user,
                                            "help",
                                            "help-footer"
                                        ),
                                        iconURL: client.users.cache
                                            .find(
                                                (user) =>
                                                    user.id ===
                                                    "876578406144290866"
                                            )
                                            ?.displayAvatarURL({
                                                dynamic: true,
                                            }),
                                    },
                                },
                            ],
                        });
                        break;
                    }
                }
            }
        });
    },
    callback: async ({ client, interaction }) => {
        let row = new MessageActionRow();
        const options: MessageSelectOptionData[] = [
            {
                label: lang(interaction, "help", "help-util-users-title"),
                value: "util_users",
                emoji: "🔎",
            },
            {
                label: lang(interaction, "help", "help-util-servers-title"),
                value: "util_servers",
                emoji: "🔎",
            },
            {
                label: lang(interaction, "help", "help-misc-title"),
                value: "misc",
                emoji: "🔎",
            },
        ];

        row.addComponents(
            new MessageSelectMenu()
                .setCustomId("help_menu")
                .setMinValues(1)
                .setMaxValues(1)
                .setPlaceholder("Select a Page")
                .addOptions(options)
        );
        const i = interaction;

        await i.reply({
            embeds: [
                {
                    author: {
                        name: interaction.user.username,
                        icon_url: interaction.user.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    title: lang(interaction, "help", "help-title").replace(
                        "{{bot_name}}",
                        client!.user!.username
                    ),
                    description: lang(
                        interaction,
                        "help",
                        "help-description"
                    ).replace("{{bot_name}}", client!.user!.username),
                    footer: {
                        text: lang(interaction, "help", "help-footer"),
                        iconURL: client.users.cache
                            .find((user) => user.id === "876578406144290866")
                            ?.displayAvatarURL({ dynamic: true }),
                    },
                    color: "DARK_PURPLE",
                },
            ],
            components: [row],
        });
    },
} as ICommand;
