import "dotenv/config";
import "discord.js";
import StartBot from "./configs/bot/StartBot";

(async() => {
    new StartBot(process.env.DISCORD_TOKEN!, true).start();
})()
