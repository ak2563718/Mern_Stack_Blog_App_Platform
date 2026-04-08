import mongoose from "mongoose";


const porfileSchema = new mongoose.Schema({
    userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"UserData",
    required:true,
    },
    name:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        default:null,
    },
    domain:{
        type:[],
        default:null,
    },
    bio:{
        type:String,
        default:null,
    },
    achievement:{
        type:String,
        default:null,
    },
    skill:{
        type:String,
         default:null,
    },
    profileImage: {
         secure_url: {
         type: String,
         default: null,
         trim: true,
        },
         public_id: {
          type: String,
          default: null,
         trim: true,
         },
        },
})

export const Profile = mongoose.model('Profile',porfileSchema)