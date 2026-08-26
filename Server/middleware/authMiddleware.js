import { getAuth } from '@clerk/express';
import User from "../models/User.js";

export const protect = async(req , res , next)=>{
    try {
        const { userId } = getAuth(req);

        if(!userId){
            return res.json ({success:false , message :"not authenticated"});
        }
        
        let user = await User.findById(userId);
        if(!user){
            user = await User.create({
                _id: userId,
                username: "User",
                email: "user@example.com",
                image: "",
                role: "user",
                recentSearchedCities: []
            });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.json({success:false, message: error.message});
    }
}