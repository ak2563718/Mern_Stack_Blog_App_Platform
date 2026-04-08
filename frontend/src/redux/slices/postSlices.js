import { createSlice } from "@reduxjs/toolkit";
import { createpost, deleteuserblog, getallposts, getblogwithinfinite, getPostById, getPostByUser, increaseLike, manageView, SearchPost, searchwithcategory, updatepostbyId } from "../actions/postAction";




const initialState={
    postloading:false,
    postmessage:null,
    posterror:null,
    userblog:[],
    allblogs:[],
    hasMore:true,
    page:0,
    blogs:[],
    blog:{},
}

const postSlice=createSlice({
    name:'post',
    initialState:initialState,
    reducers:{
        clearpostmessages:(state)=>{
            state.postmessage=null;
            state.posterror=null;
        },
        increamentPage:(state)=>{
            state.page +=1;
        },
        resetBlogs:(state)=>{
             state.allblogs = [];
             state.page = 1;
             state.hasMore = true;
        },
        resetblog:(state)=>{
            state.blog = {};
        }    
    },
    extraReducers:(builder)=>{
        // 1. Create New Post 
        builder.addCase(createpost.pending,(state)=>{
            state.postloading=true;
        }).addCase(createpost.fulfilled,(state,action)=>{
            state.postloading=false;
            state.postmessage=action.payload.message;
            state.allblogs=state.allblogs.push(action.payload.blog)
        }).addCase(createpost.rejected,(state,action)=>{
            state.postloading=false;
            state.posterror=action.payload;
        });
    

        // 2. Get Post by User
        builder.addCase(getPostByUser.pending,(state)=>{
            state.postloading = true;
        }).addCase(getPostByUser.fulfilled,(state,action)=>{
            state.postloading = false ;
            state.postmessage = action.payload.message ;
            state.userblog = action.payload.blog ;
        }).addCase(getPostByUser.rejected, (state,action)=>{
            state.postloading = false ;
            state.posterror = action.payload;
        });

        // 3. Get all Post 
        builder.addCase(getallposts.pending,(state)=>{
            state.postloading = true;
        }).addCase(getallposts.fulfilled,(state,action)=>{
            state.postloading = false;
            state.allblogs = action.payload.blog;
        });

        // 4. mangae Likes
        builder.addCase(increaseLike.fulfilled,(state,action)=>{
            state.postloading = false;
            state.blogs = state.blogs.map(blog =>
                 blog._id === action.payload.blog._id
                     ? action.payload.blog
                    : blog
                    );
        });

        // 6. Get Post by Id
        builder.addCase(getPostById.pending,(state)=>{
            state.postloading = true;
        }).addCase(getPostById.fulfilled,(state,action)=>{
            state.postloading = false;
            state.blog = action.payload.blog;
        });


        // 7. manageView 
        builder.addCase(manageView.pending,(state)=>{
            state.postloading = true;
        }).addCase(manageView.fulfilled,(state,action)=>{
            state.postloading = false;
            state.blogs = state.blogs.map(blog=>
                blog._id === action.payload._id
                ?action.payload.blog : blog
            );
        });

        // 8. category search
        builder
        .addCase(searchwithcategory.pending, (state) => {
            state.postloading = true;
            state.error = null;
        })
        .addCase(searchwithcategory.fulfilled, (state, action) => {
            state.postloading = false;
            state.allblogs = action.payload?.blog || [];
        })
        .addCase(searchwithcategory.rejected, (state, action) => {
            state.postloading = false;
            state.error = action.payload || "Something went wrong";
        });


        builder
        .addCase(getblogwithinfinite.pending, (state) => {
        state.postloading = true;
        })
        .addCase(getblogwithinfinite.fulfilled, (state, action) => {
        state.postloading = false;
        state.blogs = [...state.blogs, ...action.payload.blogs]; // append
        state.page +=1;
        state.hasMore = action.payload.hasMore;
        })
        .addCase(getblogwithinfinite.rejected, (state, action) => {
        state.postloading = false;
        state.posterror = action.payload;
        });

        builder.addCase(deleteuserblog.pending,(state)=>{
            state.postloading = true;
        }).addCase(deleteuserblog.fulfilled,(state,action)=>{
            state.postloading = false;
            state.userblog = state.userblog.filter(blog => blog._id !== action.payload.blog._id);
            state.allblogs = state.allblogs.filter(blog => blog._id !== action.payload.blog._id);
            state.postmessage = action.payload.message;
        });

        builder.addCase(updatepostbyId.pending,(state)=>{
            state.postloading = true;
        }).addCase(updatepostbyId.fulfilled,(state,action)=>{
            state.postloading = false;
            state.blog = state.blog._id === action.payload.blog._id ? action.payload.blog : state.blog;
            state.allblogs = state.allblogs.map(blog =>
                blog._id === action.payload.blog._id ? action.payload.blog : blog);
            state.userblog = state.userblog.map(blog =>
                blog._id === action.payload.blog._id ? action.payload.blog : blog
            );
        });

        builder.addCase(SearchPost.pending,(state)=>{
            state.postloading = true;
            state.blogs = [];
        }).addCase(SearchPost.fulfilled,(state,action)=>{
            state.postloading = false;
            state.blogs = action.payload.blog;
        })
    }
})

export const {clearpostmessages , increamentPage, resetBlogs, resetblog} =postSlice.actions;
export default postSlice.reducer;













                   