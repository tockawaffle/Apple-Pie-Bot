import nodemon from "nodemon";
import { EmbedBuilder, WebhookClient, ColorResolvable } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

function sendWebhook(
    message: string,
    fields?: { name: string; value: string }[],
    color?: number | ColorResolvable,
    autoRestart?: boolean
) {
    const cb = new WebhookClient({
        id: process.env.DISCORD_WEBHOOK_ID as string,
        token: process.env.DISCORD_WEBHOOK_TOKEN as string,
    }).send({
        username: process.env.DISCORD_WEBHOOK_USERNAME,
        avatarURL: process.env.DISCORD_WEBHOOK_AVATAR_URL,
        embeds: [
            new EmbedBuilder({
                title: `${process.env.DISCORD_WEBHOOK_USERNAME} - Handler`,
                description: message,
                color: color ?? "RANDOM",
                fields: fields ? fields : [],
            }),
        ],
    });
    if (autoRestart) {
        nodemon.emit("restart");
    }
    return cb;
}

nodemon({ script: "src/bot.ts", stdout: false })
    .on("start", () => {
        sendWebhook(
            `${process.env.DISCORD_WEBHOOK_USERNAME} is now running!`,
            [],
            "GREEN"
        );
    })
    .on("restart", () => {
        sendWebhook(
            `${process.env.DISCORD_WEBHOOK_USERNAME} has restarted!`,
            [],
            "BLUE"
        );
    })
    .on("exit", () => {
        sendWebhook(
            `${process.env.DISCORD_WEBHOOK_USERNAME} has stopped.`,
            [],
            "RED"
        );
    })
    // .on("stderr", (data) => {
    //     const dString = data.toString();
    //     const err = dString.split("\n")[0] as string;
    //     sendWebhook(
    //         "Something went wrong!",
    //         [{ name: "Error:", value: err.replace("Error:", "") }],
    //         16190746,
    //         true
    //     ).then(() => {
    //         nodemon.emit("quit");
    //         process.exit(1);
    //     });
    // })
    .on("stdout", (data) => {
        const dString = data.toString();
        console.log(dString)
    });

process.on("SIGINT", () => {
    nodemon.emit("exit");
    setTimeout(() => {
        process.exit(0);
    }, 2000);
});
