import { Client } from "discord.js";
import { Player } from "discord-player";
import loadEvents from "./loadEvents";
import loadPlayerEvents from "./loadPlayerEvents";

export default class EventHandler {
    constructor(private client: Client, private playerClient: Player) {}

    public loadEvents(): void {
        this.loadGenericEvents(
            loadEvents,
            this.client,
            "[Erro: Eventos] > No events to be loaded were found!"
        );
    }

    public loadPlayerEvents(): void {
        this.loadGenericEvents(
            loadPlayerEvents,
            this.playerClient.events,
            "[Erro: Eventos (Player)] > No events to be loaded were found!"
        );
    }

    private loadGenericEvents(
        eventsToLoad: Events[] | PlayerEvent[],
        target: any,
        errorMsg: string
    ): void {
        if (eventsToLoad.length === 0) throw new Error(errorMsg);

        for (const event of eventsToLoad) {
            const { name, execute, once } = event;

            const callback = (...args: any[]) =>
                execute(...args, target, this.client);

            if (once) {
                target.once(name, callback);
            } else {
                target.on(name, callback);
            }
        }
    }
}
