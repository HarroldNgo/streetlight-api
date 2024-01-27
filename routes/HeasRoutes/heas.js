const router = require("express").Router();
const Heas = require("../../models/HeasModels/Heas");
const HeasHomeSlide = require("../../models/HeasModels/HeasHomeSlide");
const HeasAboutSlide = require("../../models/HeasModels/HeasAboutSlide");

router.post('/', async (req, res) => {
  try {

    const { context, title, desc, photo, embedlink } = req.body;
    const data = {};
    data.context = context;
    data.title = title;
    data.desc = desc;
    data.photo = photo;
    data.embedlink = embedlink;

    const newHeas = new Heas(data);

    await newHeas.save();

    res.status(200).send('File uploaded successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//UPDATE HEAS
router.put("/:id", async (req, res) => {
  try {
    const updatedHeas = await Heas.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
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