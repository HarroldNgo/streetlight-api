const router = require("express").Router();
const Heas = require("../../models/HeasModels/Heas");
const HeasHomeSlide = require("../../models/HeasModels/HeasHomeSlide");
const HeasAboutSlide = require("../../models/HeasModels/HeasAboutSlide");

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('data'), async (req, res) => {
  try {

    const { context, title, desc, photo } = req.body;
    const data = {};
    if (req.file) {
      data.data = req.file.buffer;
      data.contentType = req.file.mimetype;
    }
    data.context = context;
    data.title = title;
    data.desc = desc;
    data.photo = photo;

    const newHeas = new Heas(data);

    await newHeas.save();

    res.status(200).send('File uploaded successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//UPDATE HEAS
router.put("/:id", upload.single('data'), async (req, res) => {
  try {
    const file = req.file ? req.file.buffer : undefined
    const type = req.file ? req.file.mimetype : undefined
    const updatedHeas = await Heas.findByIdAndUpdate(
      req.params.id,
      {$set:{
        context: req.body.context,
        title: req.body.title,
        sub: req.body.sub,
        desc: req.body.desc,
        photo: req.body.photo,
        data: file,
        contentType: type,
      }},
      { new: true },

    );
    res.status(200).json(updatedHeas);
    console.log(file)
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//DELETE HEAS
router.delete("/:id", async (req, res) => {
  try {
    const deleteHeas = await Heas.findById(req.params.id);
    console.log(deleteHeas)
    await deleteHeas.delete()
    res.status(200).json("Post has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET HEAS
router.get("/:id", async (req, res) => {
  try {
    const heas = await Heas.findById(req.params.id);
    res.status(200).json(heas);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET HEAS PDF
router.get('/:id/view', async (req, res) => {
  try {
    const pdf = await Heas.findById(req.params.id);

    if (!pdf) {
      return res.status(404).send('PDF not found');
    }

    // Set content type header to indicate that the response contains a PDF
    res.setHeader('Content-Type', pdf.contentType);

    // Send the binary data of the PDF as the response
    res.send(pdf.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//GET ALL HEAS 
router.get("/", async (req, res) => {

  try {
    let heas;
    const filter = req.query.filter ? JSON.parse(req.query.filter) : {};;
    heas = await Heas.find(filter);
    res.status(200).json(heas);
  } catch (err) {
    res.status(500).json(err);
  }
});










module.exports = router;