import https from "https";
import { createWriteStream, createReadStream, unlink } from "fs";
import { dClip } from "./dClip";

/**
 * @param {string} path - The path to the directory to save the clip to
 * @param {string} clipUrl - The complete twitch URL of the clip to download
 * @returns {Object} - An object containing the clip's name, the path it was saved to, the download url, and creator's username, as well as the 200 status code
 * @throws {Error} - An object containing the error message and the status code
 */
export async function pClip({
    path,
    clipId
}: {
    path: string;
    clipId: string;
}): Promise<
    | {
          message: string;
          path: string;
          code: number;
          name?: string;
          url?: string;
      }
    | { message: string; path: string; name: string; url: string; code: number }
> {
    if (!path)
        return { message: "Error: Path is not defined", path: "", code: 404 };
    else if(!clipId)
        return { message: "Error: Clip URL is not defined", path: "", code: 404 };
    if (
        !new RegExp(
            /^(?:[a-z]:)?[\/\\]{0,2}(?:[.\/\\ ](?![.\/\\\n])|[^<>:"|?*.\/\\ \n])+$/gim
        ).test(path)
    ) {
        return {
            message: "Error: Path is not valid",
            path,
            code: 404,
        };
    }
    const clip = await dClip({ clipId });
    if (clip.code !== 200) {
        return {
            message: clip.message,
            path,
            code: clip.code,
        };
    }
    const { clipName, clipUrl: clipUrlRaw } = clip;
    https.get(clipUrlRaw as string, (res) => {
        const src = `${__dirname}\\clips\\${clipName}.mp4`;
        if (path === `${__dirname}\\clips`) {
            return {
                message: "Conflict: Duplicated Path URL",
                path,
                code: 409,
            };
        }
        const InitialWriteStream = createWriteStream(src);

        res.pipe(InitialWriteStream);
        InitialWriteStream.on("finish", async () => {
            InitialWriteStream.close();
            const source = createReadStream(src),
                dest = createWriteStream(`${path}\\${clipName}.mp4`);

            source.pipe(dest);
            source.on("end", () => {
                unlink(src, (err) => {
                    if (err) return err;
                });
            });
        });
    });

    return {
        message: `Success`,
        path: `${path}\\${clipName}.mp4`,
        name: clipName,
        url: clipUrlRaw,
        code: 200,
    };
}