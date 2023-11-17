import {
    Client,
    ApplicationCommand,
    ChatInputApplicationCommandData,
    Collection,
    Interaction,
} from "discord.js";
import commandsImports from "./commandsImports";

export default class CommandHandler {
    private commands: Map<string, Command> = new Map();
    private client: Client;

    constructor(client: Client, private debug: boolean = false) {
        this.client = client;
        this.client.on("interactionCreate", this.handleInteraction.bind(this));
    }

    public async loadCommands(): Promise<void> {
        for (const command of commandsImports) {
            this.registerCommand(command);
        }
        await this.syncCommands();
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

    private registerCommand(command: Command): void {
        this.commands.set(command.name, command);
    }

    private async syncCommands(): Promise<void> {
        const existingCommands =
            await this.client.application!.commands.fetch();

        for (const command of this.commands.values()) {
            const commandData = this.createCommandData(command);
            const existingCommand = existingCommands.find(
                (cmd) => cmd.name === command.name
            );

            if (existingCommand) {
                if (this.isCommandDifferent(existingCommand, commandData)) {
                    await this.client.application!.commands.edit(
                        existingCommand.id,
                        commandData
                    );
                    this.logDebug(
                        "magenta",
                        `Command Handler`,
                        `Edited/Updated ${command.name}`,
                        "info"
                    );
                }
            } else {
                await this.client.application!.commands.create(commandData);
                this.logDebug(
                    "magenta",
                    `Command Handler`,
                    `Created ${command.name}`,
                    "info"
                );
            }
        }

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

        for (const cmd of toDelete.values()) {
            await this.client.application!.commands.delete(cmd.id);
            this.logDebug(
                "magenta",
                `Command Handler`,
                `Deleted ${cmd.name}`,
                "info"
            );
        }
    }

    private logDebug(
        color: string,
        firstString: string,
        message: string,
        logType: string
    ) {
        if (this.debug) {
            const colorCodes: Record<string, string> = {
                red: "\x1b[31m",
                green: "\x1b[32m",
                yellow: "\x1b[33m",
                blue: "\x1b[34m",
                magenta: "\x1b[35m",
                cyan: "\x1b[36m",
                reset: "\x1b[0m",
            };

            const consoleMethods: Record<string, (...data: any[]) => void> = {
                log: console.log,
                error: console.error,
                warn: console.warn,
                info: console.info,
                debug: console.debug,
            };

            const chosenColor = colorCodes[color] || colorCodes.reset;
            const chosenMethod = consoleMethods[logType] || consoleMethods.log;

            chosenMethod(
                `${chosenColor}[ ${firstString} ]${colorCodes.reset}`,
                `${message}`
            );
        }
    }
}
