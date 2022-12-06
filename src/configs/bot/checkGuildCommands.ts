import { Client } from "discord.js";
import WOK from "wokcommands";


export async function checkGuildCommands(client: Client, instance: WOK) {

    const guilds = client.guilds.cache.map((g) => g.id);
    const commands = instance.commandHandler.commands;
    const guildCommands = instance.commandHandler.guildCommands;

    const guildsToCheck = guilds.filter((g) => !guildCommands.has(g));

    for (const guild of guildsToCheck) {
        const guildCommandNames = commands.map((c: { name: any; }) => c.name);
        const guildCommands = await client.guilds.cache.get(guild)!.commands.fetch();
        const guildCommandNamesFromAPI = guildCommands.map((c) => c.name);

        const commandsToDelete = guildCommandNamesFromAPI.filter((c) => !guildCommandNames.includes(c));

        for (const command of commandsToDelete) {
            const commandToDelete = guildCommands.find((c) => c.name === command);
            if (!commandToDelete) continue;

            await client.guilds.cache.get(guild)!.commands.delete(commandToDelete.id);
        }
    }

}
