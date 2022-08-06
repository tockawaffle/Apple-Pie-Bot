import "dotenv/config";
import { Client, Intents } from "discord.js";
import { connectMongoDB } from "./configs/db/mongo";
import WOKCommands from "../modules/wokcommands";
import path from "path";

(async () => {
    const client = new Client({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_PRESENCES,
            Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
            Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        ],
    });

    client.on("ready", async () => {
        await connectMongoDB(client);
        new WOKCommands(client, {
            commandsDir: path.join(__dirname, "commands"),
            featuresDir: path.join(__dirname, "features"),
            messagesPath: path.join(
                __dirname,
                "./configs/languages/messages.json"
            ),
            defaultLanguage: "english",
            testServers: process.env.TEST_SERVERS,
            ignoreBots: true,
            debug: true,
            typeScript: true,
            showWarns: true,
            ephemeral: true,
            botOwners: [process.env.OWNER_ID as string],
            mongoUri: process.env.MONGO_URI,
            disabledDefaultCommands: [
                "help",
                "command",
                "language",
                "prefix",
                "requiredrole",
                "channelonly",
            ],
        }).setDefaultPrefix("!");
    });

    client.login(process.env.DISCORD_TOKEN);
})();
