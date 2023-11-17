import { Schema, model } from "mongoose";

const userSchema = new Schema<IUser>({
    _id: { type: String, required: true },
    username: { type: String, required: true },
    language: { type: String, required: true, default: "en-US" },
    tier: {
        free: {
            has: { type: Boolean, required: true, default: true },
            memoryAmount: { type: Number, required: true, default: 5 },
            validUntil: { type: Number, required: true, default: 0 },
            priceTag: { type: Number, required: true, default: 0 },
        },
        basic: {
            has: { type: Boolean, required: true, default: false },
            memoryAmount: { type: Number, required: true, default: 10 },
            validUntil: { type: Number, required: true, default: 0 },
            priceTag: { type: Number, required: true, default: 5 },
        },
        premium: {
            has: { type: Boolean, required: true, default: false },
            memoryAmount: { type: Number, required: true, default: 30 },
            validUntil: { type: Number, required: true, default: 0 },
            priceTag: { type: Number, required: true, default: 10 },
        },
        ultimate: {
            has: { type: Boolean, required: true, default: false },
            memoryAmount: { type: Number, required: true, default: 50 },
            validUntil: { type: Number, required: true, default: 0 },
            priceTag: { type: Number, required: true, default: 20 },
        },
        enterprise: {
            has: { type: Boolean, required: true, default: false },
            memoryAmount: { type: Number, required: true, default: 75 },
            validUntil: { type: Number, required: true, default: 0 },
            priceTag: { type: Number, required: true, default: 50 },
        },
    },
    defaultDmModel: { type: String, required: true, default: "GPT-3.5" },
    economy: {
        ai: {
            gpt316k: { type: Number, required: true, default: 500 },
            gpt3: { type: Number, required: true, default: 600 },
            gpt4: { type: Number, required: true, default: 300 },
            gpt4Vision: { type: Number, required: true, default: 150 },
        },
        global: {
            amount: { type: Number, required: true, default: 0 },
            dailyReward: {
                lastClaimed: { type: Number, required: true, default: 0 },
                claimed: { type: Boolean, required: true, default: false },
            },
        },
    },
});

export default model<IUser>("user", userSchema);
