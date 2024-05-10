"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AstrologerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    languages: [
        {
            type: String,
        },
    ],
    specialties: [
        {
            type: String,
        },
    ],
    profileImageUrl: {
        type: String,
        required: true,
    },
});
const AstrologerModel = (0, mongoose_1.model)("Astrologer", AstrologerSchema);
exports.default = AstrologerModel;
