import { Player } from "discord-player";
import { ActivityType, Client, GatewayIntentBits, Partials } from "discord.js";

import EventHandler from "../handlers/events/EventHandler";
import CommandHandler from "../../configs/handlers/commands/CommandHandler";
import dbConnect from "../database";
import Polyglot from "../handlers/language/LanguageHandler";

export default class Bot {
    private client: Client;
    private debug: boolean = false;

    constructor(private token: string, debug: boolean = false) {
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
        await dbConnect();
        await this.client.login(this.token);
        const player = new Player(this.client);
        await player.extractors.loadDefault();
        const events = new EventHandler(this.client, player);
        events.loadEvents();
        events.loadPlayerEvents();
        const commandHandler = new CommandHandler(this.client, this.debug);
        await commandHandler.loadCommands();
    }

    private async setBot() {}

    private setBotActivity() {
        const { setActivity } = this.client.user!;

        const activities = [
            {
                name: "To the beats of your heart!",
                type: ActivityType.Listening,
            },
            {
                name: "With your heart!",
                type: ActivityType.Playing,
            },
            {
                name: "Your heart!",
                type: ActivityType.Watching,
            },
            {
                name: "Doing nothing~~",
                type: ActivityType.Custom,
            },
        ];

        setInterval(() => {
            setActivity({
                ...activities[Math.floor(Math.random() * activities.length)],
            });
        }, 3600000);
    }

    private setBotImage() {}
}
