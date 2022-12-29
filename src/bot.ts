import "dotenv/config";
import 'module-alias/register';

import { Client } from "discord.js";
import { clientOptions } from "./configs/bot/client";
import { registerDiscordEvents } from "./configs/bot/functions/registerEvents";
export const client = new Client(clientOptions);

(async () => {
    await registerDiscordEvents(client, "../events/discord");
    client.login(process.env.DISCORD_TOKEN);
})();
