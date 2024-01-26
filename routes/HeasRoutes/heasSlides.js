
const router = require("express").Router();
const HeasHomeSlide = require("../../models/HeasModels/HeasHomeSlide");
const HeasAboutSlide = require("../../models/HeasModels/HeasAboutSlide");

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//HOME SLIDESS

router.post('/home', upload.single('data'), async (req, res) => {
    const newHeasHomeSlide = new HeasHomeSlide(req.body);
      try {
          const savedHeasHomeSlide = await newHeasHomeSlide.save();
          res.status(200).json(savedHeasHomeSlide);
      } catch (err) {
          res.status(500).json(err);
      }
  });
  
  //UPDATE HEAS
  router.put("/home/:id", async (req, res) => {
  try {
      const updatedHeas = await HeasHomeSlide.findByIdAndUpdate(
          req.params.id,
          {
              $set: req.body,
          },
          { new: true }
      );
      res.status(200).json(updatedHeas);
  } catch (err) {
      res.status(500).json(err);
  }
  });
  
  //DELETE HEAS
  router.delete("/home/:id", async (req, res) => {
  try {
      const deleteHeas = await HeasHomeSlide.findById(req.params.id);
      console.log(deleteHeas)
      await deleteHeas.delete()
      res.status(200).json("Post has been deleted...");
  } catch (err) {
      res.status(500).json(err);
  }
  });
  
  //GET ALL HEAS 
  router.get("/home", async (req, res) => {
  
    try {
        let heas;
        const filter = req.query.filter ? JSON.parse(req.query.filter) : {};;
        heas = await HeasHomeSlide.find(filter);
        res.status(200).json(heas);
    } catch (err) {
        res.status(500).json(err);
    }
  });
  
  
  
  
  
  
  
  //ABOUT SLIDESS
  
  router.post('/about', upload.single('data'), async (req, res) => {
    const newHeas = new HeasAboutSlide(req.body);
      try {
          const savedHeas = await newHeas.save();
          res.status(200).json(savedHeas);
      } catch (err) {
          res.status(500).json(err);
      }
  });
  
  //UPDATE HEAS
  router.put("/about/:id", async (req, res) => {
  try {
      const updatedHeas = await HeasAboutSlide.findByIdAndUpdate(
          req.params.id,
          {
              $set: req.body,
          },
          { new: true }
      );
      res.status(200).json(updatedHeas);
  } catch (err) {
      res.status(500).json(err);
  }
  });
  
  //DELETE HEAS
  router.delete("/about/:id", async (req, res) => {
  try {
      const deleteHeas = await HeasAboutSlide.findById(req.params.id);
      console.log(deleteHeas)
      await deleteHeas.delete()
      res.status(200).json("Post has been deleted...");
  } catch (err) {
      res.status(500).json(err);
  }
  });
  
  //GET ALL HEAS 
  router.get("/about", async (req, res) => {
  
    try {
        let heas;
        const filter = req.query.filter ? JSON.parse(req.query.filter) : {};;
        heas = await HeasAboutSlide.find(filter);
        res.status(200).json(heas);
    } catch (err) {
        res.status(500).json(err);
    }
  });
  
  module.exports = router;