import { Profile } from "../models/profileModel.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asynchandler.js";
import cloudinary from "../configuration/cloudinary.js";

// 1. create Profile
export const createProfile =asyncHandler(async(req, res, next)=>{
  const { name, location, bio, domain } = req.body;
        if(!name && !location && !bio && !domain){
            next (new AppError("Provide something to create Profile",400))
        }
        const createdata={}
        if(name) createdata.name = name;
        if(location) createdata.location = location;
        if(bio) createdata.bio = bio;
        if(domain) createdata.domain = domain;
   const profile = await Profile.create({...createdata,userId:req.user.id})     
   res.status(201).json({
    success:true,
    message:"profile Created successfully",
    profile
   })
})


// 2. update Profile
export const updateProfile = asyncHandler(async (req, res, next) => {
  const { location, bio, domain, secure_url, public_id } = req.body;

  if (
    location === undefined &&
    bio === undefined &&
    domain === undefined &&
    secure_url === undefined &&
    public_id === undefined
  ) {
    return next(new AppError("Provide anything to update", 400));
  }

  const id = req.user.id;
  const profile = await Profile.findOne({ userId: id });

  if (!profile) {
    return next(new AppError("Profile not found", 400));
  }

  if (location !== undefined) profile.location = location;
  if (bio !== undefined) profile.bio = bio;
  if (domain !== undefined) profile.domain = domain;

  if (secure_url) {
    if (profile.profileImage?.public_id) {
    const res =  await cloudinary.uploader.destroy(profile.profileImage.public_id);
    }

    profile.profileImage = {
      secure_url,
      public_id,
    };
  }

  await profile.save();

  res.status(200).json({
    success: true,
    message: "profile updated successfully",
    profile,
  });
});

// 3. Get profile by id
export const profilebyId = asyncHandler(async(req, res, next)=>{
    const id = req.user.id;
    const profile = await Profile.findOne({userId:id})
    if(!profile){
        return next(new AppError("Profile not found..",400))
    }
    res.status(200).json({
        success:true,
        profile,
    })
})


export const removeprofilepic = asyncHandler(async(req, res, next)=>{
    const id = req.user.id;
    const profile = await Profile.findOne({userId : id})
    if(!profile){
        return next (new AppError('Profile not found',400))
    }
    if(profile.profileImage.public_id){
        await cloudinary.uploader.destroy(profile.profileImage.public_id)
    }else{
        return next(new AppError("Image not found",404))
    }
    res.status(200).json({
        success:true,
        message:"Image Deleted successfully",
        profile
    })    
})


export const getFullProfiledata = asyncHandler(async(req, res, next )=>{
  const profile = await Profile.find({}).populate('userId','email role createdAt')
  if(!profile){
    return next(new AppError('No Profile Data found', 400))
  }
  res.status(200).json({
    success:true,
    profile,
  })
})