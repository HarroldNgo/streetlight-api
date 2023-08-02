const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const postRoute = require("./routes/posts");
const coverRoute = require("./routes/covers");
const categoryRoute = require("./routes/categories");
const authRoute = require("./routes/auth");
const regRoute = require("./routes/register");
const refreshRoute = require("./routes/refresh");
const filesRoute = require('./routes/file')
const path = require("path")
const fs = require("fs");
const cors = require("cors");
const cloudinary = require('cloudinary').v2;
const compression = require('compression');
const redis = require('redis');
const util = require("util");

app.use(compression({
    level: 6,
    threshold: 0,
}));

app.use(cors({
    //origin: ['http://localhost:3000', 'https://streetlight.onrender.com', 'https://streetlightblog.com', 'https://www.streetlightblog.com', 'https://test-d6yp.onrender.com'],
    credentials: true,
}))
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

cloudinary.config({
    cloud_name: 'dmluqp41s',
    api_key: '927784175515996',
    api_secret: 'WHmtma8na0svp1nuNePfSloIhvY',
    secure: true
});

/*const storage = multer.diskStorage({
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
    console.log("images/"+req.file.filename)
    cloudinary.uploader
        .upload("images/"+req.file.filename, {public_id: req.file.filename})
        .then(result => console.log(result));
});
console.log(__dirname)
*/

app.use("/api/posts", postRoute);
app.use("/api/covers", coverRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/auth", authRoute);
app.use("/api/refresh", refreshRoute);
app.use("/api/register", regRoute);
app.use("/api/files", filesRoute)
app.use('/api/users', require('./routes/users'));


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Backend is running on port: " + PORT)
});