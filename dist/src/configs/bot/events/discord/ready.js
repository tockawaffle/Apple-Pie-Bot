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
const discord_js_1 = require("discord.js");
const mongo_1 = require("../../../db/mongo");
const client_1 = require("../../client");
const checkCommands_1 = require("../functions/checkCommands");
const _wokcommands_1 = __importDefault(require("@wokcommands/"));
module.exports = {
    name: discord_js_1.Events.ClientReady,
    once: false,
    execute(client) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, mongo_1.connectMongoDB)(client);
            client_1.wokOptions.client = client;
            const instance = new _wokcommands_1.default(client_1.wokOptions);
            console.log(`\x1b[35m%s\x1b[0m`, `[ Bot ]`, `> Logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}!`);
            client.rest = client_1.RESTdjs;
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                yield (0, checkCommands_1.checkCommands)(client, instance);
            }), 4000);
        });
    },
};
