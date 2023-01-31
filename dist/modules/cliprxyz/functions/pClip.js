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
exports.pClip = void 0;
const https_1 = __importDefault(require("https"));
const fs_1 = require("fs");
const dClip_1 = require("./dClip");
/**
 * @param {string} path - The path to the directory to save the clip to
 * @param {string} clipUrl - The complete twitch URL of the clip to download
 * @returns {Object} - An object containing the clip's name, the path it was saved to, the download url, and creator's username, as well as the 200 status code
 * @throws {Error} - An object containing the error message and the status code
 */
function pClip({ path, clipId }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!path)
            return { message: "Error: Path is not defined", path: "", code: 404 };
        else if (!clipId)
            return { message: "Error: Clip URL is not defined", path: "", code: 404 };
        if (!new RegExp(/^(?:[a-z]:)?[\/\\]{0,2}(?:[.\/\\ ](?![.\/\\\n])|[^<>:"|?*.\/\\ \n])+$/gim).test(path)) {
            return {
                message: "Error: Path is not valid",
                path,
                code: 404,
            };
        }
        const clip = yield (0, dClip_1.dClip)({ clipId });
        if (clip.code !== 200) {
            return {
                message: clip.message,
                path,
                code: clip.code,
            };
        }
        const { clipName, clipUrl: clipUrlRaw } = clip;
        https_1.default.get(clipUrlRaw, (res) => {
            const src = `${__dirname}\\clips\\${clipName}.mp4`;
            if (path === `${__dirname}\\clips`) {
                return {
                    message: "Conflict: Duplicated Path URL",
                    path,
                    code: 409,
                };
            }
            const InitialWriteStream = (0, fs_1.createWriteStream)(src);
            res.pipe(InitialWriteStream);
            InitialWriteStream.on("finish", () => __awaiter(this, void 0, void 0, function* () {
                InitialWriteStream.close();
                const source = (0, fs_1.createReadStream)(src), dest = (0, fs_1.createWriteStream)(`${path}\\${clipName}.mp4`);
                source.pipe(dest);
                source.on("end", () => {
                    (0, fs_1.unlink)(src, (err) => {
                        if (err)
                            return err;
                    });
                });
            }));
        });
        return {
            message: `Success`,
            path: `${path}\\${clipName}.mp4`,
            name: clipName,
            url: clipUrlRaw,
            code: 200,
        };
    });
}
exports.pClip = pClip;
