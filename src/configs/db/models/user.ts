import { Schema, model, Document } from "mongoose";

interface account extends Document {
    _id: string;
    createdAt: Date;
    account_settings: {
        language: string;
        customBackgroundName?: string;
        customMarriageBackgroundName?: string;
    };
    marriedTo?: {
        user_id: string;
        user_name: string;
        marryDate: string;
        divorceTries?: number;
        nextDivorceTry?: Date;
        marriedAt: {
            guild_id: string;
            guild_name: string;
        };
    };
    wasMarriedTo?: [
        {
            user_id: string;
            user_name: string;
            divorceDate: Date;
        }
    ];
    currency: {
        coinsAmount: number;
        nextDailyReward: Date | null;
        nextWeeklyReward: Date | null;
        nextMonthlyReward: Date | null;
        premium?: {
            active: boolean;
            premiumSince: Date | null;
            premiumUntil: Date | null;
            nextPayment: Date | null;
        }
    };
    likeAmount?: number;
}

const account_schema = new Schema<account>({
    _id: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    account_settings: {
        language: { type: String, required: true },
        customBackgroundName: { type: String, required: false },
        customMarriageBackgroundName: { type: String, required: false },
    },
    marriedTo: {
        user_id: { type: String, required: true },
        user_name: { type: String, required: true },
        marryDate: { type: String, required: true },
        divorceTries: { type: Number, required: true },
        nextDivorceTry: { type: Date, required: true },
        marriedAt: {
            guild_id: { type: String, required: true },
            guild_name: { type: String, required: true },
        },
    },
    wasMarriedTo: [
        {
            user_id: { type: String, required: true },
            user_name: { type: String, required: true },
        },
    ],
    currency: {
        coinsAmount: { type: Number, required: true, default: 1000 },
        nextDailyReward: { type: Date, required: true, default: null },
        nextWeeklyReward: { type: Date, required: true, default: null },
        nextMonthlyReward: { type: Date, required: true, default: null },
        premium: {
            active: { type: Boolean, required: true, default: false },
            premiumSince: { type: Date, required: true, default: null },
            premiumUntil: { type: Date, required: true, default: null },
            nextPayment: { type: Date, required: true, default: null },
        },
    },
    likeAmount: { type: Number, required: true },
});

export default model<account>("accounts", account_schema);
