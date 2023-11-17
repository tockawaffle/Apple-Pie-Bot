import { Events, Client, Message } from "discord.js";

import ChatBotHandler from "../../configs/handlers/commands/chat/ChatBotHandler";

export default {
    name: Events.MessageCreate,
    once: false,
    execute: async (message: Message, client: Client) => {
        if (!message.channel.isDMBased() || message.author.bot) return;

        const chatBotHandler = new ChatBotHandler(client);
        try {
            const data: MessageHandler = {
                model: "GPT-3.5",
                type: "DM",
                interaction: message,
            };
            return await chatBotHandler.handleMessages(data);
        } catch (error: any) {
            console.log(error);
            return await message.reply({
                content: client
                    .translation(
                        message.author,
                        "events::chatbot",
                        "eventError"
                    )
                    .replace("{error}", error.message),
            });
        }
    },
};
