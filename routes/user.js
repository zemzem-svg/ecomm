const express = require("express");
const req = require("express/lib/response");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const user=require("../controllers/user")
const jwt = require("jsonwebtoken");
const isAuth = require("../middleware/passport")


// const isAuth=require("../middleware/passport")
//register 
router.post("/register",async(req, res) => {
    const { name, lastname, email, password } = req.body;
    try {
        //save the user
        const newUser = new User({ name, lastname, email, password });
        //check email 0
        const searchedUser = await User.findOne({ email })
        if (searchedUser) {
            res.status(400).send("Email already exist");
        }
        //hash password
        const salt = 10;
        const genSalt = await bcrypt.genSalt(salt);
        const hashedPassword = await bcrypt.hash(password, genSalt);
        console.log(hashedPassword);
        newUser.password = hashedPassword;

     

     const newUserToken=   await newUser.save();
        const payload = {
            _id: newUser._id,
            name:newUser.name,
        };
        const token = jwt.sign(payload, process.env.SecretOrkey,{expiresIn:3600,});
        res.status(200).send({ newUser, msg: "User is successfully saved",token } );
        // 

    } catch (error) {
        res.status(500).send("can not save the user");
        console.log(error)
    }
})
//login
router.post("/login",async (req, res) => {
    const { email, password } = req.body;
    try {
        //find if the user exist
        const searchedUser = await User.findOne({ email });
        //if the email exist
        if (!searchedUser) {
            return res.status(400).send({ msg: "Bad credential" })
        }
        //password are equals
        const match = await bcrypt.compare(password, searchedUser.password);
        if (!match) {
            return res.status(400).send({ msg: "Bad credential" })
        }
        //cree un token
        const payload = {
            _id: searchedUser.id,
            name: searchedUser.name,
        };
        const token = await jwt.sign(payload, process.env.SecretOrkey, {
            expiresIn: 3600,
        });
  
        //send the user
        res
            .status(200)
            .send({ user: searchedUser, msg: "succes", token: `Bearer ${token}` });
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "The use does not exist !" });
        
    }
});
//get
router.get("/current", isAuth(), (req, res) => {
    res.status(200).send({ user: req.user });
    
})
//admin
router.get('/profile', isAuth(), (req, res, data) =>{ 
    //  if req.userData is user object
    if(req.isAdmin === true) {
      return res.redirect('/dashboard')
    } else {
       return  res.redirect('/Profile')
    }

});


module.exports = router;