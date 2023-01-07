const router = require("express").Router();
const Category = require("../models/Category");

//ADD CATEGORY
router.post("/", async (req,res)=>{
    const newCat = new Category(req.body);
    try{
        const savedCategory = await newCat.save();
        res.status(200).json(savedCategory);
    }catch(err){
        res.status(500).json(err)
    }
});

//GET ALL ATEGORIES/ GET ALL CATEGORIES BY NAME
router.get("/", async (req,res)=>{
    const catName=req.query.cat;
    try{
        let cats;
        if(catName){
            cats = await Category.find({name:{
                $in:[catName]
            }})
        }else{
            cats = await Category.find()
        }
        res.status(200).json(cats);
    }catch(err){
        res.status(500).json(err)
    }
});

//GET cat
router.get("/:id",  async (req,res) => {
    try{
        const cat = await Category.findByIdAndUpdate(req.params.id);
        res.status(200).json(cat);
    }catch(err){
        res.status(500).json(err);
    }
});

//DELETE cat
router.delete("/:id",  async (req,res) => {
    try{
        const deleteCat = await Category.findByIdAndUpdate(req.params.id);
        await deleteCat.delete()
        res.status(200).json("Category has been deleted...");
    }catch(err){
        res.status(500).json(err);
    }
});
//UPDATE cat
router.put("/:id",  async (req,res) => {
    try{
        const updatedCat = await Category.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body,
            },
            {new:true}
        );
        res.status(200).json(updatedCat);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;