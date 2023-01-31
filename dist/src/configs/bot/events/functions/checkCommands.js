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
exports.checkCommands = void 0;
const discord_js_1 = require("discord.js");
function checkCommands(client, instance) {
    return __awaiter(this, void 0, void 0, function* () {
        const i = instance;
        const instanceCommandsArray = [];
        const instanceCommands = (yield i.commandHandler.commands);
        instanceCommands.forEach((command) => {
            instanceCommandsArray.push(command.commandName);
        });
        instanceCommands.forEach((command) => {
            const nameLocale = command.commandObject.nameLocalizations;
            //remove undefined values
            const nameLocaleFiltered = nameLocale["pt-BR"];
            instanceCommandsArray.push(nameLocaleFiltered);
        });
        const clientCommands = yield client.application.commands.fetch();
        const clientCommandsArray = [];
        clientCommands.forEach((command) => {
            clientCommandsArray.push(command.name);
        });
        const commandsToDelete = clientCommandsArray.filter((command) => !instanceCommandsArray.includes(command));
        let index = 0;
        if (commandsToDelete.length > 0) {
            for (const command of commandsToDelete) {
                const c = clientCommands.map((commands) => {
                    if (commands.name === command)
                        return commands;
                });
                const commandToDelete = c.filter((command) => command !== undefined);
                yield client.application.commands.delete(commandToDelete[0].id);
                yield client.rest
                    .delete(discord_js_1.Routes.applicationCommand(client.user.id, commandToDelete[0].id))
                    .catch((err) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    if (err.code === 404) {
                        const r = yield client.rest.delete(discord_js_1.Routes.applicationGuildCommand(client.user.id, (_a = commandToDelete[0]) === null || _a === void 0 ? void 0 : _a.guildId, commandToDelete[0].id));
                    }
                }));
                index++;
                console.log(`[ Handler ] > Command "${command}" deleted.`);
            }
            if (index === commandsToDelete.length)
                console.log(`[ Handler ] > ${index} commands deleted.`);
        }
    });
}
exports.checkCommands = checkCommands;
