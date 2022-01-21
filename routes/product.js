const express=require("express");
const prodrouter= express.Router();
const User=require("../models/Product");
const Product = require("../models/Product");


//ADD PRODUCT
prodrouter.post("/add",async(req,res)=>{
    try {
        const newProduct=new Product(req.body);
        let result=await newProduct.save()
        res.send({response : result,msg: "added"})
    } catch (error) {
        console.log(error)
    }
})

//DELETE PRODUCT
prodrouter.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Operation Succeded" });
    deletedProduct.n
    ?res.status(200).json({ message: "Operation failed" })
    :res.status(200).json({ message: "Operation Succeded" })
   
  } catch (err) {
    res.status(500).json({ message: "No Data to Delete.",err });
  }
});

//PUT PRODUCT
prodrouter.put("/:id", async (req, res) => {
    try {
      const result = await Product.updateOne(
        { _id: req.params.id },
        { $set: { ...req.body } }
      );
  
      result.nModified
        ? res.send({ message: "product updated" })
        : res.send({ message: "product already updated" });
    } catch (error) {
      res.status(400).send({ message: "there is no product with this id" });
    }
  });
//UPDATE POST
//get 
prodrouter.get("/",async(req,res) =>{
  try {
   const result=await Product.find()
     res.send({result,message:"getting productts succefully"})
  } catch (error) {
    res.status(400).send({message:"can not get productts"})

  }
 })

module.exports = prodrouter 