import { connect, ConnectOptions } from "mongoose";
import { loadUserSettings } from "../languages/languages";
import { Client } from "discord.js";
export async function connectMongoDB(client: Client): Promise<void> {
    await connect(process.env.MONGO_URI!, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions).then(() => {
        console.log("[ BOT ] > DATABASE CONNECTED");
    });
    await loadUserSettings(client).then(() => {
        console.log("[ BOT ] > TRANSLATIONS LOADED")
    })
}
