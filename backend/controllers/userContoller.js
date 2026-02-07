import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "Please Provide All Fields" });
    }
    // check user
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "user already exists" });
    }
    //validating email
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "please enter a valid email" });
    }
    //password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
    //hashing password
    var salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create user
    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();
    const token = createToken(newUser._id)
    res.send({ success: true, message: "user created successfully",token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "internal server err", error });
  }
};

// route for user login
const loginUser = async (req, res) => {
  try {
    const {email ,password} = req.body;
    const user = await userModel.findOne({ email })

    if(!user){
      return res.status(404).send({
        success:false,
        message:"user not found"
      })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(isMatch){
      const token = createToken(user._id)
      res.status(200).send({
        success:true,
        token
      })
    } else{
      res.status(400).send({
        success:false,
        message:"invalid credentials"
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"internal server err in login api",
      error
    })
  }
};
// route for admin login
const adminLogin = async (req, res) => {
  try {
    const {email,password} = req.body
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email+password,process.env.JWT_SECRET)
      res.json({success:true,token})
    }
    else{
      res.json({success:false,message:"invalid credentials"})
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"internal server err in login api",
      error
    })
  }
};

const profileController = async (req, res) => {
  try {
    console.log(req.body)
    const user = await userModel.findById(req.body.userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    res.status(200).json({ success: true, message: "User fetched", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
};

export { loginUser, registerUser, adminLogin, profileController };
