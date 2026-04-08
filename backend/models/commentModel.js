import mongoose from 'mongoose'

const commentSchema=new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog',
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserData",
        required:true,
    },
    comment:{
        type:String,
        maxlength:300,
    },
},{timestamps:true})

export const Comment=mongoose.model('Comment',commentSchema)