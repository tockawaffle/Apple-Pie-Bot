import {
    ApplicationCommandOption,
    ApplicationCommandOptionType,
    Client,
    LocalizationMap,
    ApplicationCommand
} from "discord.js";

class SlashCommands {
    private _client: Client;

    constructor(client: Client) {
        this._client = client;
    }

    async getCommands(guildId?: string) {
        let commands;

        if (guildId) {
            const guild = await this._client.guilds.fetch(guildId);
            commands = guild.commands;
        } else {
            commands = this._client.application?.commands;
        }

        // @ts-ignore
        await commands?.fetch();

        return commands;
    }

    areOptionsDifferent(
        options: ApplicationCommandOption[],
        existingOptions: any[]
    ) {
        for (let a = 0; a < options.length; ++a) {
            const option = options[a];
            const existing = existingOptions[a];

            if (
                option.name !== existing.name ||
                option.type !== existing.type ||
                option.description !== existing.description
            ) {
                return true;
            }
        }
        return false;
    }

    async create(
        name: string,
        description: string,
        options: ApplicationCommandOption[],
        descriptionLocalizations: ApplicationCommand["descriptionLocalizations"],
        nameLocalizations: ApplicationCommand["nameLocalizations"],
        guildId?: string,
    ) {
        const commands = await this.getCommands(guildId);
        if (!commands) {
            throw new Error(`Could not find commands for guild ${guildId}`);
        }

        const existingCommand = commands.cache.find((cmd) => cmd.name === name);
        if (existingCommand) {
            const {
                description: existingDescription,
                options: existingOptions,
                nameLocalizations: existingNameLocalizations,
                descriptionLocalizations: existingDescriptionLocalizations,
            } = existingCommand;

            if (
                description !== existingDescription ||
                options.length !== existingOptions.length ||
                this.areOptionsDifferent(options, existingOptions) ||
                nameLocalizations !== existingCommand.nameLocalizations ||
                descriptionLocalizations !== existingDescriptionLocalizations ||
                nameLocalizations !== existingNameLocalizations
            ) {
                const upd = await commands.edit(existingCommand.id, {
                    description,
                    options,
                    descriptionLocalizations: descriptionLocalizations!,
                    nameLocalizations: nameLocalizations!,
                });
                if (!upd) {
                    return console.log(
                        `[ Handler ] > Failed to update the command "${name}"`
                    );
                }
            }
            return;
        }
        console.log(`[ Handler ] > Creating the command "${name}"`);

        await commands
            .create({
                name,
                description,
                options,
                descriptionLocalizations: descriptionLocalizations!,
                nameLocalizations: nameLocalizations!,
            })
            .then(() => {
                console.log(`[ Handler ] > Created the command "${name}"`);
            })
            .catch((err) => {
                console.log(
                    `[ Handler ] > Failed to create the command "${name}"`
                );
                console.log(err);
            });
    }

    async delete(commandName: string, guildId?: string) {
        const commands = await this.getCommands(guildId);

        const existingCommand = commands?.cache.find(
            (cmd) => cmd.name === commandName
        );
        if (!existingCommand) {
            return;
        }

        await existingCommand.delete();
    }

    createOptions({
        expectedArgs = "",
        minArgs = 0,
    }): ApplicationCommandOption[] {
        const options: ApplicationCommandOption[] = [];

        // <num 1> <num 2>

        if (expectedArgs) {
            const split = expectedArgs
                .substring(1, expectedArgs.length - 1)
                // num 1> <num 2
                .split(/[>\]] [<\[]/);
            // ['num 1', 'num 2']

            for (let a = 0; a < split.length; ++a) {
                const arg = split[a];

                options.push({
                    name: arg.toLowerCase().replace(/\s+/g, "-"),
                    description: arg,
                    type: ApplicationCommandOptionType.String,
                    required: a < minArgs,
                });
            }
        }

        return options;
    }
}

export default SlashCommands;

