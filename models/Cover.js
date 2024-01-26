const mongoose = require("mongoose");
const { connectDBs } = require("../db");

const CoverSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        photo: {
            type: String,
        },
    },
    { timestamps: true }
);
const {streetlightDB, heasDB} = connectDBs();
module.exports = streetlightDB.model("Cover", CoverSchema);