"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const passwd = new mongoose_1.Schema({
    _id: { type: String, required: true },
    accounts: { type: [{}], required: true },
    dfa: {
        enabled: { type: Boolean, required: true, default: false },
        b32Secret: { type: String, required: true, default: "" },
        otpath: { type: String, required: true, default: "" },
    },
});
exports.default = (0, mongoose_1.model)("passwd", passwd);
