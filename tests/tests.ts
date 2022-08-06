import { dClip } from "../modules/cliprxyz";
import "dotenv/config";
(async () => {
    const fetch = require("node-fetch");
    let clipsPassed: boolean = false,
        discordPassed: boolean = false;
    async function testClips() {
        try {
            const clip = await dClip({
                clipId: "https://www.twitch.tv/tockawa/clip/SparklingLitigiousHamsterPhilosoraptor-3Af2Vvr7SMG8Szk6",
            });
            const {
                code,
                message,
                clipName,
                clipUrl,
                creatorUsername,
                creatorUrl,
                creatorPictureUrl,
                creatorWasPlaying,
                clippedOn,
            } = clip;

            if (
                !code ||
                !message ||
                !clipName ||
                !clipUrl ||
                !creatorUsername ||
                !creatorUrl ||
                !creatorPictureUrl ||
                !creatorWasPlaying ||
                !clippedOn
            ) {
                throw new Error("Invalid clip data");
            }

            if (code !== 200) {
                throw new Error(`Could not download clip: ${message}`);
            }
            clipsPassed = true;
        } catch (error) {
            return console.log(error);
        }
    }
    await testClips();
    if (!clipsPassed) {
        return console.log("❌ Clips failed");
    } else console.log("✔ Clips passed");

    async function testDiscord() {
        try {
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bot ${process.env.DISCORD_TOKEN as string}`,
                    Accept: "application/json",
                },
            };
            const response = await fetch(
                    `https://discordapp.com/api/users/@me`,
                    options
                ),
                fetchBotJson = await response.json();

            if (!fetchBotJson.id) {
                switch (fetchBotJson.message) {
                    case "401: Unauthorized":
                        console.log(
                            `\x1b[31m Token de acesso inválido, verifique.\x1b[0m\n\x1b[31m Caso não tenha um token de acesso, utilize o seguinte link e crie um bot: \x1b[0m\nhttps://discordapp.com/developers/applications`
                        );
                        break;
                    case "400: Bad Request":
                        console.log(
                            `\x1b[31m Requisição Inválida, tente novamente em alguns momentos!\x1b[0m`
                        );
                        break;
                }
                return;
            }
            discordPassed = true;
        } catch (error) {
            return console.log(error);
        }
    }
    await testDiscord();
    if (!discordPassed) {
        return console.log("❌ Discord failed");
    }
    console.log("✔ Discord passed");
    console.log("\x1b[32m✔ All tests passed!\x1b[0m");
    console.log("Now you can start the bot!");
    process.exit(2);
})();
