import { decodeemail, generatetoken } from "../configuration/tokenCreation.js";
import { generateOtp } from "../configuration/generateOtp.js";
import { sendOtpEmail } from "../configuration/resend.js";
import { decodeUser, encodeemail, encodeUser} from "../configuration/tokenCreation.js";
import { UserData } from "../models/userModel.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { passwordChecker, validateEmail, validatephone } from "../utils/validate.js";
import bcrypt from 'bcrypt'
import passpost from '../configuration/passport.js'
import {Profile} from '../models/profileModel.js'
import {Blog} from '../models/blogModel.js'




// 1. User Signup
export const signupUser = asyncHandler(async(req, res, next) =>{
    const {name,gender,dob,email,phone,password}=req.body;
        if(!name || !gender ||!dob || !email || !phone || !password){
            return next(new AppError('Please Fill all Field for Registration',400))
        }
        let formattedphone=phone;
        if(!formattedphone.startsWith('+91')){
            formattedphone='+91'+phone;
        }
         validateEmail(email)
         validatephone(phone)
         passwordChecker(password)
        const hashedpassword=await bcrypt.hash(password,10);
        const user=await UserData.create({
            name:name,
            gender:gender,
            dob:dob,
            email:email,
            phone:formattedphone,
            password:hashedpassword,
            authProvider:"local"
        })
        const {password:_ , ...safedata}= user.toObject()
        res.status(201).json({message:"User Created Successfully",user:safedata,success:true})
})


// 2. Login User 
export const loginUser = asyncHandler(async(req, res, next)=>{
    const { phone, email , password } = req.body;
    if(!phone && !email ){
        return next(new AppError('Please provide either phone or email for login',400))
    }
     if(!password){
        return next(new AppError("please provide password",400))
    }
    const loginwith = {};
    if(phone){
         validatephone(phone);
         let formattedphone=phone;
        if(!formattedphone.startsWith('+91')){
            formattedphone='+91'+phone;
             loginwith.phone = formattedphone;
        }
    } 
    if(email){
        validateEmail(email);
        loginwith.email = email;
    } 
    const user = await UserData.findOne(loginwith);
    if(!user){
        return next(new AppError('No user found', 400))
    }
    const matched = await bcrypt.compare(password , user.password);
    if(!matched){
        return next(new AppError('Wrong Password',400))
    }
    const token = encodeUser(user)
     res.cookie('uid',token,{
            httpOnly:true,
            secure:true,
            sameSite:'none',
            maxAge:5*60*60*1000
        })
        const {password:_,...safedata}=user.toObject()
        res.status(200).json({message:"User Logged in ",success:true,user:safedata})
})


// 3. logout User
export const logoutUser = asyncHandler(async(req, res, next)=>{
    const token = req.cookies.uid;
    if(!token){
        return next(new AppError('No User Login', 403))
    }
    res.clearCookie('uid',{
        httpOnly:true,
        sameSite:'none',
        secure:true,
    })
    res.status(200).json({
        success:true,
        message:"User logged out successfully"
    })
})


// 4. islogin or not 
export const checkloginstatus = asyncHandler(async(req, res, next )=>{
    const user = req.user;
    if(!user){
         return next(new AppError('No Token Found ',403))
    }
    res.status(200).json({
        success:true,
        user,
    })
})


// 5. forgot password
export const forgotPassword = asyncHandler(async(req, res, next)=>{
     const {email}= req.body;
     if(!email){
        return next(new AppError('Please provide email',400))
     }
     validateEmail(email)
     const otp = generateOtp();
     const user = await UserData.findOne({email})
     if(!user){
        return next(new AppError("Email Not Registered",400))
     }
       user.otp = otp;
       user.otpexpiry = Date.now() + 5 * 60 * 1000; // 5 min
       await user.save();
       await sendOtpEmail(email, otp);

       const token = encodeemail(email)
       res.cookie('mail',token,{
        httpOnly:true,
        secure:true,
        sameSite:'none',
        maxAge:5 * 60 * 1000,
       })
       res.status(201).json({
        success:true,
        message:'Otp sent to Registered Email'
       })
})


// 6. verify-otp
export const verifyotp = asyncHandler(async(req, res, next)=>{
    const {otp} = req.body;
    const token = req.cookies.mail;
    const email = decodeemail(token).email
    
    const user = await UserData.findOne({email})
    if(user.otpexpiry < Date.now()){
        return next(new AppError('Otp Expired', 400))
    }
    if(user.otpexpiry > Date.now() && user.otp !== otp){
        return next(new AppError('wrong Otp'))
    }
    if(user.otpexpiry > Date.now() && user.otp === otp){
        user.otp =null;
        user.otpexpiry = null;
        await user.save();
        return res.status(200).json({
            success:true,
            message:'Otp verified successfully'
        })
    }
})


// 7. Reset-Otp
export const resetpassword = asyncHandler(async(req, res, next)=>{
    const {password} = req.body;
    if(!password){
        return next( new AppError("Please Provide Password", 400
        ))}
    passwordChecker(password)
    const token = req.cookies.mail;
    const email = decodeemail(token).email;

    const user = await UserData.findOne({email})
    if(!user){
        return next(new AppError('Session Failed ',400))
    }
    user.password = await bcrypt.hash(password,10)
    await user.save();

    const {password:_,...safedata}=user.toObject()
    res.status(201).json({
        success:true,
        message:"Password Changed Successfully"
    })
})


// 8. get User from google auth
export const getgoogleuser = asyncHandler(async(req, res, next)=>{
    const user = req.user;
    const token = generatetoken(user);
    res.cookie('uid',token,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        maxAge:60*60*60*1000,
    })
    res.redirect('https://mern-stack-blog-app-platform.onrender.com/home')
})



export const getallusers = asyncHandler(async(req, res, next)=>{
    const users = await UserData.find().select('-password');
    if(users.length === 0){
        return next(new AppError('No Users found ', 400))
    }
    res.status(200).json({
        success:true,
        users,
    })
})


export const getUserById = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const user = await UserData.findById(id)
    if(!user){
        return next(new AppError('User Not found',400))
    }
    res.status(200).json({
        success:true,
        user,
    })
})


export const deleteUser = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const user = await UserData.findByIdAndDelete(id)
    const profile = await Profile.deleteMany({userId : id})
    const blog = await Blog.deleteMany({userId:id})
    if(!user){
        return next(new AppError ('User not found', 400))
    }
    res.status(200).json({
        success:true,
        user,
        profile,
        blog
    })
})