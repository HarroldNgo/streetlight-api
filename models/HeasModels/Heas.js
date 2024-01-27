const mongoose = require("mongoose");
const { connectDBs } = require("../../db");

const HeasSchema = new mongoose.Schema(
    {
        context: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
        },
        sub: {
            type: String,
        },
        desc: {
            type: String,
        },
        photo: {
            type: String,
        },
        embedlink: {
            type: String,
        }
    },
    { timestamps: true }
);
const {streetlightDB, heasDB} = connectDBs();
module.exports = heasDB.model("Heas", HeasSchema);