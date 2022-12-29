import { Client, Routes } from "discord.js";
import WOK, { Command } from "wokcommands";

export async function checkCommands(client: Client, instance: any) {
    const i = instance as WOK;
    const instanceCommandsArray: string[] = [];
    const instanceCommands = (await i.commandHandler.commands) as Command[];
    instanceCommands.forEach((command: Command) => {
        instanceCommandsArray.push(command.commandName);
    });

    instanceCommands.forEach((command: Command) => {
        const nameLocale = command.commandObject.nameLocalizations!;
        //remove undefined values
        const nameLocaleFiltered = nameLocale["pt-BR"];
        instanceCommandsArray.push(nameLocaleFiltered as string);
    });

    const clientCommands = await client.application!.commands.fetch();
    const clientCommandsArray: string[] = [];
    clientCommands.forEach((command) => {
        clientCommandsArray.push(command.name);
    });

    const commandsToDelete = clientCommandsArray.filter(
        (command) => !instanceCommandsArray.includes(command)
    );

    let index = 0;
    if (commandsToDelete.length > 0) {
        for (const command of commandsToDelete) {
            const c = clientCommands.map((commands) => {
                if (commands.name === command) return commands;
            });
            const commandToDelete = c.filter(
                (command) => command !== undefined
            );
            await client.application!.commands.delete(commandToDelete[0]!.id);
            await client.rest
                .delete(
                    Routes.applicationCommand(
                        client.user!.id,
                        commandToDelete[0]!.id
                    )
                )
                .catch(async (err) => {
                    if (err.code === 404) {
                        const r = await client.rest.delete(
                            Routes.applicationGuildCommand(
                                client.user!.id,
                                commandToDelete[0]?.guildId as string,
                                commandToDelete[0]!.id
                            )
                        );
                    }
                });
            index++;
            console.log(`[ Handler ] > Command "${command}" deleted.`)
        }

        if(index === commandsToDelete.length) console.log(`[ Handler ] > ${index} commands deleted.`)
    }
}
