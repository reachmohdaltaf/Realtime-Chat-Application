import cloudinary from "../lib/Cloudinary.js";
import { genreateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, password, email } = req.body;
  //hash password
  try {
    if(!fullName || !email || !password){
      return res.status(400).json({message:"All fields are required"})
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be more than 6 characters" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      //genreating the jwt token
      genreateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
        message: "User created successfully",
      });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in  singup conttoller", error);
  }
};
export const login = async (req, res) => {
  const {email, password} = req.body
  try {
    const user =  await User.findOne({email})
    if(!user){
      return res.status(400).json({message:"User does not exist"})
    }
    const isPasswordCorrect = await  bcrypt.compare(password, user.password)
    if(!isPasswordCorrect){
      return res.status(400).json({message:"Invalid password"})
    }
    genreateToken(user._id, res)
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      message:"Login successful"
    })
  } catch (error) {
    console.log("Error in login controller", error);
    return res.status(500).json({message:"Internal server error"})
  }
};
export const logout = (req, res) => {
  try {
   res.cookie('jwt', '', {maxAge: 0})
   res.status(200).json({message:"Logout successful"})
  } catch (error) {
    console.log("Error in logout controller", error);
    return res.status(500).json({message:"Internal server error"})
  }
};
export const updateProfile = async (req, res) => {
  try {
    const {profilePic} = req.body
    const userId =  req.user._id 
    if(!profilePic){
      return res.status(400).json({message:"Profile pic is required"})
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url}, {new:true})
    res.status(200).json(updatedUser)
    
  } catch (error) {
    console.log('Error in update profile controller', error);
    return res.status(500).json({message:"Internal server error"})
  }
}

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.log("Error in check auth controller", error);
    return res.status(500).json({message:"Internal server error"})
  }
};