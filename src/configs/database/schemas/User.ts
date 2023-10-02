import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
    _id: string;
    username: string;
    language: string;
    economy: {
        ai: {
            model:
                | "GPT-4"
                | "GPT-3.5"
                | "GPT-3.5-16k"
                | "DALL-E-1024"
                | "DALL-E-512"
                | "DALL-E-256";
            tokens: number;
        }[];
        global: {
            amount: number;
            dailyReward: {
                lastClaimed: number;
                claimed: boolean;
            };
        };
    };
}

const userSchema = new Schema<IUser>({
    _id: { type: String, required: true },
    username: { type: String, required: true },
    language: { type: String, required: true, default: "en-US" },
    economy: {
        ai: [
            {
                model: { type: String, required: true },
                tokens: { type: Number, default: 0 },
            },
        ],
        global: {
            amount: { type: Number, required: true, default: 0 },
            dailyReward: {
                lastClaimed: { type: Number, required: true, default: 0 },
                claimed: { type: Boolean, required: true, default: false },
            },
        },
    },
});

userSchema.pre<IUser>("save", function (next) {
    this.economy.ai.forEach((aiEntry) => {
        switch (aiEntry.model) {
            case "GPT-4":
                aiEntry.tokens = 200;
                break;
            case "GPT-3.5":
                aiEntry.tokens = 500;
                break;
            case "GPT-3.5-16k":
                aiEntry.tokens = 300;
                break;
            case "DALL-E-1024":
                aiEntry.tokens = 10;
                break;
            case "DALL-E-512":
                aiEntry.tokens = 15;
                break;
            case "DALL-E-256":
                aiEntry.tokens = 20;
                break;
            default:
                aiEntry.tokens = 0;
                break;
        }
    });
    next();
});

export default model<IUser>("user", userSchema);
