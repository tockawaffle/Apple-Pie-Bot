import { Schema, model, Document } from "mongoose";

interface account extends Document {
    _id: string;
    createdAt: Date;
    account_settings: {
        language: string;
    };
    guilds_owned?: [
        {
            guild_id?: string;
            guild_name?: string;
        }
    ];
}

const account_schema = new Schema<account>({
    _id: { type: String, required: true },
    account_settings: {
        language: { type: String, required: true },
    },
    guilds_owned: [
        {
            guild_id: { type: String, required: true },
            guild_name: { type: String, required: true },
        },
    ],
    createdAt: { type: Date, required: true, default: Date.now },
});

export default model<account>("accounts", account_schema);
