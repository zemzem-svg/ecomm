const mongoose=require("mongoose");

const schema= mongoose.Schema
const ProductSchema= new schema({
    name:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    photo:{
        type:String,
        required: true,
    },

    });
    module.exports=mongoose.model("product",ProductSchema)