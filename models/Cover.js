const mongoose = require("mongoose");
const slugify = require('slugify');

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

module.exports = mongoose.model("Cover", CoverSchema);