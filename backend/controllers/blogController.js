import { asyncHandler } from "../utils/asynchandler.js";
import { AppError } from "../utils/AppError.js"
import { Blog } from "../models/blogModel.js";
import cloudinary from "../configuration/cloudinary.js";

// 1. Create Blog
export const createBlog = asyncHandler(async(req, res, next)=>{
    const { title, slug, content, summary, category, secure_url, public_id} = req.body;
    if(!title || !slug || !content || !summary || !category){
        return next(new AppError("please provide all required field",400))
    }
    const count = content.match(/\b\w+\b/g)?.length || 0;
        let time=0;
        if(count>300){
             time= 10;
        }else{
             time=5;
        }
    const blog = await Blog.create({
        userId:req.user.id,
        title,
        slug,
        content,
        summary,
        category,
        readTime:time,
        author:req.user.name,
        coverImage:{
            secure_url:secure_url,
            public_id:public_id,
        }
    })
    res.status(201).json({
        success:true,
        message:'Blog Created successfully',
        blog
    })
})


// 2. Get All Blogs from every user
export const allblogs = asyncHandler(async(req, res, next)=>{
    const blog = await Blog.find({})
    if(!blog){
        return next (new AppError("Blogs are empty",400))
    }
    res.status(200).json({
        success:true,
        blog,
    })
})


// 3.Get Only Blogs of Users
export const userblogs = asyncHandler(async(req, res, next)=>{
    const id = req.user.id;
    const blog = await Blog.find({userId:id})
    if(!blog){
        return next(new AppError("No Blog found",400))
    }
    res.status(200).json({
        success:true,
        blog
    })
})


// 4. Get Blog by id
export const blogById = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const blog = await Blog.findById(id)
    if(!blog){
        return next( new AppError("No blog found",400))
    }
    res.status(200).json({
        success:true,
        blog,
    })
})


// 5. Search blog 
export const searchblog = asyncHandler(async (req, res, next) => {
    const { query } = req.query; // single search input
    const blog = await Blog.find({
        $or: [
            { title: { $regex: query, $options: "i" } },
            { slug: { $regex: query, $options: "i" } },
            { category: { $regex: query, $options: "i" } },
            { author: { $regex: query, $options: "i" } }
        ]
    });
    if(!blog){
        return next(new AppError('Post not found', 400))
    }
    res.status(200).json({
        success: true,
        count: blog.length,
        blog,
    });
});

//6.Manage likes
export const managelike = asyncHandler(async (req, res, next) => {
    const blogId = req.params.blogId;

    const post = await Blog.findById(blogId);
    if (!post) {
        return next(new Error("Post not found"));
    }

    // Get liked posts from cookie
    let likedPosts = req.cookies.likedPosts || [];

    // Convert string → array (important)
    if (typeof likedPosts === "string") {
        likedPosts = JSON.parse(likedPosts);
    }

    const alreadyLiked = likedPosts.includes(blogId);

    if (!alreadyLiked) {
        // 👍 Like
        post.likescount += 1;
        likedPosts.push(blogId);
    } else {
        // 👎 Unlike
        post.likescount -= 1;
        likedPosts = likedPosts.filter(id => id !== blogId);
    }

    await post.save();

    // Save updated cookie
    res.cookie("likedPosts", JSON.stringify(likedPosts), {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });

    res.status(200).json({
        success: true,
        blog:post,
    });
});


// 7. Delete Blog
export const deleteblog = asyncHandler(async(req, res, next)=>{
    const blogId = req.params.blogId;
    const blog = await Blog.findByIdAndDelete(blogId)
    if(!blog){
        return next (new AppError("Blog not found", 400))
    }
    res.status(200).json({
        success:true,
        message:'Blog deleted Successfully',
        blog,
    })
})


// 8. Update blog
export const updateblog = asyncHandler(async(req, res, next)=>{
    const { title, slug, content, summary, category, secure_url, public_id } = req.body;
    if(!title && !content && !summary && !category && !secure_url &&  !public_id){
        return next(new AppError('Please provide something to update', 400))
    }
    const id = req.params.id;
    const blog = await Blog.findById(id)
    if(!blog){
        return next(new AppError('Blog not found',400))
    }
    if(title) blog.title = title;
    if(slug) blog.slug = slug;
    if(content) blog.content = content;
    if(summary) blog.summary = summary;
    if(category) blog.category = category;
    if(secure_url && public_id){
        await cloudinary.uploader.destroy(blog.coverImage.public_id)
        blog.coverImage.secure_url = secure_url;
        blog.coverImage.public_id = public_id;
    }
    await blog.save()
    res.status(200).json({
        success:true,
        message:"blog Updated successfully",
        blog,
    })
})


// 9.manage view 
export const manageView = asyncHandler(async (req, res, next) => {
    const blogId = req.params.blogId;

    const post = await Blog.findById(blogId);
    if (!post) {
        return next(new Error("Post not found"));
    }

    // Get viewed posts from cookie
    let viewedPosts = req.cookies.viewedPosts || [];

    // Convert string → array
    if (typeof viewedPosts === "string") {
        try {
            viewedPosts = JSON.parse(viewedPosts);
        } catch {
            viewedPosts = [];
        }
    }

    const alreadyViewed = viewedPosts.includes(blogId);

    if (!alreadyViewed) {
        // 👁️ Increase view count only once
        post.viewscount += 1;
        viewedPosts.push(blogId);
    }

    await post.save();

    // Save updated cookie
    res.cookie("viewedPosts", JSON.stringify(viewedPosts), {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });

    res.status(200).json({
        success: true,
        blog: post,
    });
});



// 10. search blog with category
export const searchBlogByCategory = asyncHandler(async (req, res, next) => {
    const { category } = req.body;

    const blog = await Blog.find({ category });

    if (blog.length === 0) {
        return next(new AppError("No blog found", 404));
    }

    res.status(200).json({
        success: true,
        blog,
    });
});


// 11. getInfinitelopp scroll
export const getInfiniteBlogs = asyncHandler( async (req, res) => {
    
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const blogs = await Blog.find()
            .sort({ createdAt: -1 }) // latest first
            .skip(skip)
            .limit(limit);

        // Check if more data exists
        const totalBlogs = await Blog.countDocuments();
        const hasMore = skip + blogs.length < totalBlogs;

        res.status(200).json({
            success: true,
            page,
            blogs,
            hasMore,
        });

    })


