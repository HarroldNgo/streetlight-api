const mongoose = require("mongoose");
const { connectDBs } = require("../db");

const CategorySchema  = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        }
    },
    { timestamps: true }
);
const {streetlightDB, heasDB} = connectDBs();
module.exports = streetlightDB.model("Category", CategorySchema);