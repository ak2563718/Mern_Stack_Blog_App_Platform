import { decodeUser } from "../configuration/tokenCreation.js";


export const isAuthenticated = async (req, res , next)=>{
    try {
        const token = req.cookies?.uid;
        if(!token) {
             return res.status(401).json({
                success: false,
                message: "Please Login to access this resource"
             })
            }
        const user = decodeUser(token);
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid token, Please Login again"
            })
        }
        req.user =user;
        next();
    } catch (error) {
       return res.status(401).json({        
        success: false,
        message: "Please Login to access this resource"
       }) 
    }
}

export const isAdmin = (req, res, next )=>{
    if(!req.user || req.user.role !== "Admin"){
        return res.status(403).json({
            success:false,
            message: "You are not authorized to access this resource"
        })
    }
   next();
}