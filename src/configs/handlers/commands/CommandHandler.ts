import {
    Client,
    ApplicationCommand,
    ChatInputApplicationCommandData,
    Collection,
    Interaction,
} from "discord.js";

export default class CommandHandler {
    private commands: Map<string, Command> = new Map();
    private client: Client;

    constructor(client: Client, private debug: boolean = false) {
        this.client = client;
        this.client.on("interactionCreate", this.handleInteraction.bind(this));
    }

    private handleInteraction(interaction: Interaction) {
        if (!interaction.isCommand()) return;
        const command = this.commands.get(interaction.commandName);
        if (!command) return;
        const args: CommandExecuteArgs = {
            interaction,
            client: this.client,
            user: interaction.user,
            guild: interaction.guild,
            mention: interaction.options.resolved?.users?.first(),
        };
        command.execute(args);
    }

    async registerCommand(command: Command): Promise<void> {
        this.commands.set(command.name, command);
        await this.syncCommands();
    }

    private async syncCommands(): Promise<void> {
        const existingCommands =
            await this.client.application!.commands.fetch();
        await Promise.all(
            [...this.commands.values()].map(async (command) => {
                if (!command.name || !command.description || !command.execute) {
                    throw new Error(
                        `Command ${command.name} is missing a required property.`
                    );
                }
                const commandData = this.createCommandData(command);
                const existingCommand = existingCommands.find(
                    (cmd) => cmd.name === command.name
                );

                if (
                    existingCommand &&
                    this.isCommandDifferent(existingCommand, commandData)
                ) {
                    await this.client.application!.commands.edit(
                        existingCommand.id,
                        commandData
                    );
                    this.logDebug(`Updated command ${command.name}`);
                } else {
                    await this.client.application!.commands.create(commandData);
                    this.logDebug(`Created command ${command.name}`);
                }
            })
        );

        await this.deleteUnregisteredCommands(existingCommands);
    }

    private createCommandData(
        command: Command
    ): ChatInputApplicationCommandData {
        return {
            name: command.name,
            description: command.description,
            options: command.options,
            nameLocalizations: command.nameLocalizations,
            descriptionLocalizations: command.descriptionLocalizations,
        };
    }

    private isCommandDifferent(
        existingCommand: ApplicationCommand,
        commandData: ChatInputApplicationCommandData
    ): boolean {
        return (
            existingCommand.name !== commandData.name ||
            existingCommand.description !== commandData.description ||
            JSON.stringify(existingCommand.nameLocalizations) !==
                JSON.stringify(commandData.nameLocalizations) ||
            JSON.stringify(existingCommand.descriptionLocalizations) !==
                JSON.stringify(commandData.descriptionLocalizations) ||
            JSON.stringify(existingCommand.options) !==
                JSON.stringify(commandData.options)
        );
    }

    private async deleteUnregisteredCommands(
        existingCommands: Collection<string, ApplicationCommand>
    ): Promise<void> {
        const registeredCommands = new Set(this.commands.keys());
        const toDelete = existingCommands.filter(
            (cmd) => !registeredCommands.has(cmd.name)
        );

        await Promise.all(
            toDelete.map(async (cmd) => {
                await this.client.application!.commands.delete(cmd.id);
                this.logDebug(`Deleted command ${cmd.name}`);
            })
        );
    }

    private logDebug(message: string): void {
        if (this.debug) {
            console.log(`[CommandHandler] ${message}`);
        }
    }
}
