import "dotenv/config";
import { Client } from "discord.js";
import { connectMongoDB } from "./configs/db/mongo";
import { clientOptions, wokOptions } from "./configs/bot/client";
import WOKCommands from "../modules/wokcommands";
export const client = new Client(clientOptions); wokOptions.client=client;
    

(async () => {

    client.on("ready", async () => {
        await connectMongoDB(client);
        new WOKCommands(wokOptions);
    });

    client.login(process.env.DISCORD_TOKEN);
})();
