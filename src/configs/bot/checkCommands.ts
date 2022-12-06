import { Client } from "discord.js";
import WOK, { Command } from "wokcommands";


export async function checkCommands({ client, instance }: { client: Client; instance: WOK; }): Promise<{ status: string; commands: string[]; code: number; } | { status: string; commands: string; code: number; } | undefined> {
    let clientCommandsArray: string[] = [];
    const clientCommands = await client.application!.commands.fetch();
    clientCommands.forEach((command) => {
        clientCommandsArray.push(command.name);
    });

    let instanceCommandsArray: string[] = [];
    await instance.commandHandler.commands.forEach(
        (command: Command) => {
            if (command.commandObject.ownerOnly ||
                command.commandObject.testOnly)
                return;
            instanceCommandsArray.push(command.commandName);
        }
    );

    const commandsToDelete = clientCommandsArray.filter(
        (command) => !instanceCommandsArray.includes(command)
    );
    console.log(commandsToDelete);
    if (commandsToDelete.length > 0) {
        for (const command of commandsToDelete) {
            const c = clientCommands.map((commands) => {
                if (commands.name === command)
                    return commands;
            });
            const commandToDelete = c.filter((command) => command !== undefined);
            await client.application!.commands.delete(commandToDelete[0]!.id);
            return {
                status: "success",
                commands: commandsToDelete,
                code: 200,
            };
        }
    } else {
        return {
            status: "NOMOD",
            commands: "",
            code: 304
        };
    }
}
