import { Blog } from "../models/blogModel.js";
import { Comment } from "../models/commentModel.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asynchandler.js";



// 1. create comment
export const addComment = asyncHandler(async(req, res, next)=>{
    const { comment } = req.body;
    const postId = req.params.postId;
    const userId = req.user.id;
    if(!comment){
        return next(new AppError("Please provide comment", 400))
    }
    const comments = await Comment.create({
        postId:postId,
        comment:comment,
        userId:userId,
    })
    res.status(201).json({
        success:true,
        message:'Comment Posted Successfully',
        comments
    })
})


// 2.Get  Comment by PostId
export const getCommentbyPostId = asyncHandler(async(req, res, next)=>{
    const postId = req.params.postId;
    const comments = await Comment.find({postId})
    .populate('postId', 'title')
    .populate('userId', 'name')
    .sort({createdAt:-1})
    if(!comments){
        return next(new AppError("No Comment found",400))
    }
    res.status(200).json({
        success:true,
        message:"comment found",
        comments,
    })
})


// 3. Get all Comment by userId
export const getCommentforpaging = asyncHandler(async(req, res, next)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page -1)*limit;
    const postId = req.params.postId;
    const comments = await Comment.find({postId})
    .populate('postId', 'title')
    .populate('userId', 'name')
    .sort({createdAt:-1})
    .skip(skip)
    .limit(limit);
    const totalComments = await Comment.countDocuments({postId});
    const totalPages = Math.ceil(totalComments/limit);
    if(!comments){
        return next(new AppError("No Comment found",400))
    }
    res.status(200).json({
        success:true,
        message:"comment found",
        comments,
        page,
        totalPages,
        totalComments,
    })
})


export const getMyPostComments = asyncHandler(async (req, res, next) => {
  
  // 1. Find all posts created by logged-in user
  const myPosts = await Blog.find({ userId: req.user.id }).select("_id");

  const postIds = myPosts.map(post => post._id);

  // 2. Find comments on those posts
  const comments = await Comment.find({ postId: { $in: postIds } })
    .populate("postId", "title")
    .populate("userId", "name");

  res.status(200).json({
    success: true,
    comments
  });
});