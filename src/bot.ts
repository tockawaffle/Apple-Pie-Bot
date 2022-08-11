import "dotenv/config";
import { Client } from "discord.js";
import { connectMongoDB } from "./configs/db/mongo";
import { clientOptions, wokOptions } from "./configs/bot/client";
import WOKCommands from "../modules/wokcommands";

(async () => {
    const client = new Client(clientOptions);

    client.on("ready", async () => {
        await connectMongoDB(client);
        new WOKCommands(client, wokOptions);
    });

    client.login(process.env.DISCORD_TOKEN);
})();
