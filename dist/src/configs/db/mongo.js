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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoDB = void 0;
const mongoose_1 = require("mongoose");
const languages_1 = require("../languages/languages");
function connectMongoDB(client) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, mongoose_1.set)("strictQuery", false);
        yield (0, mongoose_1.connect)(process.env.MONGO_URI, {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((c) => {
            console.log(`\x1b[32m%s\x1b[0m`, "[ Database ]", `> Connected to DB ${c.connection.name}!`);
        });
        yield (0, languages_1.loadUserSettings)(client).then(() => {
            console.log(`\x1b[35m%s\x1b[0m`, `[ Bot ]`, `> Loaded user settings!`);
        });
    });
}
exports.connectMongoDB = connectMongoDB;
