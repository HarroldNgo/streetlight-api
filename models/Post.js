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
        photourl: {
            type: String,
            required: false,
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
        },
        videolink:{
            type:String,
            required:false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);