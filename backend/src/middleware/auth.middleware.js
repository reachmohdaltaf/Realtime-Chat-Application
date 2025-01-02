import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';



export const protectRoute = async (req, res, next) => {
     try {
       const token = req.cookies.jwt 
       if(!token){
           return res.status(401).json({message:'not authorized'})
       }
       const decoded = jwt.verify(token, process.env.JWT_SECRET)
       if(!decoded){
           return res.status(401).json({message:'not authorized'})
       }
       const user = await User.findById(decoded.userId).select('-password')
       if(!user){
           return res.status(401).json({message:'not authorized'})
       }
       req.user = user
       next()
     } catch (error) {
        
     }
};