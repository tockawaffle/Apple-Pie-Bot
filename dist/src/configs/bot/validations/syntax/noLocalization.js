"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (command) => {
    const { commandObject, commandName } = command;
    if (!commandObject.nameLocalizations || !commandObject.descriptionLocalizations) {
        throw new Error(`[ Handler ] > Command "${commandName}" is missing a localization.`);
    }
    else if (!commandObject.nameLocalizations["pt-BR"]) {
        throw new Error(`[ Handler ] > Command "${commandName}" is missing a localization for "pt-BR".`);
    }
};
