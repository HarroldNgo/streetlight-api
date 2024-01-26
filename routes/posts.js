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
        const deletePost = await Post.findById(req.params.id);
        console.log(deletePost)
        await deletePost.delete()
        res.status(200).json("Post has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET (EXCLUDING + frontpage) POSTS 
router.get("/notcat/:cat/:frontpage", async (req, res) => {
    try {
        let posts;
        posts = await Post.find({
            categories: { $not: { $in: req.params.cat}},
            frontpage: req.params.frontpage
        }).sort({"_id":-1});
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});
//GET (EXCLUDING) POSTS 
router.get("/notcat/:cat", async (req, res) => {
    try {
        let posts;
        posts = await Post.find({
            categories: { $not: { $in: req.params.cat}},
        }).sort({"_id":-1});
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});
//GET (SPECIFIC 2 cats & frontpage) POSTS 
router.get("/cat2/:cat1/:cat2/:frontpage", async (req, res) => {
    try {
        let posts;
        posts = await Post.find({
            categories: { $in: [req.params.cat1, req.params.cat2]},
            frontpage: req.params.frontpage
        }).sort({"_id":-1});
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});
//GET (SPECIFIC 2 cats) POSTS 
router.get("/cat2/:cat1/:cat2", async (req, res) => {
    try {
        let posts;
        posts = await Post.find({
            categories: { $in: [req.params.cat1, req.params.cat2]},
        }).sort({"_id":-1});
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});
//GET (SPECIFIC cat & frontpage) POSTS 
router.get("/cat/:cat/:frontpage", async (req, res) => {
    try {
        let posts;
        posts = await Post.find({
            categories: req.params.cat,
            frontpage: req.params.frontpage
        }).sort({"_id":-1});
        res.status(200).json(posts);
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
    const slug = req.query.slug;

    try {
        let posts;
        if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName]
                }
            }).sort({"_id":-1});
        } else if (comingsoon) {
            posts = await Post.find({
                comingsoon: {
                    $in: [comingsoon]
                }
            }).sort({"_id":-1});
        }
        else if (id) {
            posts = await Post.find({
                _id: {
                    $in: [id]
                }
            });
        }
        else if (frontpage) {
            posts = await Post.find({
                frontpage: {
                    $in: [frontpage]
                }
            }).sort({"_id":-1});
        }
        else if (slug) {
            posts = await Post.find({
                slug: {
                    $in: [slug]
                }
            })
        }
        else {
            posts = await Post.find().sort({"_id":-1});
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;