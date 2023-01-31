"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (command) => {
    const { commandObject, commandName } = command;
    if (!commandObject.category) {
        throw new Error(`[ Handler ] > Command "${commandName}" is missing a category.`);
    }
};
