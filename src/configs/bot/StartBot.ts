import { Client, GatewayIntentBits, Partials } from "discord.js";
import fs from "fs";
import path from "path";
import CommandHandler from "../../configs/handlers/commands/CommandHandler";
import EventHandler from "../handlers/events/EventHandler";
import { Player } from "discord-player";

import { connectMongoDB } from "../database";

const __dirname = path.resolve();

export default class Bot {
    private client: Client;
    private debug: boolean = false;

    constructor(
        private token: string,
        private commandsDir: string,
        private eventsDir: string,
        debug: boolean = false
    ) {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildModeration,
                GatewayIntentBits.GuildEmojisAndStickers,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildWebhooks,
                GatewayIntentBits.DirectMessageReactions,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.MessageContent,
            ],
            partials: [
                Partials.GuildMember,
                Partials.Channel,
                Partials.Message,
                Partials.Reaction,
                Partials.User,
            ],
        });

        this.debug = debug;
    }

    public async start(): Promise<void> {
        await connectMongoDB();
        await this.client.login(this.token);
        const player = new Player(this.client);
        await player.extractors.loadDefault();
        const events = new EventHandler(this.client, player);
        events.loadEvents();
        events.loadPlayerEvents();

        if (!fs.existsSync(this.commandsDir)) {
            this.logDebug(
                "red",
                "CommandHandler",
                "Commands directory not found",
                "error"
            );
            return;
        }

        const getCommandFiles = (dir: string): string[] => {
            const files = fs.readdirSync(dir);
            const commandFiles: string[] = [];
            for (const file of files) {
                if (file === "helpers") {
                    this.logDebug(
                        "yellow",
                        "Command Handler",
                        `Helper directory found, skipping...`,
                        "warn"
                    );
                    continue;
                }
                const filePath = path.join(dir, file);
                if (fs.statSync(filePath).isDirectory()) {
                    commandFiles.push(...getCommandFiles(filePath));
                } else if (file.endsWith(".ts")) {
                    commandFiles.push(filePath);
                }
            }
            return commandFiles;
        };

        const commandFiles = getCommandFiles(this.commandsDir);

        if (commandFiles.length === 0) {
            return;
        }

        const commandHandler = new CommandHandler(this.client, this.debug);

        for (const filePath of commandFiles) {
            const filePathUrl = new URL(filePath, `file://${__dirname}/`).href;
            const command = (await import(filePathUrl)).default as Command;

            if (
                !command ||
                !command.name ||
                !command.description ||
                typeof command.execute !== "function"
            ) {
                this.logDebug(
                    "yellow",
                    "Command Handler",
                    `Command ${filePath} is invalid`,
                    "warn"
                );
                continue;
            }

            commandHandler.registerCommand(command);
            this.logDebug(
                "green",
                "Command Handler",
                `Command ${filePath} registered`,
                "info"
            );
        }
    }

    private logDebug(
        color: string,
        firstString: string,
        message: string,
        logType: string
    ) {
        if (this.debug) {
            const colorCodes: Record<string, string> = {
                red: "\x1b[31m",
                green: "\x1b[32m",
                yellow: "\x1b[33m",
                blue: "\x1b[34m",
                magenta: "\x1b[35m",
                cyan: "\x1b[36m",
                reset: "\x1b[0m",
            };

            const consoleMethods: Record<string, (...data: any[]) => void> = {
                log: console.log,
                error: console.error,
                warn: console.warn,
                info: console.info,
                debug: console.debug,
            };

            const chosenColor = colorCodes[color] || colorCodes.reset;
            const chosenMethod = consoleMethods[logType] || consoleMethods.log;

            chosenMethod(
                `${chosenColor}[ ${firstString} ]${colorCodes.reset}`,
                `${message}`
            );
        }
    }
}
