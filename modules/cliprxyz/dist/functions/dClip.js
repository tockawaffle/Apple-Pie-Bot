"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dClip = void 0;
const cheerio_1 = require("cheerio");
const moment_1 = __importDefault(require("moment"));
function dClip({ clipId }) {
    return __awaiter(this, void 0, void 0, function* () {
        const fetch = require("node-fetch");
        let clip_id;
        if (clipId.includes("https://clips.twitch.tv/")) {
            clip_id = clipId.replace("https://clips.twitch.tv/", "");
        }
        else if (clipId.includes("https://www.twitch.tv/") &&
            clipId.includes("/clip/")) {
            clip_id = clipId.replace("https://www.twitch.tv/", "");
        }
        else if (!clipId.includes("https://clips.twitch.tv/") ||
            !clipId.includes("https://www.twitch.tv/") ||
            !clipId.includes("/clip/") ||
            !clipId) {
            throw new Error("Invalid Clip URL");
        }
        const req = fetch("https://clipr.xyz/" + clip_id);
        const res = yield req;
        const body = yield res.text();
        const $ = (0, cheerio_1.load)(body, {
            xml: {
                normalizeWhitespace: true,
                decodeEntities: true,
                withStartIndices: false,
                withEndIndices: false, // Add an `endIndex` property to nodes.
            },
        });
        let creator = [], clip = [], clipNameRaw = [], issueDetector = [], profilePictureUrlRaw = [], creatorWasPlaying, clippedOn;
        $("span.font-semibold").each(function (index, element) {
            creator.push($(element).text());
        });
        if (creator.length == 0) {
            return {
                message: "Error: Creator not found",
                code: 404,
            };
        }
        const creatorUsername = creator[0], creatorUrl = `https://twitch.tv/${creator[0]}`;
        (creatorWasPlaying = creator[1]),
            (clippedOn = creator[2].replace(" ", ""));
        $(".flex-shrink-0 a.inline-flex").each(function (index, element) {
            clip.push($(element).attr("href"));
        });
        $("h2.max-w-2xl").each(function (index, element) {
            clipNameRaw.push($(element).text());
        });
        $("p.text-sm").each(function (index, element) {
            issueDetector.push($(element).text());
        });
        $(".relative img").each(function (index, element) {
            profilePictureUrlRaw.push($(element).attr("src"));
        });
        var creatorPictureUrl = profilePictureUrlRaw[2];
        if (clip[0] === undefined) {
            return {
                message: "Error: The clip was not found. Try a valid url.",
                code: 404,
            };
        }
        else {
            const clipName = clipNameRaw[0], clipUrl = `${clip[0]}`;
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
                clippedOn: (0, moment_1.default)(Date.parse(clippedOn)).format("L"),
            };
        }
    });
}
exports.dClip = dClip;
