import "dotenv/config";
import { Client } from "discord.js";
import { connectMongoDB } from "./configs/db/mongo";
import { clientOptions, wokOptions } from "./configs/bot/client";
import WOKCommands from "wokcommands";
export const client = new Client(clientOptions);
wokOptions.client = client;

(async () => {
    client.on("ready", async () => {
        await connectMongoDB(client);
        new WOKCommands(wokOptions);
        console.log(`[Bot] > Bot started as "${client.user!.tag}"`);
    });

    client.login(process.env.DISCORD_TOKEN);
})();
