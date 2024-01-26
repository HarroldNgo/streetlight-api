const mongoose = require("mongoose");
const { connectDBs } = require("../../db");

const HeasAboutSchema = new mongoose.Schema(
    {
        photo: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
const {streetlightDB, heasDB} = connectDBs();
module.exports = heasDB.model("HeasAboutSlide", HeasAboutSchema);