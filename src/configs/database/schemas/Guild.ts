import { Schema, model } from "mongoose";

const guildSchema = new Schema<GuildSchema>({
    _id: { type: String, required: true },
    enabledAi: { type: Boolean, required: true, default: false },
    categoryAi: { type: String, required: false },
    channelsAi: {
        type: Object,
        required: false,
        default: {},
    },
    isPartner: { type: Boolean, required: false, default: false },
    tier: { type: String, required: true, default: "free" },
    localEconomy: {
        enabled: { type: Boolean, required: true, default: false },
        currencyName: { type: String, required: true, default: "coins" },
        dailyReward: {
            isActive: { type: Boolean, required: true, default: false },
            lastClaimed: { type: Number, required: true, default: 0 },
            amount: { type: Number, required: true, default: 0 },
        },
        icon: { type: String, required: false },
    },
});

export default model<GuildSchema>("guilds", guildSchema);
