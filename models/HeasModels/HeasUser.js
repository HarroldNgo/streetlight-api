const mongoose = require("mongoose");
const { connectDBs } = require("../../db");

const HeasUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
}, { timestamps: true });

const {streetlightDB, heasDB} = connectDBs();
module.exports = heasDB.model("User", HeasUserSchema);