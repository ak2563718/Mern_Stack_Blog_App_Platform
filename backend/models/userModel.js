import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        enum:['Male','Female','Other'],
        default:null,
    },
    dob:{
        type:Date,
        default:null,
    },
    role:{
        type:String,
        enum:['User','Admin'],
        default:'User',
    },
    phone:{
        type:String,
        default:null,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
     googleId: {
      type: String,
      default: null,
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      required: true,
    },
    password:{
        type:String,
        default: null,
    },
    otp:{
        type:String,
        default:null,
    },
    otpexpiry:{
        type:Date,
        default:null,
    }
},{timestamps:true})

export const UserData=mongoose.model('UserData',userSchema)