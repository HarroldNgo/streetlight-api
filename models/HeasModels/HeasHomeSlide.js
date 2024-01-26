const mongoose = require("mongoose");
const { connectDBs } = require("../../db");

const HeasHomeSchema = new mongoose.Schema(
    {
        desc: {
            type: String,
        },
        photo: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);
const {streetlightDB, heasDB} = connectDBs();
module.exports = heasDB.model("HeasHomeSlide", HeasHomeSchema);