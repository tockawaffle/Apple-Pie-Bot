import { HTMLParser2Options, load } from "cheerio";
import moment from "moment";

export async function dClip({ clipId }: { clipId: string }): Promise<
    | {
          message: string;
          code: number;
          clipName?: string;
          clipUrl?: string;
          creatorUsername?: string;
          creatorUrl?: string;
          creatorPictureUrl?: string;
          creatorWasPlaying?: string;
          clippedOn?: string;
      }
    | {
          code: number;
          message: string;
          clipName: string;
          clipUrl: string;
          creatorUsername: string;
          creatorUrl: string;
          creatorPictureUrl: string;
          creatorWasPlaying: string;
          clippedOn: string;
      }
> {
    const fetch = require("node-fetch");
    let clip_id;
    if (clipId.includes("https://clips.twitch.tv/")) {
        clip_id = clipId.replace("https://clips.twitch.tv/", "");
    } else if (
        clipId.includes("https://www.twitch.tv/") &&
        clipId.includes("/clip/")
    ) {
        clip_id = clipId.replace("https://www.twitch.tv/", "");
    } else if (
        !clipId.includes("https://clips.twitch.tv/") ||
        !clipId.includes("https://www.twitch.tv/") ||
        !clipId.includes("/clip/") ||
        !clipId
    ) {
        throw new Error("Invalid Clip URL");
    }
    const req = fetch("https://clipr.xyz/" + clip_id);
    const res = await req;
    const body = await res.text();
    const $ = load(body, {
        xml: {
            normalizeWhitespace: true,
            decodeEntities: true,
            withStartIndices: false,
            withEndIndices: false, // Add an `endIndex` property to nodes.
        } as HTMLParser2Options,
    });
    let creator: string[] = [],
        clip: string[] = [],
        clipNameRaw: string[] = [],
        issueDetector: string[] = [],
        profilePictureUrlRaw: string[] = [],
        creatorWasPlaying: string,
        clippedOn: string;
    $("span.font-semibold").each(function (index, element) {
        creator.push($(element).text());
    });
    if (creator!.length == 0) {
        return {
            message: "Error: Creator not found",
            code: 404,
        };
    }

    const creatorUsername = creator![0],
        creatorUrl = `https://twitch.tv/${creator![0]}`;
    (creatorWasPlaying = creator![1]),
        (clippedOn = creator![2].replace(" ", ""));

    $(".flex-shrink-0 a.inline-flex").each(function (index, element) {
        clip.push($(element).attr("href") as string);
    });

    $("h2.max-w-2xl").each(function (index, element) {
        clipNameRaw.push($(element).text());
    });

    $("p.text-sm").each(function (index, element) {
        issueDetector.push($(element).text());
    });

    $(".relative img").each(function (index, element) {
        profilePictureUrlRaw.push($(element).attr("src") as string);
    });

    var creatorPictureUrl = profilePictureUrlRaw![2];

    if (clip![0] === undefined) {
        return {
            message: "Error: The clip was not found. Try a valid url.",
            code: 404,
        };
    } else {
        const clipName = clipNameRaw![0],
            clipUrl = `${clip![0]}`;
        const clipNameFormatted = clipName
            .replaceAll("\n", "")
            .replaceAll("\\", "-")
            .replaceAll("/", "-")
            .replaceAll(":", "-")
            .replaceAll("*", "-")
            .replaceAll("?", "-")
            .replaceAll('"', "-")
            .replaceAll("<", "-")
            .replaceAll(">", "-")
            .replaceAll("|", "-")
            .replaceAll(",", " ")
            .replaceAll("twitch", "");
        return {
            code: 200,
            message: "Success",
            clipName: clipNameFormatted,
            clipUrl,
            creatorUsername,
            creatorUrl,
            creatorPictureUrl,
            creatorWasPlaying,
            clippedOn: moment(Date.parse(clippedOn)).format("L"),
        };
    }
}
