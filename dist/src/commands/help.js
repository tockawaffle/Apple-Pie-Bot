"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _wokcommands_1 = require("@wokcommands/");
const languages_1 = __importDefault(require("../configs/languages/languages"));
exports.default = {
    type: _wokcommands_1.CommandType.SLASH,
    name: "help",
    category: "Utility - Help",
    descriptionLocalizations: {
        "en-US": "Shows the help menu",
        "pt-BR": "Mostra o menu de ajuda",
    },
    nameLocalizations: {
        "pt-BR": "ajuda",
    },
    description: "Shows the help menu",
    init: (client, instance) => {
        client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            if (!interaction.isStringSelectMenu())
                return;
            let utilUsers = [], utilServers = [], misc = [], games = [];
            function getCommands() {
                return __awaiter(this, void 0, void 0, function* () {
                    yield instance.commandHandler.commands.forEach((command) => {
                        if (command.commandObject.category === "Utility - Users") {
                            utilUsers.push(command);
                        }
                        else if (command.commandObject.category ===
                            "Utility - Servers") {
                            utilServers.push(command);
                        }
                        else if (command.commandObject.category === "Utility - Misc") {
                            misc.push(command);
                        }
                        else if (command.commandObject.category === "Games") {
                            games.push(command);
                        }
                    });
                    const utilUsersPage = utilUsers
                        .map((command) => {
                        return `/${command.commandName} - **${command.commandObject.description}**`;
                    })
                        .join("\n");
                    const utilServersPage = utilServers
                        .map((command) => {
                        return `/${command.commandName} - **${command.commandObject.description}**`;
                    })
                        .join("\n");
                    const miscPage = misc
                        .map((command) => {
                        return `/${command.commandName} - **${command.commandObject.description}**`;
                    })
                        .join("\n");
                    const gamesPage = games
                        .map((command) => {
                        return `/${command.commandName} - **${command.commandObject.description}**`;
                    })
                        .join("\n");
                    return {
                        utilUsersPage,
                        utilServersPage,
                        miscPage,
                        gamesPage,
                    };
                });
            }
            const { customId, values } = interaction;
            if (customId === "help_menu") {
                const uAvatar = interaction.user.displayAvatarURL({
                    forceStatic: false,
                });
                switch (values[0]) {
                    case "util_users": {
                        const { utilUsersPage } = yield getCommands();
                        yield interaction.update({
                            embeds: [
                                {
                                    author: {
                                        name: interaction.user.username,
                                        icon_url: uAvatar,
                                    },
                                    title: (0, languages_1.default)(interaction.user, "help", "help-util-users-title"),
                                    description: utilUsersPage,
                                    color: 7419530,
                                    footer: {
                                        text: (0, languages_1.default)(interaction.user, "help", "help-footer"),
                                        icon_url: (_a = client.users.cache
                                            .find((user) => user.id ===
                                            "876578406144290866")) === null || _a === void 0 ? void 0 : _a.displayAvatarURL({
                                            forceStatic: false,
                                        }),
                                    },
                                },
                            ],
                        });
                        break;
                    }
                    case "util_servers": {
                        const { utilServersPage } = yield getCommands();
                        yield interaction.update({
                            embeds: [
                                {
                                    author: {
                                        name: interaction.user.username,
                                        icon_url: uAvatar,
                                    },
                                    title: (0, languages_1.default)(interaction.user, "help", "help-util-servers-title"),
                                    description: utilServersPage,
                                    color: 7419530,
                                    footer: {
                                        text: (0, languages_1.default)(interaction.user, "help", "help-footer"),
                                        icon_url: (_b = client.users.cache
                                            .find((user) => user.id ===
                                            "876578406144290866")) === null || _b === void 0 ? void 0 : _b.displayAvatarURL({
                                            forceStatic: false,
                                        }),
                                    },
                                },
                            ],
                        });
                        break;
                    }
                    case "misc": {
                        const { miscPage } = yield getCommands();
                        yield interaction.update({
                            embeds: [
                                {
                                    author: {
                                        name: interaction.user.username,
                                        icon_url: uAvatar,
                                    },
                                    title: (0, languages_1.default)(interaction.user, "help", "help-misc-title"),
                                    description: miscPage,
                                    color: 7419530,
                                    footer: {
                                        text: (0, languages_1.default)(interaction.user, "help", "help-footer"),
                                        icon_url: (_c = client.users.cache
                                            .find((user) => user.id ===
                                            "876578406144290866")) === null || _c === void 0 ? void 0 : _c.displayAvatarURL({
                                            forceStatic: false,
                                        }),
                                    },
                                },
                            ],
                        });
                        break;
                    }
                    case "games": {
                        const { gamesPage } = yield getCommands();
                        yield interaction.update({
                            embeds: [
                                {
                                    author: {
                                        name: interaction.user.username,
                                        icon_url: uAvatar,
                                    },
                                    title: (0, languages_1.default)(interaction.user, "help", "help-games-title"),
                                    description: gamesPage,
                                    color: 7419530,
                                    footer: {
                                        text: (0, languages_1.default)(interaction.user, "help", "help-footer"),
                                        icon_url: (_d = client.users.cache
                                            .find((user) => user.id ===
                                            "876578406144290866")) === null || _d === void 0 ? void 0 : _d.displayAvatarURL({
                                            forceStatic: false,
                                        }),
                                    },
                                },
                            ],
                        });
                        break;
                    }
                }
            }
        }));
    },
    callback: ({ client, interaction, user, }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        yield interaction.reply({
            embeds: [
                {
                    author: {
                        name: interaction.user.username,
                        icon_url: interaction.user.displayAvatarURL({
                            forceStatic: false,
                        }),
                    },
                    title: (0, languages_1.default)(user, "help", "help-title").replace("{{bot_name}}", client.user.username),
                    description: (0, languages_1.default)(user, "help", "help-description").replace("{{bot_name}}", client.user.username),
                    footer: {
                        text: (0, languages_1.default)(user, "help", "help-footer"),
                        icon_url: (_a = client.users.cache
                            .find((user) => user.id === "876578406144290866")) === null || _a === void 0 ? void 0 : _a.displayAvatarURL({ forceStatic: false }),
                    },
                    color: 7419530,
                },
            ],
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 3,
                            customId: "help_menu",
                            options: [
                                {
                                    label: (0, languages_1.default)(user, "help", "help-util-users-title"),
                                    value: "util_users",
                                    emoji: "🔎",
                                },
                                {
                                    label: (0, languages_1.default)(user, "help", "help-misc-title"),
                                    value: "misc",
                                    emoji: "🔎",
                                },
                                {
                                    label: (0, languages_1.default)(user, "help", "help-util-servers-title"),
                                    value: "util_servers",
                                    emoji: "🔎",
                                },
                                {
                                    label: (0, languages_1.default)(user, "help", "help-games-title"),
                                    value: "games",
                                    emoji: "🔎",
                                }
                            ],
                        },
                    ],
                },
            ],
        });
    }),
};
