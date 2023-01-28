const router = require("express").Router();
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        const deletePost = await Post.findByIdAndUpdate(req.params.id);
        await deletePost.delete()
        res.status(200).json("Post has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id);
        res.status(200).json(post);
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
        let posts;
        if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName]
                }
            });
        } else if (comingsoon) {
            posts = await Post.find({
                comingsoon: {
                    $in: [comingsoon]
                }
            })
        }
        else if (id) {
            posts = await Post.find({
                _id: {
                    $in: [id]
                }
            })
        }
        else if (frontpage) {
            posts = await Post.find({
                frontpage: {
                    $in: [frontpage]
                }
            })
        }
        else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;