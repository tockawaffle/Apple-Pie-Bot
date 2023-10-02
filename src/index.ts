import "dotenv/config";
import StartBot from "./configs/bot/StartBot";

(async() => {
    new StartBot(process.env.DISCORD_TOKEN!, "./src/commands", "./src/events", true).start();
})()
