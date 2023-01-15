const fs = require("fs");
const path = require("path")
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dmluqp41s',
  api_key: '927784175515996',
  api_secret: 'WHmtma8na0svp1nuNePfSloIhvY',
  secure: true
});


const remove = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = path.join(__dirname, '..', 'images/');

  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
      console.log("failed to delete local image:"+err);
    }
    cloudinary.uploader
    .destroy(fileName)
    .then(result => console.log(result));
    console.log('successfully deleted local image');  
  });
};

const removeSync = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = path.join(__dirname, '..', 'images/');

  try {
    fs.unlinkSync(directoryPath + fileName);
    res.status(200).send({
      message: "File is deleted.",
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not delete the file. " + err,
    });
  }
};

module.exports = {
  remove,
  removeSync,
};