"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const account_schema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)("accounts", account_schema);
