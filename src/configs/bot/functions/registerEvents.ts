import path from "path";
import fs from "fs"
import { Client } from "discord.js";

export async function registerDiscordEvents(client: Client, dir: string) {
    const eventFiles = fs.readdirSync(path.join(__dirname, dir)).filter(file => file.endsWith(process.env.FILE_EXTENSION as string))
    for (const file of eventFiles) {
        const filePath = path.join(dir, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args: any) => event.execute(...args));
        } else {
            client.on(event.name, (...args: any) => event.execute(...args));
        }
    }
}