const mongoose = require("mongoose");
const { connectDBs } = require("../db");

const UserSchema = new mongoose.Schema({
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
module.exports = streetlightDB.model("User", UserSchema);