const router = require("express").Router();
const Cover = require("../models/Cover");

//CREATE POST
router.post("/", async (req, res) => {
    const newCover = new Cover(req.body);
    try {
        const savedCover = await newCover.save();
        res.status(200).json(savedCover);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
    try {
        const updatedCover = await Cover.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCover);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        const deleteCover = await Cover.findByIdAndUpdate(req.params.id);
        await deleteCover.delete()
        res.status(200).json("Cover has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET POST
router.get("/:id", async (req, res) => {
    try {
        const cover = await Cover.findByIdAndUpdate(req.params.id).sort({"_id":-1});
        res.status(200).json(cover);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL POSTS 
router.get("/", async (req, res) => {
    const catName = req.query.cat;
    const comingsoon = req.query.comingsoon;
    const frontpage = req.query.frontpage;
    const id = req.query.id;

    try {
        let covers;
        if (id) {
            covers = await Cover.find({
                _id: {
                    $in: [id]
                }
            }).sort({"_id":-1});
        }
        else {
            covers = await Cover.find().sort({"_id":-1});
        }
        res.status(200).json(covers);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;