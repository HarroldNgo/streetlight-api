const mongoose = require("mongoose");
const slugify = require('slugify');
const { connectDBs } = require("../db");

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
        },
        videolink:{
            type:String,
            required:false
        },
        slug:{
            type:String,
        },
        metadesc:{
            type:String,
            required: false
        },
    },
    { timestamps: true }
);
PostSchema.pre('save', async function(next) {
    console.log(this.title)
    this.slug = slugify(this.title, {remove: /[*+~.,;()'"!:@]/g, lower: true})

    next();
});
PostSchema.pre('findOneAndUpdate', async function(next) {
    const update =  this.getUpdate();
    console.log(update.$set.title)
    update.$set.slug = slugify(update.$set.title, {remove: /[*+~.,;()'"!:@]/g, lower: true})
    next();
});

const {streetlightDB, heasDB} = connectDBs();
module.exports = streetlightDB.model("Post", PostSchema);