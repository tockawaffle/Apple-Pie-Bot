import "dotenv/config";
import { Client } from "discord.js";
import { connectMongoDB } from "./configs/db/mongo";
import { clientOptions, wokOptions, RESTdjs } from "./configs/bot/client";
import WOK from "wokcommands";
export const client = new Client(clientOptions);
wokOptions.client = client;

(async () => {
    client.on("ready", async () => {
        await connectMongoDB(client);
        new WOK(wokOptions);
        console.log(`[ Bot ] > Bot started as "${client.user!.tag}"`);
        client.rest = RESTdjs
    });
    
    client.login(process.env.DISCORD_TOKEN);
})();
