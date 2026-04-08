import mongoose from 'mongoose'

const postSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserData',
        required:true,
    },
    title:{
        type:String,
        required:true,
        maxlength:150,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    content:{
        type:String,
        required:true,
    },
    summary:{
        type:String,
        required:true,
        maxlength:500,
    },
    category:{
        type:String,
        required:true,
    },
   coverImage: {
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
    author:{
       type:String,
        required:true,
    },
    readTime:{
        type:Number,
        required:true,
    },
    likescount:{
        type:Number,
        default:0,
    },
    commentId:{
        type:Number,
        default:0,
    },
    viewscount:{
        type:Number,
        default:0,
    }
},{timestamps:true})

export const Blog=mongoose.model('Blog',postSchema)