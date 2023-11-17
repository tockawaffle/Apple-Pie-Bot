import { encode } from "gpt-3-encoder";
import { ChatCompletionMessage } from "openai/resources/chat";
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";
import { Client, CommandInteraction, Guild, Message, User } from "discord.js";

import UserSchema from "../../../database/schemas/User";

export default class ChatBotHandler {
    private client: Client;
    private openai: Client["openai"];

    constructor(client: Client) {
        this.client = client;
        this.openai = client.openai;
    }

    private async fetchUserDB(user: User) {
        const userDB = await UserSchema.findOne({ _id: user.id });
        if (!userDB) throw new Error("User not found on database.");
        return userDB;
    }

    private async handleTokens(user: User, context: string, modelUsed: Models) {
        const tokens = encode(context).length;

        const MODEL_DATA: Record<
            Models,
            { tokenByModel: number; minRoundedTokens: number }
        > = {
            "GPT-4": { tokenByModel: 512, minRoundedTokens: 2 },
            "GPT-4-VISION": { tokenByModel: 512, minRoundedTokens: 2 },
            "GPT-3.5": { tokenByModel: 1024, minRoundedTokens: 0.5 },
            "GPT-3.5-16k": { tokenByModel: 2048, minRoundedTokens: 1 },
        };

        const { tokenByModel, minRoundedTokens } = MODEL_DATA[modelUsed];

        const tokenCount = Math.max(
            minRoundedTokens,
            Math.round(tokens / tokenByModel)
        );
        console.log(tokenCount);
        const userDB = await this.fetchUserDB(user);
        const modelKeys: Record<Models, keyof typeof userDB.economy.ai> = {
            "GPT-4": "gpt4",
            "GPT-3.5-16k": "gpt316k",
            "GPT-3.5": "gpt3",
            "GPT-4-VISION": "gpt4Vision",
        };

        const modelKey = modelKeys[modelUsed];
        const hasCredits = userDB.economy.ai[modelKey] >= tokenCount;

        if (!hasCredits) {
            return {
                error: true,
                message: "User does not have enough credits.",
                tokens: tokenCount,
            };
        }

        userDB.economy.ai[modelKey] -= tokenCount;
        userDB.markModified("economy.ai");
        await userDB.save();

        return {
            error: false,
            message: "Success",
            tokens: tokenCount,
        };
    }

    private async handleMemory(user: User) {
        const userDB = await this.fetchUserDB(user);
        const tierKey =
            Object.keys(userDB.tier).find(
                (tier) => userDB.tier[tier as keyof IUser["tier"]].has
            ) || "free";
        return userDB.tier[tierKey as keyof IUser["tier"]].memoryAmount;
    }

    private getSystemMessage(type: "DM" | "GUILD", user: User, guild?: Guild) {
        const commonMessage = `Your name is ${
            this.client.user!.username
        }, your purpose is to listen to the user (His name: ${
            user.username
        }), talk in a calm, passionate way, be cute, understanding and happy. Roleplay as a cute girl. You're on Discord. Developer's ID: ${
            this.client.users.cache.get(process.env.OWNER_ID!)!.id
        }, Developer's username: ${
            this.client.users.cache.get(process.env.OWNER_ID!)!.username
        }. Always answer in the user's language.`;

        return type === "DM"
            ? `${commonMessage} You're in ${user.username}'s DM chat.`
            : `${commonMessage} You're in the ${guild!.name} guild.`;
    }

    private async sendChatMessage(
        messages: ChatCompletionMessage[],
        model: ChatCompletionCreateParamsBase["model"],
        type: "DM" | "GUILD",
        user: User,
        guild?: Guild
    ) {
        return this.openai.chat.completions.create({
            messages: [
                {
                    content: this.getSystemMessage(type, user, guild),
                    role: "system",
                },
                ...messages,
            ],
            max_tokens: 2048,
            model,
        });
    }

    private async moderateChatMessage(message: string) {
        return this.openai.moderations.create({ input: message });
    }

    private async imageHandler(options: ImageHandler) {
        const { type, interaction } = options;
        let image: string | undefined;

        switch (type) {
            case "DM": {
                image = interaction.attachments.first()?.url;
                break;
            }
            // case "GUILD": {
            //     image = interaction.
            //     break;
            // }
        }
        console.log(image);
        return image;
    }

    public async handleMessages(data: MessageHandler) {
        switch (data.type) {
            case "DM": {
                await this.handleDm(data.interaction as Message);
                break;
            }
            case "GUILD": {
                await this.handleGuild(
                    data.interaction as CommandInteraction,
                    data.model as Models
                );
                break;
            }
            case "GUILD_CONTINUATION": {
                await this.handleDm(data.interaction as Message);
                break;
            }
        }
    }

    private async handleDm(interaction: Message) {
        await interaction.channel.sendTyping();

        const moderationResult = (
            await this.moderateChatMessage(interaction.content)
        ).results[0];
        if (moderationResult.flagged) {
            const flaggedMessage = this.client
                .translation(
                    interaction.author,
                    "events::chatbot",
                    "flaggedMessage"
                )
                .replace(
                    "{flags}",
                    Object.keys(moderationResult.categories).join(", ")
                );

            const msg = await interaction.reply({ content: flaggedMessage });
            setTimeout(() => {
                msg.delete();
            }, 5000);
        }

        const getImages = await this.imageHandler({
            type: "DM",
            interaction,
        });

        let tokenModel: Models = getImages ? "GPT-4-VISION" : "GPT-3.5";

        const tokenResult = await this.handleTokens(
            interaction.author,
            interaction.content,
            tokenModel
        );

        if (tokenResult.error) {
            const msg = await interaction.reply({
                content: this.client
                    .translation(
                        interaction.author,
                        "events::chatbot",
                        "eventError"
                    )
                    .replace("{error}", tokenResult.message),
            });
            setTimeout(() => {
                msg.delete();
            }, 5000);
            return;
        }

        const memoryLimit = await this.handleMemory(interaction.author);

        const chatHistory = await interaction.channel.messages.fetch({
            limit: memoryLimit,
        });

        const formattedChatHistory: ChatCompletionMessage[] = chatHistory
            .map((msg) => ({
                content: msg.content,
                role: msg.author.bot
                    ? "assistant"
                    : ("user" as ChatCompletionMessage["role"]),
            }))
            .reverse();

        if (getImages) {
            formattedChatHistory.push({
                role: "user" as ChatCompletionMessage["role"],
                //@ts-ignore
                content: [
                    {
                        type: "image_url",
                        image_url: {
                            url: getImages,
                        },
                    },
                ],
            });
        }

        const response = await this.sendChatMessage(
            formattedChatHistory,
            tokenModel ? "gpt-4-vision-preview" : "gpt-3.5",
            "DM",
            interaction.author
        );
        const replyContent = response.choices[0]?.message?.content;

        if (!replyContent) {
            throw new Error("[ChatBot] > Invalid response from OpenAI.");
        }

        await interaction.channel.send(replyContent);
    }

    private async handleGuild(interaction: CommandInteraction, model: Models) {
        const { user } = interaction;
        const moderationResult = (
            await this.moderateChatMessage(
                interaction.options!.resolved!.messages!.first()!.content
            )
        ).results[0];

        if (moderationResult.flagged) {
            const flaggedMessage = this.client
                .translation(user, "events::chatbot", "flaggedMessage")
                .replace(
                    "{flags}",
                    Object.keys(moderationResult.categories).join(", ")
                );

            const msg = await interaction.reply({ content: flaggedMessage });
            setTimeout(() => {
                msg.delete();
            }, 5000);
        }

        const tokenResult = await this.handleTokens(
            user,
            interaction.options!.resolved!.messages!.first()!.content,
            model
        );

        if (tokenResult.error) {
            const msg = await interaction.reply({
                content: this.client
                    .translation(user, "events::chatbot", "eventError")
                    .replace("{error}", tokenResult.message),
            });
            setTimeout(() => {
                msg.delete();
            }, 5000);
            return;
        }

        const memoryLimit = await this.handleMemory(user);

        const chatHistory = await interaction.channel!.messages.fetch({
            limit: memoryLimit,
        });

        const formattedChatHistory: ChatCompletionMessage[] = chatHistory
            .map((msg) => ({
                content: msg.content,
                role: msg.author.bot
                    ? "assistant"
                    : ("user" as ChatCompletionMessage["role"]),
            }))
            .reverse();

        const response = await this.sendChatMessage(
            formattedChatHistory,
            model,
            "GUILD",
            user,
            interaction.guild!
        );

        const replyContent = response.choices[0]?.message?.content;

        if (!replyContent) {
            throw new Error("[ChatBot] > Invalid response from OpenAI.");
        }

        await interaction.channel!.sendTyping();
        await interaction.editReply(replyContent);
    }
}
