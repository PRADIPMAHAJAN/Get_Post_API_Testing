const express = require("express");
const router = express.Router();
// User schema 
const User = require('../models/User')
// For adding validation 
const { body, validationResult } = require('express-validator');
// Hashing the password 
const bcrypt = require("bcryptjs")
// Genereate the token
const jwt = require("jsonwebtoken")
var fetchuser = require("../middelware/fetchuser");

// Secreate key for authentication of user 
const jwt_secret = "shubhamsecreatestring";

// Route 1 for create User 
router.post("/createuser", [
    body('name', "Enter a valid name").isLength({ min : 3}),
    body('email', "Enter a valid Email").isEmail(),
    body('password').isLength({ min : 5})
],
  async(req,res)=>{
    // If there are error return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check the email whether user is exist already 
    try{
      let user = await User.findOne({email : req.body.email});
      if(user){
        return res.status(400).json({error : "Sorry a user with this email already exists......!...."});
      }

      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);

      // Create user in MongoDB
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });

      const data = {
        user:{
          id:user.id
        }
      }

      const authtoken = await jwt.sign(data, jwt_secret);
      console.log(authtoken);
      res.json({authtoken})
   
    }catch (error){
      console.error(error.message);
      res.status(500).send("Internal Server Error.....!💥")
    }

})

// Route 2 for Login a user 
router.post("/login", [
  body('email', "Enter a valid Email").isEmail(),
  body('password', "password cannot be blank").exists()
],
async(req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try{

      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error: "please try to login with correct creadentials......!"});
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        return res.status(400).json({error: "please try to login with correct creadentials......!"});
      }

      const data = {
        user:{
          id:user.id
        }
      }
      const authtoken = await jwt.sign(data, jwt_secret);
      res.json({authtoken})


    } catch (error){
      console.error(error.message);
      res.status(500).send("Internal Server Error.....!💥")
    }
})

// Route 3 for fetchuser get loggedin user details 
router.post("/fetchuser", fetchuser ,async(req,res)=>{
try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user);
} catch (error){
  console.error(error.message);
  res.status(500).send("Internal Server Error.....!💥")
}
})
module.exports = router