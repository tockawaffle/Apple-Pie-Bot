import { Schema, model, Document } from "mongoose";

interface passwdSchema extends Document {
    _id: string;
    accounts: [{}];
    dfa: {
        enabled: boolean;
        b32Secret: string;
        otpath: string;
    }
}

const passwd = new Schema<passwdSchema>({
    _id: { type: String, required: true },
    accounts: { type: [{}], required: true },
    dfa: {
        enabled: { type: Boolean, required: true, default: false },
        b32Secret: { type: String, required: true, default: "" },
        otpath: { type: String, required: true, default: "" },
    },
});

export default model<passwdSchema>("passwd", passwd);
