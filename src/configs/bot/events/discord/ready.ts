import { Events, Client } from "discord.js";
import { connectMongoDB } from "../../../db/mongo";
import { wokOptions, RESTdjs } from "../../client";
import { checkCommands } from "../functions/checkCommands";
import WOK from "@wokcommands/";

module.exports = {
    name: Events.ClientReady,
    once: false,
    async execute(client: Client) {
        await connectMongoDB(client);
        wokOptions.client = client;
        const instance = new WOK(wokOptions);
        console.log(
            `\x1b[35m%s\x1b[0m`,
            `[ Bot ]`,
            `> Logged in as ${client.user?.tag}!`
        );
        client.rest = RESTdjs;
        setTimeout(async() => {
            await checkCommands(client, instance);
        }, 4000)
    },
}