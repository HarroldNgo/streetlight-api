const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: false
        },
        desc: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: true,
        },
        categories: {
            type: String,
            required: true,
        },
        frontpage:{
            type:Boolean,
            required:true
        },
        comingsoon:{
            type:Boolean,
            required:true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);