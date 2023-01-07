const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const authRoute = require("./routes/auth");
const regRoute = require("./routes/register");
const refreshRoute = require("./routes/refresh");
const filesRoute = require('./routes/file')
const multer = require("multer");
const path = require("path")
const fs = require("fs");

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")))

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(console.log("connected to MongoDB"))
    .catch(err => console.log(err))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});
console.log(__dirname)


app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/auth", authRoute);
app.use("/api/refresh", refreshRoute);
app.use("/api/register", regRoute);
app.use("/api/files", filesRoute)
app.use('/api/users', require('./routes/users'));


app.listen("5000", () => {
    console.log("Backend is running")
});