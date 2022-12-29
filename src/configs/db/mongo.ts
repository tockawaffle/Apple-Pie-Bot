import { connect, ConnectOptions } from "mongoose";
import { loadUserSettings } from "../languages/languages";
import { Client } from "discord.js";

export async function connectMongoDB(client: Client): Promise<void> {
    await connect(process.env.MONGO_URI!, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions).then((c) => {
        console.log(
            `\x1b[32m%s\x1b[0m`,
            "[ Database ]",
            `> Connected to DB ${c.connection.name}!`
        );
    });
    await loadUserSettings(client).then(() => {
        console.log(`\x1b[35m%s\x1b[0m`, `[ Bot ]`, `> Loaded user settings!`);
    });
}
