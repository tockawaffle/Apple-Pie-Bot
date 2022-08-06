import { dClip, pClip } from "../index";
import nodemon from "nodemon";
(async () => {
    console.log("Testing . . .");
    let fPassed: boolean = false,
        sPassed: boolean = false,
        tPassed: boolean = false,
        ftPassed: boolean = false;
    async function f() {
        console.log("\nStarting first test . . .");
        try {
            const clip = await dClip({
                clipId: "https://www.twitch.tv/sirhcez/clip/SavoryAuspiciousYamBrokeBack-bPO2bupMbgFZfP5X?filter=clips&range=30d&sort=time",
            });

            if (clip.code !== 200) {
                return console.log(`First test failed: ${clip.message}`);
            }
            fPassed = true;
            console.log("\nFirst test passed");
        } catch (error) {
            return console.log(error);
        }
    }
    await f();
    async function s() {
        console.log("\nStarting second test . . .");
        try {
            const clipWithPath = await pClip({
                clipId: "https://www.twitch.tv/sirhcez/clip/SavoryAuspiciousYamBrokeBack-bPO2bupMbgFZfP5X?filter=clips&range=30d&sort=time",
                path: __dirname + "/clips",
            });
            if (clipWithPath.code !== 200) {
                return console.log(
                    `\nSecond test failed: ${clipWithPath.message}`
                );
            }
            sPassed = true;
            console.log("\nSecond test passed");
        } catch (error) {
            return console.log(error);
        }
    }
    await s();
    async function t() {
        console.log("\nStarting third test . . .");
        try {
            const propositalCrash = await dClip({
                clipId: "https://www.twitch.tv/sirhcez/clip/SavoryAu",
            });
            if (propositalCrash.code !== 200) {
                console.log(
                    `\nThird test successfully (?): ${propositalCrash.message}\nShould have thrown an error because the clip id is invalid`
                );
            }
            tPassed = true;
        } catch (error) {
            return console.log(error);
        }
    }
    await t();
    async function ft() {
        console.log("\nStarting fourth test . . .");
        const propositalPathCrash = await pClip({
            clipId: "https://www.twitch.tv/sirhcez/clip/SavoryAuspiciousYamBrokeBack-bPO2bupMbgFZfP5X?filter=clips&range=30d&sort=time",
            path: __dirname + "/cl?ips",
        });
        if (propositalPathCrash.code !== 200) {
            console.log(
                `\nFourth test failed successfully (?): ${propositalPathCrash.message}\nShould have failed because of the ? in the path`
            );
        }
        ftPassed = true;
    }
    await ft();

    if (fPassed && sPassed) {
        return console.log("All tests passed");
    } else {
        console.log("Some tests failed");
    }
})();
