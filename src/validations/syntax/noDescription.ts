import {Command} from "wokcommands"

export default (command: Command) => {
    const {commandObject, commandName} = command
    if(!commandObject.category) {
        throw new Error(
            `[ Handler ] > Command "${commandName}" is missing a category.`
        )
    }
}

