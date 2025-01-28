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
const axios = require('axios'); 

const { connectDBs } = require("./db");

app.use(compression({
    level: 6,
    threshold: 0,
}));

app.use(cors({
    origin: ['https://www.macheas.ca','https://macheas.ca','https://heas.onrender.com','https://equityinhealth.ca','https://macheas.ca','http://localhost:5173', 'http://localhost:3000', 'https://streetlight.onrender.com', 'https://streetlightblog.com', 'https://www.streetlightblog.com', 'https://test-d6yp.onrender.com'],
    credentials: true,
}))
app.use(express.json());
//app.use("/images", express.static(path.join(__dirname, "/images")))

connectDBs();

// Keep-alive endpoint
app.get('/keepalive', (req, res) => {
    res.status(200).send('OK');
});

// Set up self-ping every 14 minutes
const KEEP_ALIVE_INTERVAL = 14 * 60 * 1000; // 14 minutes in milliseconds
const BASE_URL = process.env.BASE_URL || 'https://streetlight-api.onrender.com';

setInterval(() => {
    axios.get(`${BASE_URL}/keepalive`)
        .then(response => {
            console.log('Keep-alive ping successful:', response.status);
        })
        .catch(error => {
            console.error('Keep-alive ping failed:', error.message);
        });
}, KEEP_ALIVE_INTERVAL);

/*
cloudinary.config({
    cloud_name: 'dmluqp41s',
    api_key: '927784175515996',
    api_secret: 'WHmtma8na0svp1nuNePfSloIhvY',
    secure: true
});

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
    console.log("images/"+req.file.filename)
    cloudinary.uploader
        .upload("images/"+req.file.filename, {public_id: req.file.filename})
        .then(result => console.log(result));
});
console.log(__dirname)
*/
app.use("/api/heas", require('./routes/HeasRoutes/heas'));
app.use("/api/heas/slides", require('./routes/HeasRoutes/heasSlides'));
app.use("/api/heas/users", require('./routes/HeasRoutes/heasUsers'));
app.use("/api/heas/auth", require('./routes/HeasRoutes/heasAuth'));
app.use("/api/heas/refresh", require('./routes/HeasRoutes/heasRefresh'));
app.use("/api/heas/register", require('./routes/HeasRoutes/heasRegister'));

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
    console.log("connected to Heas MongoDB");
    console.log("Backend is running on port: " + PORT);
});

